import {Router} from "express";

import {
  getSavings,
  getSavingById,
  createSaving,
  updateSaving,
  deleteSaving
} from '../controllers/saving.controller'

const incomeRouter = Router();

incomeRouter.get('/savings/:id', getSavings)
incomeRouter.get('/saving/:id', getSavingById)
incomeRouter.post('/saving', createSaving)
incomeRouter.patch('/saving/:id', updateSaving)
incomeRouter.delete('/saving/:id', deleteSaving)

export default incomeRouter