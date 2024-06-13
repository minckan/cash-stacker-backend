-- DropIndex
DROP INDEX `Asset_asset_type_id_fkey` ON `Asset`;

-- DropIndex
DROP INDEX `Budget_workspace_id_fkey` ON `Budget`;

-- DropIndex
DROP INDEX `Invitation_workspace_id_fkey` ON `Invitation`;

-- DropIndex
DROP INDEX `Transaction_category_id_fkey` ON `Transaction`;

-- AlterTable
ALTER TABLE `AssetTransaction` ADD COLUMN `assetAsset_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AssetTransaction` ADD CONSTRAINT `AssetTransaction_assetAsset_id_fkey` FOREIGN KEY (`assetAsset_id`) REFERENCES `Asset`(`asset_id`) ON DELETE SET NULL ON UPDATE CASCADE;
