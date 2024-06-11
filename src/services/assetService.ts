import axios from "axios";
import NodeCache from "node-cache";
const { BigQuery } = require("@google-cloud/bigquery");

const bigquery = new BigQuery();

export const getMonthlyAssetTotals = async (workspaceId: string) => {
  const query = `
    WITH asset_transactions AS (
      SELECT
        t.date,
        EXTRACT(YEAR FROM TIMESTAMP(t.date)) AS year,
        EXTRACT(MONTH FROM TIMESTAMP(t.date)) AS month,
        CASE
          WHEN t.transactionType = 'ForexTransaction' THEN t.transactionAmt * t.inputExchangeRate
          WHEN t.transactionType = 'ForeignTransaction' THEN t.pricePerShare * t.inputExchangeRate * t.shares
          WHEN t.transactionType = 'DomesticTransaction' THEN t.shares * t.pricePerShare
          ELSE 0
        END AS transaction_value,
        t.type
      FROM
        \`cash-stacker.cash_stacker_dataset.workspaces\` AS w,
        UNNEST(w.subCollections.assetTransactions) AS t
      WHERE
        w.id = @workspaceId
    ),
    asset_additions AS (
      SELECT
        a.initialPurchaseDate AS date,
        EXTRACT(YEAR FROM TIMESTAMP(a.initialPurchaseDate)) AS year,
        EXTRACT(MONTH FROM TIMESTAMP(a.initialPurchaseDate)) AS month,
        a.inputCurrentPrice AS transaction_value,
        '매수' AS type
      FROM
        \`cash-stacker.cash_stacker_dataset.workspaces\` AS w,
        UNNEST(w.subCollections.assets) AS a
      WHERE
        w.id = @workspaceId
        AND a.category.id = 'default_cash_krw'
    ),
    all_transactions AS (
      SELECT * FROM asset_transactions
      UNION ALL
      SELECT * FROM asset_additions
    ),
    transactions_with_cumulative_value AS (
      SELECT
        date,
        year,
        month,
        transaction_value,
        type,
        SUM(
          CASE
            WHEN type = '매수' THEN transaction_value
            WHEN type = '매도' THEN -transaction_value
            ELSE transaction_value
          END
        ) OVER (ORDER BY date) AS cumulative_value
      FROM all_transactions
    )
    SELECT
      FORMAT_TIMESTAMP('%Y-%m', TIMESTAMP(CONCAT(CAST(year AS STRING), '-', CAST(month AS STRING), '-01'))) AS year_month,
      MAX(cumulative_value) AS total_value
    FROM transactions_with_cumulative_value
    GROUP BY year_month
    ORDER BY year_month;
  `;

  const options = {
    query: query,
    params: { workspaceId: workspaceId },
  };

  try {
    const [rows] = await bigquery.query(options);
    return rows;
  } catch (error) {
    console.error("Error querying BigQuery:", error);
    throw new Error(`Error querying BigQuery: ${error}`);
  }
};
