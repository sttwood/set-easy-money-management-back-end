import {Router} from "express";

import {
  getIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome
} from '../controllers/income.controller'

const incomeRouter = Router();

incomeRouter.get('/incomes/:id', getIncomes)
incomeRouter.get('/income/:id', getIncomeById)
incomeRouter.post('/income/', createIncome)
incomeRouter.patch('/income/:id', updateIncome)
incomeRouter.delete('/income/:id', deleteIncome)

export default incomeRouter