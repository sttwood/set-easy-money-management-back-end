import {Router} from "express";

import {
  getIncomesExpenses,
  getIncomeExpenseById,
  createIncomeExpense,
  updateIncomeExpense,
  deleteIncomeExpense
} from '../controllers/income-expense.controller'

const incomeRouter = Router();

incomeRouter.get('/incomes-expenses/:id', getIncomesExpenses)
incomeRouter.get('/income-expense/:id', getIncomeExpenseById)
incomeRouter.post('/income-expense', createIncomeExpense)
incomeRouter.patch('/income-expense/:id', updateIncomeExpense)
incomeRouter.delete('/income-expense/:id', deleteIncomeExpense)

export default incomeRouter