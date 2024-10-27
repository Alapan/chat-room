/*
  Warnings:

  - Added the required column `description` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "image" VARCHAR(255) NOT NULL;
