/*
  Warnings:

  - You are about to drop the column `sleep` on the `TrackerData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrackerData" DROP COLUMN "sleep",
ADD COLUMN     "duration" INTEGER;
