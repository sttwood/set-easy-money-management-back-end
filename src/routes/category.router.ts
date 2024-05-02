import {Router} from "express";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller'

const categoryRouter = Router();

categoryRouter.get('/categories/:id', getCategories)
categoryRouter.get('/category/:id', getCategoryById)
categoryRouter.post('/category/', createCategory)
categoryRouter.patch('/category/:id', updateCategory)
categoryRouter.delete('/category/:id', deleteCategory)

export default categoryRouter