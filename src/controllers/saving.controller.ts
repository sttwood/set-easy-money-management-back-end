import {PrismaClient} from "@prisma/client"

const savingClient = new PrismaClient().savings

//@Title    Get All
//@Method   GET
//@Path     /savings/:user_id
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
    const {user_id, amount, interest_rate, date} = req.body

    // Convert amount and interest_rate to numbers for calculations
    const amountNumber = Number(amount)
    const interestRate = Number(interest_rate)

    // Check if a saving record already exists for the user
    const existingSaving = await savingClient.findFirst({
      where: {
        user_id: user_id
      },
      orderBy: {
        id: 'desc'
      }
    })

    let presentAmountNumber = amountNumber
    let interestNumber = (interestRate * amountNumber) / 100
    let totalAmountNumber = presentAmountNumber + interestNumber

    if (existingSaving) {
      // Calculate based on existing data
      presentAmountNumber = Number(existingSaving.total_amount) + amountNumber;
      interestNumber = (interestRate * presentAmountNumber) / 100;
      totalAmountNumber = presentAmountNumber + interestNumber;
    }

    // Create new record
    const savingBody = {
      user_id,
      amount: String(amountNumber),
      interest_rate: String(interestRate),
      present_amount: String(presentAmountNumber),
      interest: String(interestNumber),
      total_amount: String(totalAmountNumber),
      date: new Date(date)
    }

    const saving = await savingClient.create({data: savingBody});

    res.status(200).json({status: 'success', data: saving})

  } catch (error) {
    console.error(error)
    res.status(500).json({status: 'error', message: 'Internal Server Error'})
  }
}

//@Title    Update Saving
//@Method   PATCH
//@Path     /saving/:id
export const updateSaving = async (req, res) => {
  try {
    const {amount, interest_rate, date} = req.body
    const savingId = req.params.id

    // Fetch the existing saving record by ID
    const existingSaving = await savingClient.findUnique({
      where: {
        id: Number(savingId)
      }
    })

    if (!existingSaving) {
      return res.status(404).json({status: 'error', message: 'Saving record not found'})
    }

    // Convert amount to number for calculations
    const amountNumber = Number(amount);
    if (isNaN(amountNumber)) {
      return res.status(400).json({status: 'error', message: 'Invalid amount'});
    }

    // Handle optional fields
    let interestRate = existingSaving.interest_rate;
    if (interest_rate) {
      interestRate = interest_rate;
    }

    const interestRateNumber = Number(interestRate);
    if (isNaN(interestRateNumber)) {
      return res.status(400).json({status: 'error', message: 'Invalid interest rate'});
    }

    // Calculate new values for the specific record
    const newPresentAmount = Number(existingSaving.present_amount) + amountNumber;
    const newInterest = (interestRateNumber * newPresentAmount) / 100;
    const newTotalAmount = newPresentAmount + newInterest;

    // Prepare the updated data
    const updatedSavingBody = {
      user_id: existingSaving.user_id,
      amount: String(amountNumber),
      interest_rate: String(interestRate),
      present_amount: String(newPresentAmount),
      interest: String(newInterest),
      total_amount: String(newTotalAmount),
      date: existingSaving.date
    }

    // If date is provided, update it
    if (date) {
      const newDate = new Date(date);
      if (isNaN(newDate.getTime())) {
        return res.status(400).json({status: 'error', message: 'Invalid date format'});
      }
      updatedSavingBody.date = newDate;
    }

    // Update the specific saving record
    const updatedSaving = await savingClient.update({
      where: {
        id: Number(savingId)
      },
      data: updatedSavingBody
    })

    // Fetch all savings records for the user ordered by date
    const savings = await savingClient.findMany({
      where: {
        user_id: existingSaving.user_id
      },
      orderBy: {
        id: 'asc'
      }
    })

    // Update subsequent records
    let prevTotalAmount = newTotalAmount
    for (let i = 0; i < savings.length; i++) {
      const saving = savings[ i ]
      if (saving.id > Number(savingId)) {
        const newPresentNumber = prevTotalAmount + Number(saving.amount)
        const newInterest = (Number(saving.interest_rate) * newPresentNumber) / 100
        const newTotalAmount = newPresentNumber + newInterest

        await savingClient.update({
          where: {
            id: saving.id
          },
          data: {
            present_amount: String(newPresentNumber),
            interest: String(newInterest),
            total_amount: String(newTotalAmount)
          }
        })

        prevTotalAmount = newTotalAmount
      }
    }

    res.status(200).json({status: 'success', data: updatedSaving})
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