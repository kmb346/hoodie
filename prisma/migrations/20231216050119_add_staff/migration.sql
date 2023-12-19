/*
  Warnings:

  - You are about to drop the column `room_id` on the `class` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `def_room_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class` DROP FOREIGN KEY `Class_room_id_fkey`;

-- AlterTable
ALTER TABLE `class` DROP COLUMN `room_id`,
    ADD COLUMN `def_room_id` INTEGER NOT NULL,
    ADD COLUMN `teacher_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profile_pic` VARCHAR(191) NOT NULL,
    `created_on` DATETIME(3) NOT NULL,
    `last_login` DATETIME(3) NOT NULL,
    `is_active` BOOLEAN NOT NULL,

    UNIQUE INDEX `Staff_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_def_room_id_fkey` FOREIGN KEY (`def_room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
