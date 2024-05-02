import {PrismaClient} from "@prisma/client";

const incomeClient = new PrismaClient().incomeExpense;

//@Title    Get All
//@Method   GET
//@Path     /incomes-expenses/:id
export const getIncomesExpenses = async (req, res) => {
  try {
    const userId = req.params.id
    const incomes = await incomeClient.findMany({
      where: {
        user_id: userId
      }
    })

    res.status(200).json({status: 'success', data: incomes})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Get One
//@Method   GET
//@Path     /income-expense/:id
export const getIncomeExpenseById = async (req, res) => {
  try {
    const incomeId = req.params.id
    const incomes = await incomeClient.findUnique({
      where: {
        id: Number(incomeId)
      }
    })

    res.status(200).json({status: 'success', data: incomes})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Create Income
//@Method   POST
//@Path     /income-expense
export const createIncomeExpense = async (req, res) => {
  try {
    const incomeBody = req.body
    const income = await incomeClient.create({data: incomeBody})

    res.status(200).json({status: 'success', data: income})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Update Income
//@Method   PATCH
//@Path     /income-expense/:id
export const updateIncomeExpense = async (req, res) => {
  try {
    const incomeId = req.params.id
    const incomeBody = req.body
    const income = await incomeClient.update({
      where: {
        id: Number(incomeId)
      },
      data: incomeBody
    })

    res.status(200).json({status: 'success', data: income})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Delete income
//@Method   DELETE
//@Path     /income-expense/:id
export const deleteIncomeExpense = async (req, res) => {
  try {
    const incomeId = req.params.id
    const income = await incomeClient.delete({
      where: {
        id: Number(incomeId)
      }
    })

    res.status(200).json({status: 'success', data: income})
  } catch (error) {
    console.error(error)
  }
}