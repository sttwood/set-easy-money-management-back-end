/*
  Warnings:

  - You are about to drop the column `category_name` on the `IncomeExpense` table. All the data in the column will be lost.
  - You are about to drop the column `category_type` on the `IncomeExpense` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `IncomeExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncomeExpense" DROP COLUMN "category_name",
DROP COLUMN "category_type",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeExpense" ADD CONSTRAINT "IncomeExpense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
