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

import {
  AssetsCreateData,
  AssetsCreatePayload,
  AssetsDeleteData,
  AssetsDetail2Data,
  AssetsDetailData,
  AssetsUpdateData,
  AssetsUpdatePayload,
  BudgetCreateData,
  BudgetCreatePayload,
  BudgetDeleteData,
  BudgetDetailData,
  BudgetUpdateData,
  BudgetUpdatePayload,
  CategoryCreateData,
  CategoryCreatePayload,
  CategoryDeleteData,
  CategoryDetailData,
  CategoryUpdateData,
  CategoryUpdatePayload,
  DailyDetailData,
  FinanceCreateData,
  FinanceCreatePayload,
  FinanceDeleteData,
  FinanceUpdateData,
  FinanceUpdatePayload,
  InvitationCreateData,
  InvitationCreatePayload,
  InvitationDeleteData,
  InvitationDetailData,
  InvitationUpdateData,
  InvitationUpdatePayload,
  MonthlyDetailData,
  MonthlyTrendDetailData,
  TransactionsDetailData,
  TypeCreateData,
  TypeCreatePayload,
  TypeDeleteData,
  TypeDetailData,
  TypeUpdateData,
  TypeUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class WorkspaceId<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Create a new asset for the specified workspace.
   *
   * @tags asset
   * @name AssetsCreate
   * @summary Create a new asset
   * @request POST:/{workspaceId}/assets
   * @secure
   * @response `201` `AssetsCreateData` Asset created successfully.
   * @response `500` `void` Failed to create asset.
   */
  assetsCreate = (workspaceId: string, data: AssetsCreatePayload, params: RequestParams = {}) =>
    this.request<AssetsCreateData, void>({
      path: `/${workspaceId}/assets`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all assets for the specified workspace.
   *
   * @tags asset
   * @name AssetsDetail
   * @summary Get all assets
   * @request GET:/{workspaceId}/assets
   * @secure
   * @response `200` `AssetsDetailData` A list of assets.
   * @response `500` `void` Failed to retrieve assets.
   */
  assetsDetail = (workspaceId: string, params: RequestParams = {}) =>
    this.request<AssetsDetailData, void>({
      path: `/${workspaceId}/assets`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a specific asset by its ID.
   *
   * @tags asset
   * @name AssetsDetail2
   * @summary Get an asset by ID
   * @request GET:/{workspaceId}/assets/{id}
   * @originalName assetsDetail
   * @duplicate
   * @secure
   * @response `200` `AssetsDetail2Data` An asset object.
   * @response `500` `void` Failed to retrieve asset.
   */
  assetsDetail2 = (workspaceId: string, id: number, params: RequestParams = {}) =>
    this.request<AssetsDetail2Data, void>({
      path: `/${workspaceId}/assets/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update the name of a specific asset by its ID.
   *
   * @tags asset
   * @name AssetsUpdate
   * @summary Update an asset name
   * @request PUT:/{workspaceId}/assets/{id}
   * @secure
   * @response `201` `AssetsUpdateData` Asset updated successfully.
   * @response `500` `void` Failed to update asset.
   */
  assetsUpdate = (workspaceId: string, id: number, data: AssetsUpdatePayload, params: RequestParams = {}) =>
    this.request<AssetsUpdateData, void>({
      path: `/${workspaceId}/assets/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete a specific asset by its ID.
   *
   * @tags asset
   * @name AssetsDelete
   * @summary Delete an asset by ID
   * @request DELETE:/{workspaceId}/assets/{id}
   * @secure
   * @response `201` `AssetsDeleteData` Asset deleted successfully.
   * @response `500` `void` Failed to delete asset.
   */
  assetsDelete = (workspaceId: string, id: number, params: RequestParams = {}) =>
    this.request<AssetsDeleteData, void>({
      path: `/${workspaceId}/assets/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a specific asset transaction by its ID.
   *
   * @tags asset
   * @name TransactionsDetail
   * @summary Get an asset transaction by ID
   * @request GET:/{workspaceId}/assets/{assetId}/transactions/{id}
   * @secure
   * @response `200` `TransactionsDetailData` An asset transaction object.
   * @response `500` `void` Failed to retrieve asset transaction.
   */
  transactionsDetail = (workspaceId: string, assetId: number, id: number, params: RequestParams = {}) =>
    this.request<TransactionsDetailData, void>({
      path: `/${workspaceId}/assets/${assetId}/transactions/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve the monthly trend of assets for the specified workspace.
   *
   * @tags asset
   * @name MonthlyTrendDetail
   * @summary Get monthly asset trend
   * @request GET:/{workspaceId}/assets/monthlyTrend
   * @secure
   * @response `200` `MonthlyTrendDetailData` A list of asset trends.
   * @response `500` `void` Failed to retrieve monthly asset trend.
   */
  monthlyTrendDetail = (workspaceId: string, params: RequestParams = {}) =>
    this.request<MonthlyTrendDetailData, void>({
      path: `/${workspaceId}/assets/monthlyTrend`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new financial transaction for the specified workspace.
   *
   * @tags financial tracker
   * @name FinanceCreate
   * @summary Create a new transaction
   * @request POST:/{workspaceId}/finance
   * @secure
   * @response `201` `FinanceCreateData` Transaction created successfully.
   * @response `500` `void` Failed to create transaction.
   */
  financeCreate = (workspaceId: string, data: FinanceCreatePayload, params: RequestParams = {}) =>
    this.request<FinanceCreateData, void>({
      path: `/${workspaceId}/finance`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update an existing financial transaction by its ID.
   *
   * @tags financial tracker
   * @name FinanceUpdate
   * @summary Update a transaction
   * @request PUT:/{workspaceId}/finance/{id}
   * @secure
   * @response `200` `FinanceUpdateData` Transaction updated successfully.
   * @response `500` `void` Failed to update transaction.
   */
  financeUpdate = (workspaceId: string, id: number, data: FinanceUpdatePayload, params: RequestParams = {}) =>
    this.request<FinanceUpdateData, void>({
      path: `/${workspaceId}/finance/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an existing financial transaction by its ID.
   *
   * @tags financial tracker
   * @name FinanceDelete
   * @summary Delete a transaction
   * @request DELETE:/{workspaceId}/finance/{id}
   * @secure
   * @response `204` `FinanceDeleteData` Transaction deleted successfully.
   * @response `500` `void` Failed to delete transaction.
   */
  financeDelete = (workspaceId: string, id: number, params: RequestParams = {}) =>
    this.request<FinanceDeleteData, void>({
      path: `/${workspaceId}/finance/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all financial transactions for the specified month.
   *
   * @tags financial tracker
   * @name MonthlyDetail
   * @summary Get monthly transactions
   * @request GET:/{workspaceId}/finance/monthly/{monthKey}
   * @secure
   * @response `200` `MonthlyDetailData` A list of transactions.
   * @response `500` `void` Failed to fetch monthly transactions.
   */
  monthlyDetail = (workspaceId: string, monthKey: string, params: RequestParams = {}) =>
    this.request<MonthlyDetailData, void>({
      path: `/${workspaceId}/finance/monthly/${monthKey}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all financial transactions for the specified date.
   *
   * @tags financial tracker
   * @name DailyDetail
   * @summary Get daily transactions
   * @request GET:/{workspaceId}/finance/daily/{dateKey}
   * @secure
   * @response `200` `DailyDetailData` A list of transactions.
   * @response `500` `void` Failed to fetch daily transactions.
   */
  dailyDetail = (workspaceId: string, dateKey: string, params: RequestParams = {}) =>
    this.request<DailyDetailData, void>({
      path: `/${workspaceId}/finance/daily/${dateKey}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all asset types for the specified workspace.
   *
   * @tags asset type
   * @name TypeDetail
   * @summary Get all asset types
   * @request GET:/{workspaceId}/asset/type
   * @secure
   * @response `200` `TypeDetailData` A list of asset types.
   * @response `500` `void` Failed to fetch asset types.
   */
  typeDetail = (workspaceId: string, params: RequestParams = {}) =>
    this.request<TypeDetailData, void>({
      path: `/${workspaceId}/asset/type`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new asset type for the specified workspace.
   *
   * @tags asset type
   * @name TypeCreate
   * @summary Create a new asset type
   * @request POST:/{workspaceId}/asset/type
   * @secure
   * @response `201` `TypeCreateData` Asset type created successfully.
   * @response `500` `void` Failed to create asset type.
   */
  typeCreate = (workspaceId: string, data: TypeCreatePayload, params: RequestParams = {}) =>
    this.request<TypeCreateData, void>({
      path: `/${workspaceId}/asset/type`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update an existing asset type by its ID.
   *
   * @tags asset type
   * @name TypeUpdate
   * @summary Update an asset type
   * @request PUT:/{workspaceId}/asset/type/{id}
   * @secure
   * @response `200` `TypeUpdateData` Asset type updated successfully.
   * @response `500` `void` Failed to update asset type.
   */
  typeUpdate = (workspaceId: string, id: number, data: TypeUpdatePayload, params: RequestParams = {}) =>
    this.request<TypeUpdateData, void>({
      path: `/${workspaceId}/asset/type/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an existing asset type by its ID.
   *
   * @tags asset type
   * @name TypeDelete
   * @summary Delete an asset type
   * @request DELETE:/{workspaceId}/asset/type/{id}
   * @secure
   * @response `204` `TypeDeleteData` Asset type deleted successfully.
   * @response `500` `void` Failed to delete asset type.
   */
  typeDelete = (workspaceId: string, id: number, params: RequestParams = {}) =>
    this.request<TypeDeleteData, void>({
      path: `/${workspaceId}/asset/type/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new financial category for the specified workspace.
   *
   * @tags financial category
   * @name CategoryCreate
   * @summary Create a new financial category
   * @request POST:/{workspaceId}/finance/category
   * @secure
   * @response `201` `CategoryCreateData` Category created successfully.
   * @response `500` `void` Failed to create category.
   */
  categoryCreate = (workspaceId: string, data: CategoryCreatePayload, params: RequestParams = {}) =>
    this.request<CategoryCreateData, void>({
      path: `/${workspaceId}/finance/category`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update an existing financial category by its ID.
   *
   * @tags financial category
   * @name CategoryUpdate
   * @summary Update a financial category
   * @request PUT:/{workspaceId}/finance/category/{id}
   * @secure
   * @response `200` `CategoryUpdateData` Category updated successfully.
   * @response `500` `void` Failed to update category.
   */
  categoryUpdate = (workspaceId: string, id: number, data: CategoryUpdatePayload, params: RequestParams = {}) =>
    this.request<CategoryUpdateData, void>({
      path: `/${workspaceId}/finance/category/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an existing financial category by its ID.
   *
   * @tags financial category
   * @name CategoryDelete
   * @summary Delete a financial category
   * @request DELETE:/{workspaceId}/finance/category/{id}
   * @secure
   * @response `204` `CategoryDeleteData` Category deleted successfully.
   * @response `500` `void` Failed to delete category.
   */
  categoryDelete = (workspaceId: string, id: number, params: RequestParams = {}) =>
    this.request<CategoryDeleteData, void>({
      path: `/${workspaceId}/finance/category/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all financial categories of a specified type for the specified workspace.
   *
   * @tags financial category
   * @name CategoryDetail
   * @summary Get financial categories by type
   * @request GET:/{workspaceId}/finance/category/{type}
   * @secure
   * @response `200` `CategoryDetailData` A list of categories.
   * @response `500` `void` Failed to fetch categories.
   */
  categoryDetail = (workspaceId: string, type: string, params: RequestParams = {}) =>
    this.request<CategoryDetailData, void>({
      path: `/${workspaceId}/finance/category/${type}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all active budgets for the specified workspace.
   *
   * @tags budget
   * @name BudgetDetail
   * @summary Get all active budgets
   * @request GET:/{workspaceId}/budget
   * @secure
   * @response `200` `BudgetDetailData` A list of active budgets.
   * @response `500` `void` Failed to fetch budgets.
   */
  budgetDetail = (workspaceId: string, params: RequestParams = {}) =>
    this.request<BudgetDetailData, void>({
      path: `/${workspaceId}/budget`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new budget for the specified workspace.
   *
   * @tags budget
   * @name BudgetCreate
   * @summary Create a new budget
   * @request POST:/{workspaceId}/budget
   * @secure
   * @response `201` `BudgetCreateData` Budget created successfully.
   * @response `500` `void` Failed to create budget.
   */
  budgetCreate = (workspaceId: string, data: BudgetCreatePayload, params: RequestParams = {}) =>
    this.request<BudgetCreateData, void>({
      path: `/${workspaceId}/budget`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update an existing budget by its ID.
   *
   * @tags budget
   * @name BudgetUpdate
   * @summary Update a budget
   * @request PUT:/{workspaceId}/budget/{id}
   * @secure
   * @response `200` `BudgetUpdateData` Budget updated successfully.
   * @response `500` `void` Failed to update budget.
   */
  budgetUpdate = (workspaceId: string, id: number, data: BudgetUpdatePayload, params: RequestParams = {}) =>
    this.request<BudgetUpdateData, void>({
      path: `/${workspaceId}/budget/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an existing budget by its ID.
   *
   * @tags budget
   * @name BudgetDelete
   * @summary Delete a budget
   * @request DELETE:/{workspaceId}/budget/{id}
   * @secure
   * @response `204` `BudgetDeleteData` Budget deleted successfully.
   * @response `500` `void` Failed to delete budget.
   */
  budgetDelete = (workspaceId: string, id: number, params: RequestParams = {}) =>
    this.request<BudgetDeleteData, void>({
      path: `/${workspaceId}/budget/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve all invitations sent from the specified workspace.
   *
   * @tags invitation
   * @name InvitationDetail
   * @summary Get all invitations
   * @request GET:/{workspaceId}/invitation
   * @secure
   * @response `200` `InvitationDetailData` A list of invitations.
   * @response `500` `void` Failed to fetch invitations.
   */
  invitationDetail = (workspaceId: string, params: RequestParams = {}) =>
    this.request<InvitationDetailData, void>({
      path: `/${workspaceId}/invitation`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Create a new invitation for the specified workspace.
   *
   * @tags invitation
   * @name InvitationCreate
   * @summary Create a new invitation
   * @request POST:/{workspaceId}/invitation
   * @secure
   * @response `201` `InvitationCreateData` Invitation created successfully.
   * @response `500` `void` Failed to create invitation.
   */
  invitationCreate = (workspaceId: string, data: InvitationCreatePayload, params: RequestParams = {}) =>
    this.request<InvitationCreateData, void>({
      path: `/${workspaceId}/invitation`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Update the status of an existing invitation by its ID.
   *
   * @tags invitation
   * @name InvitationUpdate
   * @summary Update an invitation
   * @request PUT:/{workspaceId}/invitation/{id}
   * @secure
   * @response `200` `InvitationUpdateData` Invitation updated successfully.
   * @response `500` `void` Failed to update invitation.
   */
  invitationUpdate = (workspaceId: string, id: string, data: InvitationUpdatePayload, params: RequestParams = {}) =>
    this.request<InvitationUpdateData, void>({
      path: `/${workspaceId}/invitation/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Delete an existing invitation by its ID.
   *
   * @tags invitation
   * @name InvitationDelete
   * @summary Delete an invitation
   * @request DELETE:/{workspaceId}/invitation/{id}
   * @secure
   * @response `204` `InvitationDeleteData` Invitation deleted successfully.
   * @response `500` `void` Failed to delete invitation.
   */
  invitationDelete = (workspaceId: string, id: string, params: RequestParams = {}) =>
    this.request<InvitationDeleteData, void>({
      path: `/${workspaceId}/invitation/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
