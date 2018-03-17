const express = require('express')
const app = express()
const PORT = 4000

const noteRoutes = require('./notes/routes')
const userRoutes = require('./users/routes')

app.use('/notes', noteRoutes)
app.use('/users', userRoutes)

app.listen(PORT, ()=>{
  console.log(`The app is running on http://localhost:${PORT}`)
})