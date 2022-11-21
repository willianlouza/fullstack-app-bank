/*
  Warnings:

  - You are about to alter the column `balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(15,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;
