-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `workspace_id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `login_type` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `joined_at` DATETIME(3) NOT NULL,
    `push_enable` BOOLEAN NOT NULL,
    `darkMode_enable` BOOLEAN NOT NULL,
    `profile_image` VARCHAR(191) NOT NULL,
    `push_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workspace` (
    `workspace_id` INTEGER NOT NULL AUTO_INCREMENT,
    `workspace_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`workspace_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `workspace_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Transaction_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionCategory` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `workspace_id` INTEGER NOT NULL,
    `category_name` VARCHAR(191) NOT NULL,

    INDEX `TransactionCategory_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssetType` (
    `asset_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `workspace_id` INTEGER NOT NULL,
    `asset_type_name` VARCHAR(191) NOT NULL,
    `is_default` BOOLEAN NOT NULL,

    INDEX `AssetType_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`asset_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asset` (
    `asset_id` INTEGER NOT NULL AUTO_INCREMENT,
    `workspace_id` INTEGER NOT NULL,
    `asset_type_id` INTEGER NOT NULL,
    `asset_name` VARCHAR(191) NOT NULL,
    `balance` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Asset_workspace_id_idx`(`workspace_id`),
    PRIMARY KEY (`asset_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssetTransaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `transaction_type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_foreign` BOOLEAN NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `exchange_rate` DOUBLE NOT NULL,
    `shares` INTEGER NOT NULL,
    `price_per_share` DOUBLE NOT NULL,

    INDEX `AssetTransaction_asset_id_idx`(`asset_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invitation` (
    `id` VARCHAR(191) NOT NULL,
    `workspace_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiry_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Budget` (
    `budget_id` INTEGER NOT NULL AUTO_INCREMENT,
    `workspace_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`budget_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `TransactionCategory`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionCategory` ADD CONSTRAINT `TransactionCategory_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssetType` ADD CONSTRAINT `AssetType_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_asset_type_id_fkey` FOREIGN KEY (`asset_type_id`) REFERENCES `AssetType`(`asset_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssetTransaction` ADD CONSTRAINT `AssetTransaction_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `Asset`(`asset_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invitation` ADD CONSTRAINT `Invitation_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_workspace_id_fkey` FOREIGN KEY (`workspace_id`) REFERENCES `Workspace`(`workspace_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
