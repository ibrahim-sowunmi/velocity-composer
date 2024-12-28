/*
  Warnings:

  - Made the column `puckData` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "productList" SET DATA TYPE TEXT[],
ALTER COLUMN "puckData" SET NOT NULL;
