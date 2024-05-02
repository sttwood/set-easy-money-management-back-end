/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToIncomeExpense` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_name` to the `IncomeExpense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_type` to the `IncomeExpense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToIncomeExpense" DROP CONSTRAINT "_CategoryToIncomeExpense_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToIncomeExpense" DROP CONSTRAINT "_CategoryToIncomeExpense_B_fkey";

-- AlterTable
ALTER TABLE "IncomeExpense" ADD COLUMN     "category_name" TEXT NOT NULL,
ADD COLUMN     "category_type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Savings" ALTER COLUMN "present_amount" DROP NOT NULL,
ALTER COLUMN "interest" DROP NOT NULL,
ALTER COLUMN "total_amount" DROP NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToIncomeExpense";
