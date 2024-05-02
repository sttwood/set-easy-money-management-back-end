/*
  Warnings:

  - You are about to drop the column `category_id` on the `IncomeExpense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IncomeExpense" DROP CONSTRAINT "IncomeExpense_category_id_fkey";

-- AlterTable
ALTER TABLE "IncomeExpense" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "_CategoryToIncomeExpense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToIncomeExpense_AB_unique" ON "_CategoryToIncomeExpense"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToIncomeExpense_B_index" ON "_CategoryToIncomeExpense"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToIncomeExpense" ADD CONSTRAINT "_CategoryToIncomeExpense_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToIncomeExpense" ADD CONSTRAINT "_CategoryToIncomeExpense_B_fkey" FOREIGN KEY ("B") REFERENCES "IncomeExpense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
