/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ExchangeRatesListData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieve the latest exchange rates.
   *
   * @tags exchange-rate
   * @name ExchangeRatesList
   * @summary Fetch exchange rates
   * @request GET:/api/exchange-rates
   * @secure
   * @response `200` `ExchangeRatesListData` Successfully fetched exchange rates.
   * @response `500` `void` Failed to fetch exchange rates.
   */
  exchangeRatesList = (params: RequestParams = {}) =>
    this.request<ExchangeRatesListData, void>({
      path: `/api/exchange-rates`,
      method: "GET",
      secure: true,
      ...params,
    });
}
