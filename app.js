const express = require('express')
const app     = express()
const redis   = require('./redis') 
const run = require('./dbSetup')
const userRouter = require('./Router/user_router')
const lecturerRouter = require('./Router/lecturer_router')
const userRatingLecturer = require("./Router/user_rating_lecturer")

run()

app.use('/users', userRouter)
app.use('/lecturers', lecturerRouter)
app.use('/rate', lecturerRouter)

app.get('/', function(req, res) {
  redis.set("apple", "pineaplle")
  res.send(JSON.stringify({stat: 'ok'}))
})

app.listen(3000, () => {
  console.log("Running on port 3000")
})
