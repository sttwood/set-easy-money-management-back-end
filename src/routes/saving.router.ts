import {Router} from "express";

import {
  getSavings,
  getSavingById,
  createSaving,
  updateSaving,
  deleteSaving
} from '../controllers/saving.controller'

const savingRouter = Router();

savingRouter.get('/savings/:id', getSavings)
savingRouter.get('/saving/:id', getSavingById)
savingRouter.post('/saving', createSaving)
savingRouter.patch('/saving/:id', updateSaving)
savingRouter.delete('/saving/:id', deleteSaving)

export default savingRouter