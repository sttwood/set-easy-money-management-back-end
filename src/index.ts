import express from 'express'

import categoryRouter from './routes/category.router'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use('/category', categoryRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))