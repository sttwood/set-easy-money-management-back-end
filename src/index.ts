import express from 'express'

import categoryRouter from './routes/category.router'
import incomeExpenseRouter from './routes/income-expense.router'
import savingRouter from './routes/saving.router'

const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api', categoryRouter)
app.use('/api', incomeExpenseRouter)
app.use('/api', savingRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))