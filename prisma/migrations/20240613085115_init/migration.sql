-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_asset_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_workspace_id_fkey`;

-- DropForeignKey
ALTER TABLE `AssetTransaction` DROP FOREIGN KEY `AssetTransaction_asset_id_fkey`;

-- DropForeignKey
ALTER TABLE `AssetType` DROP FOREIGN KEY `AssetType_workspace_id_fkey`;

-- DropForeignKey
ALTER TABLE `Budget` DROP FOREIGN KEY `Budget_workspace_id_fkey`;

-- DropForeignKey
ALTER TABLE `Invitation` DROP FOREIGN KEY `Invitation_workspace_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_workspace_id_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionCategory` DROP FOREIGN KEY `TransactionCategory_workspace_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_workspace_id_fkey`;
