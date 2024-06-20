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
  WorkspacesCreateData,
  WorkspacesCreatePayload,
  WorkspacesDetailData,
  WorkspacesListData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Workspaces<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Create a new workspace with the provided information.
   *
   * @tags workspace
   * @name WorkspacesCreate
   * @summary Create a new workspace
   * @request POST:/workspaces
   * @secure
   * @response `201` `WorkspacesCreateData` Workspace created successfully.
   * @response `400` `void` Workspace ID is required.
   * @response `500` `void` Failed to create workspace.
   */
  workspacesCreate = (data: WorkspacesCreatePayload, params: RequestParams = {}) =>
    this.request<WorkspacesCreateData, void>({
      path: `/workspaces`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve all workspaces.
   *
   * @tags workspace
   * @name WorkspacesList
   * @summary Get all workspaces
   * @request GET:/workspaces
   * @secure
   * @response `200` `WorkspacesListData` A list of workspaces.
   * @response `500` `void` Failed to retrieve workspaces.
   */
  workspacesList = (params: RequestParams = {}) =>
    this.request<WorkspacesListData, void>({
      path: `/workspaces`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Retrieve a specific workspace by its ID.
   *
   * @tags workspace
   * @name WorkspacesDetail
   * @summary Get a workspace by ID
   * @request GET:/workspaces/{id}
   * @secure
   * @response `200` `WorkspacesDetailData` A workspace object.
   * @response `404` `void` Workspace not found.
   * @response `500` `void` Failed to retrieve workspace.
   */
  workspacesDetail = (id: string, params: RequestParams = {}) =>
    this.request<WorkspacesDetailData, void>({
      path: `/workspaces/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
}
