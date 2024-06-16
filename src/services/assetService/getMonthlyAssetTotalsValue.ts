import { PrismaClient } from "@prisma/client";
import { Sql } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const getMonthlyAssetTotalsValue = async (workspaceId: string) => {
  const query = `
    WITH asset_transactions AS (
      SELECT
        t.transaction_date AS date,
        YEAR(t.transaction_date) AS year,
        MONTH(t.transaction_date) AS month,
        CASE
          WHEN t.transaction_type = 'ForexTransaction' THEN t.amount * t.exchange_rate
          WHEN t.transaction_type = 'ForeignTransaction' THEN t.price_per_share * t.exchange_rate * t.shares
          WHEN t.transaction_type = 'DomesticTransaction' THEN t.shares * t.price_per_share
          ELSE 0
        END AS transaction_value,
        t.transaction_type AS type
      FROM
        AssetTransaction t
      JOIN
        AssetToTransaction att ON t.transaction_id = att.transaction_id
      JOIN
        Asset a ON att.asset_id = a.asset_id
      WHERE
        a.workspace_id = ?
    ),
    asset_additions AS (
      SELECT
        a.created_at AS date,
        YEAR(a.created_at) AS year,
        MONTH(a.created_at) AS month,
        a.balance AS transaction_value,
        '매수' AS type
      FROM
        Asset a
      WHERE
        a.workspace_id = ?
        AND a.asset_type_id = (
          SELECT asset_type_id FROM AssetType WHERE asset_type_name = 'default_cash_krw' LIMIT 1
        )
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
      DATE_FORMAT(STR_TO_DATE(CONCAT(year, '-', month, '-01'), '%Y-%m-%d'), '%Y-%m') AS year_month,
      MAX(cumulative_value) AS total_value
    FROM transactions_with_cumulative_value
    GROUP BY year_month
    ORDER BY year_month;
  `;

  const results = await prisma.$queryRaw(
    query as unknown as TemplateStringsArray | Sql,
    workspaceId,
    workspaceId
  );
  return results;
};
