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
  UsersCreateData,
  UsersCreatePayload,
  UsersDetailData,
  UsersUpdateData,
  UsersUpdatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Create a new user with the provided information.
   *
   * @tags user
   * @name UsersCreate
   * @summary Create a new user
   * @request POST:/users
   * @secure
   * @response `201` `UsersCreateData` User created successfully.
   * @response `400` `void` Required fields are missing.
   * @response `500` `void` Failed to create user.
   */
  usersCreate = (data: UsersCreatePayload, params: RequestParams = {}) =>
    this.request<UsersCreateData, void>({
      path: `/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve a user by their user ID.
   *
   * @tags user
   * @name UsersDetail
   * @summary Retrieve a user by ID
   * @request GET:/users/{id}
   * @secure
   * @response `200` `UsersDetailData` A user object.
   * @response `400` `void` User ID is required.
   * @response `500` `void` Invalid user ID.
   */
  usersDetail = (id: string, params: RequestParams = {}) =>
    this.request<UsersDetailData, void>({
      path: `/users/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Update the status of a user by their user ID.
   *
   * @tags user
   * @name UsersUpdate
   * @summary Update user status
   * @request PUT:/users/{id}
   * @secure
   * @response `201` `UsersUpdateData` User status updated successfully.
   * @response `500` `void` Failed to update user status.
   */
  usersUpdate = (id: string, data: UsersUpdatePayload, params: RequestParams = {}) =>
    this.request<UsersUpdateData, void>({
      path: `/users/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
