-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "balance" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);
