/*
  Warnings:

  - You are about to drop the column `name` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountID]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountID` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_name_fkey";

-- DropIndex
DROP INDEX "accounts_name_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accountID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_accountID_key" ON "users"("accountID");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
