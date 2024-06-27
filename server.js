const userRoutes = require('./src/routes/userRoutes')
const cors = require('cors')
const express = require('express')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)

app.listen(5000, "0.0.0.0", () => {
    console.log('Server running on port 5000')
})