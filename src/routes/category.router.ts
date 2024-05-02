import {Router} from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller'

const categoryRouter = Router();

categoryRouter.get('/:id', getCategories)
categoryRouter.post('/', createCategory)
categoryRouter.patch('/:id', updateCategory)
categoryRouter.delete('/:id', deleteCategory)

export default categoryRouter