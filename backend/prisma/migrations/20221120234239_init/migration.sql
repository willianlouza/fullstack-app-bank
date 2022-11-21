/*
  Warnings:

  - You are about to alter the column `balance` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Real` to `Decimal(15,2)`.
  - You are about to alter the column `value` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Real` to `Decimal(15,2)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(15,2);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "value" SET DATA TYPE DECIMAL(15,2);
