const userRoutes = require('./src/routes/userRoutes')
const funerariaRoutes = require('./src/routes/funerariaRoutes')
const obitoRoutes = require('./src/routes/obitoRouter')
const adminRoutes = require('./src/routes/adminRoutes')
const cors = require('cors')
const express = require('express')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/funerarias', funerariaRoutes)
app.use('/obitos', obitoRoutes)
app.use('/admin', adminRoutes)

app.listen(5000, "0.0.0.0", () => {
    console.log('Server running on port 5000')
})