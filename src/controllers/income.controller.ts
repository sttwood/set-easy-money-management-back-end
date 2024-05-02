import {PrismaClient} from "@prisma/client";

const incomeClient = new PrismaClient().income;

//@Title    Get All
//@Method   GET
//@Path     /incomes/:id
export const getIncomes = async (req, res) => {
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
//@Path     /income/:id
export const getIncomeById = async (req, res) => {
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
//@Path     /income
export const createIncome = async (req, res) => {
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
//@Path     /income/:id
export const updateIncome = async (req, res) => {
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
//@Path     /income/:id
export const deleteIncome = async (req, res) => {
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