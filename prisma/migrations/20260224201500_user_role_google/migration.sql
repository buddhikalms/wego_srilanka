-- Make password optional for OAuth users
ALTER TABLE `User` MODIFY `passwordHash` VARCHAR(191) NULL;

-- Expand enum temporarily, migrate data, then tighten enum to final values
ALTER TABLE `User` MODIFY `role` ENUM('TRAVELER','USER','GUIDE','ADMIN') NOT NULL DEFAULT 'USER';
UPDATE `User` SET `role`='USER' WHERE `role`='TRAVELER';
ALTER TABLE `User` MODIFY `role` ENUM('USER','GUIDE','ADMIN') NOT NULL DEFAULT 'USER';