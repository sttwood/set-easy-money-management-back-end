/*
  Warnings:

  - Changed the type of `type` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "IncomeExpense" ADD COLUMN     "categories" JSONB[];
