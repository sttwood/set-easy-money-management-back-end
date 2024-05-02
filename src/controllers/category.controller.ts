import {PrismaClient} from "@prisma/client";

const categoryClient = new PrismaClient().category;

//@Title    Get All
//@Method   GET
//@Path     /category
export const getCategories = async (req, res) => {
  try {
    const userId = req.params.id
    const categories = await categoryClient.findMany({
      where: {
        user_id: userId
      }
    })

    res.status(200).json({status: 'success', data: categories})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Create Category
//@Method   POST
//@Path     /category
export const createCategory = async (req, res) => {
  try {
    const categoryBody = req.body
    const category = await categoryClient.create({data: categoryBody})

    res.status(200).json({status: 'success', data: category})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Update Category
//@Method   PATCH
//@Path     /category/:id
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const categoryBody = req.body
    const category = await categoryClient.update({
      where: {
        id: Number(categoryId)
      },
      data: categoryBody
    })

    res.status(200).json({status: 'success', data: category})
  } catch (error) {
    console.error(error)
  }
}

//@Title    Delete Category
//@Method   DELETE
//@Path     /category/:id
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const category = await categoryClient.delete({
      where: {
        id: Number(categoryId)
      }
    })

    res.status(200).json({status: 'success', data: category})
  } catch (error) {
    console.error(error)
  }
}