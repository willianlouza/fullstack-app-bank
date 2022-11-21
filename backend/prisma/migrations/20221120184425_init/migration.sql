-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_creditedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_debitedAccountId_fkey";
