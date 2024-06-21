/*
  Warnings:

  - You are about to drop the column `endDate` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "status";
