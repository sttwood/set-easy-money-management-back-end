import express from 'express'

import categoryRouter from './routes/category.router'
import incomeRouter from './routes/income.router'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use('/api', categoryRouter)
app.use('/api', incomeRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))