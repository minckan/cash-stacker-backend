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

export interface User {
  user_id?: string;
  workspace_id?: string;
  username?: string;
  /** @format email */
  email?: string;
  /** @format date-time */
  created_at?: string;
  login_type?: string;
  role?: string;
  /** @format date-time */
  joined_at?: string;
  push_enable?: boolean;
  darkMode_enable?: boolean;
  profile_image?: string;
  push_id?: string;
  platform_type?: string;
}

export interface Workspace {
  workspace_id?: string;
  workspace_name?: string;
  /** @format date-time */
  created_at?: string;
}

export interface Transaction {
  transaction_id?: number;
  category_id?: number;
  workspace_id?: string;
  /** @format float */
  amount?: number;
  transaction_type?: string;
  payment_method?: string;
  description?: string;
  /** @format date-time */
  transaction_date?: string;
  /** @format date-time */
  created_at?: string;
}

export interface TransactionCategory {
  category_id?: number;
  workspace_id?: string;
  category_name?: string;
  category_type?: string;
}

export interface AssetType {
  asset_type_id?: number;
  workspace_id?: string;
  asset_type_name?: string;
  is_default?: boolean;
}

export interface Asset {
  asset_id?: number;
  workspace_id?: string;
  asset_type_id?: number;
  asset_name?: string;
  /** @format float */
  balance?: number;
  /** @format date-time */
  created_at?: string;
  currency_code?: string;
  transactions?: AssetToTransaction[];
}

export interface AssetTransaction {
  transaction_id?: number;
  /** @format date-time */
  created_at?: string;
  asset_id?: number;
  transaction_type?: string;
  description?: string;
  /** @format date-time */
  transaction_date?: string;
  currency?: string;
  /** @format float */
  amount?: number;
  /** @format float */
  exchange_rate?: number;
  shares?: number;
  /** @format float */
  price_per_share?: number;
  assets?: AssetToTransaction[];
}

export interface AssetToTransaction {
  asset_id?: number;
  transaction_id?: number;
}

export interface Invitation {
  id?: string;
  workspace_id?: string;
  /** @format email */
  email?: string;
  status?: string;
  token?: string;
  /** @format date-time */
  expiry_date?: string;
}

export interface Budget {
  budget_id?: number;
  workspace_id?: string;
  /** @format date-time */
  start_date?: string;
  /** @format date-time */
  end_date?: string;
  /** @format float */
  amount?: number;
  /** @format date-time */
  created_at?: string;
  isActive?: boolean;
}

export interface UsersCreatePayload {
  /** The ID of the workspace. */
  workspace_id?: string;
  /** The username of the user. */
  username?: string;
  /** The email of the user. */
  email?: string;
  /** The login type of the user. */
  login_type?: string;
  /** The role of the user. */
  role?: string;
  /** Whether push notifications are enabled. */
  push_enable?: boolean;
  /** Whether dark mode is enabled. */
  darkMode_enable?: boolean;
  /** The profile image of the user. */
  profile_image?: string;
  /** The push ID of the user. */
  push_id?: string;
  /**
   * The date the user joined.
   * @format date-time
   */
  joined_at?: string;
  /**
   * The date the user was created.
   * @format date-time
   */
  created_at?: string;
  /** The ID of the user. */
  user_id?: string;
  /** The platform type of the user. */
  platform_type?: string;
}

export interface UsersCreateData {
  /** The ID of the newly created user. */
  user_id?: string;
}

export type UsersDetailData = User;

export interface UsersUpdatePayload {
  /** Whether push notifications are enabled. */
  push_enable?: boolean;
  /** Whether dark mode is enabled. */
  darkMode_enable?: boolean;
  /** The role of the user. */
  role?: string;
}

export type UsersUpdateData = any;

export interface WorkspacesCreatePayload {
  /** The name of the workspace. */
  workspace_name?: string;
  /** The ID of the workspace. */
  workspace_id?: string;
}

export interface WorkspacesCreateData {
  /** The ID of the newly created workspace. */
  workspace_id?: string;
}

