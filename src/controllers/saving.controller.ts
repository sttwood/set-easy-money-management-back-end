import {PrismaClient} from "@prisma/client";

const savingClient = new PrismaClient().savings;

//@Title    Get All
//@Method   GET
//@Path     /savings/:id
export const getSavings = async (req, res) => {
  try {
    const userId = req.params.id
    const savings = await savingClient.findMany({
      where: {
        user_id: userId
      }
    })

    res.status(200).json({status: 'success', data: savings})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Get One
//@Method   GET
//@Path     /saving/:id
export const getSavingById = async (req, res) => {
  try {
    const userId = req.params.id
    const saving = await savingClient.findUnique({
      where: {
        id: Number(userId)
      }
    })

    res.status(200).json({status: 'success', data: saving})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Create Saving
//@Method   POST
//@Path     /saving
export const createSaving = async (req, res) => {
  try {
    const {id, amount, interest_rate} = req.body

    const findSaving = await savingClient.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (findSaving) {
      console.log(findSaving)
      res.status(200).json({status: 'success', data: findSaving})
    } else {
      const amountNumber = Number(amount)
      const interestRate = Number(interest_rate)

      const presentAmountNumber = amountNumber
      const interestNumber = (interestRate * + amountNumber) / 100
      const totalAmountNumber = presentAmountNumber + interestNumber

      const savingBody = {
        ...req.body,
        present_amount: String(presentAmountNumber),
        interest: String(interestNumber),
        total_amount: String(totalAmountNumber),
      }
      const saving = await savingClient.create({data: savingBody})
      console.log(savingBody)
      res.status(200).json({status: 'success', data: saving})
    }



  } catch (error) {
    console.error(error)
  }
}

//@Title    Update Saving
//@Method   PATCH
//@Path     /saving/:id
export const updateSaving = async (req, res) => {
  try {
    const savingId = req.params.id
    const savingBody = {
      ...req.body
    }
    const saving = await savingClient.update({
      where: {
        id: Number(savingId)
      },
      data: savingBody
    })

    res.status(200).json({status: 'success', data: saving})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Delete Saving
//@Method   DELETE
//@Path     /saving/:id
export const deleteSaving = async (req, res) => {
  try {
    const savingId = req.params.id
    const saving = await savingClient.delete({
      where: {
        id: Number(savingId)
      }
    })

    res.status(200).json({status: 'success', data: saving})
  } catch (error) {
    console.error(error)
  }
}