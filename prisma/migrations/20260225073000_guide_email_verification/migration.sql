ALTER TABLE `User`
ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN `emailVerificationToken` VARCHAR(191) NULL,
ADD COLUMN `emailVerificationTokenExpiresAt` DATETIME(3) NULL;

CREATE UNIQUE INDEX `User_emailVerificationToken_key` ON `User`(`emailVerificationToken`);

UPDATE `User`
SET `emailVerified` = true
WHERE `role` <> 'GUIDE';