export type WorkspacesListData = Workspace[];

export type WorkspacesDetailData = Workspace;

export interface AssetsCreatePayload {
  asset_type_id?: number;
  asset_name?: string;
  /** @format float */
  balance?: number;
  transactions?: AssetTransaction[];
  currency_code?: string;
}

export type AssetsCreateData = Asset;

export type AssetsDetailData = Asset[];

export type AssetsDetail2Data = Asset;

export interface AssetsUpdatePayload {
  asset_name?: string;
}

export type AssetsUpdateData = Asset;

export type AssetsDeleteData = any;

export type TransactionsDetailData = AssetTransaction;

export type MonthlyTrendDetailData = {
  /** @format date */
  month?: string;
  /** @format float */
  total_balance?: number;
}[];

export interface FinanceCreatePayload {
  category_id?: number;
  /** @format float */
  amount?: number;
  transaction_type?: string;
  description?: string;
  /** @format date-time */
  transaction_date?: string;
  payment_method?: string;
}

export type FinanceCreateData = Transaction;

export interface FinanceUpdatePayload {
  category_id?: number;
  /** @format float */
  amount?: number;
  transaction_type?: string;
  description?: string;
  /** @format date-time */
  transaction_date?: string;
}

export type FinanceUpdateData = Transaction;

export type FinanceDeleteData = any;

export type MonthlyDetailData = Transaction[];

export type DailyDetailData = Transaction[];

export type TypeDetailData = AssetType[];

export interface TypeCreatePayload {
  /** The name of the asset type */
  asset_type_name?: string;
}

export type TypeCreateData = AssetType;

export interface TypeUpdatePayload {
  /** The name of the asset type */
  asset_type_name?: string;
}

export type TypeUpdateData = AssetType;

export type TypeDeleteData = any;

export interface CategoryCreatePayload {
  /** The name of the category */
  category_name?: string;
  /** The type of the category (income or expense) */
  category_type?: string;
}

export type CategoryCreateData = TransactionCategory;

export interface CategoryUpdatePayload {
  /** The name of the category */
  category_name?: string;
  /** The type of the category (income or expense) */
  category_type?: string;
}

export type CategoryUpdateData = TransactionCategory;

export type CategoryDeleteData = any;

export type CategoryDetailData = TransactionCategory[];

export type BudgetDetailData = Budget[];

export interface BudgetCreatePayload {
  /**
   * The start date of the budget
   * @format date-time
   */
  start_date?: string;
  /**
   * The end date of the budget
   * @format date-time
   */
  end_date?: string;
  /**
   * The amount of the budget
   * @format float
   */
  amount?: number;
  /** Whether the budget is active */
  isActive?: boolean;
}

export type BudgetCreateData = Budget;

export interface BudgetUpdatePayload {
  /**
   * The start date of the budget
   * @format date-time
   */
  start_date?: string;
  /**
   * The end date of the budget
   * @format date-time
   */
  end_date?: string;
  /**
   * The amount of the budget
   * @format float
   */
  amount?: number;
  /** Whether the budget is active */
  isActive?: boolean;
}

export type BudgetUpdateData = Budget;

export type BudgetDeleteData = any;

export type InvitationDetailData = Invitation[];

export interface InvitationCreatePayload {
  /** The email address to send the invitation to */
  email?: string;
  /** The status of the invitation */
  status?: string;
  /** The invitation token */
  token?: string;
  /**
   * The expiry date of the invitation
   * @format date-time
   */
  expiry_date?: string;
}

export type InvitationCreateData = Invitation;

export interface InvitationUpdatePayload {
  /** The new status of the invitation */
  status?: string;
}

export type InvitationUpdateData = Invitation;

export type InvitationDeleteData = any;

export interface ExchangeRatesListData {
  /** Exchange rates with currency codes as keys and rates as values. */
  rates?: Record<string, number>;
  /** Base currency for the exchange rates. */
  base?: string;
  /**
   * The date when the exchange rates were last updated.
   * @format date
   */
  date?: string;
}
