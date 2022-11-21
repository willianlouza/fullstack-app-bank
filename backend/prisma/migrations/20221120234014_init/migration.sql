/*
  Warnings:

  - You are about to alter the column `balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.
  - You are about to alter the column `value` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Real`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "value" SET DATA TYPE REAL;
