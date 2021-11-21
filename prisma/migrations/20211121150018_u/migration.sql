/*
  Warnings:

  - You are about to drop the column `referrer` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "referrer",
DROP COLUMN "uid";
