const express = require('express')
const app     = express()

const seq     = require('./connection')
const { getMethods } = require('./utils')
const Rating    = require('./Model/rating')
const Lecturer  = require('./Model/lecturer')
const Tag       = require('./Model/tag')
const User      = require('./Model/user')
Lecturer.belongsToMany(User, { through: Rating, as: "evaluators" });
User.belongsToMany(Lecturer, { through: Rating, as: "evaluees" });

Tag.belongsToMany(Lecturer, {through: 'tagging'});
Lecturer.belongsToMany(Tag, { through: 'tagging'});


(async function () {
  await seq.sync({force: true});
  const oporayam  = User.build({username: 'oporayam', pass: 'secret', email: 'oporayam@mail.com'})
  const gadogado  = User.build({username: 'gadogado', pass: 'secret', email: 'gadogado@mail.com'})
  const ayambetutu  = User.build({username: 'ayambetutu', pass: 'secret', email: 'ayambetutu@mail.com'})
	await oporayam.save()
  await gadogado.save()
  await ayambetutu.save()
  const royanna  = Lecturer.build({name: 'royanna', department: 'informatika', faculty: 'electics', email: 'royanna@mail.com'})
  const munif  = Lecturer.build({name: 'abdul munif', department: 'informatika', faculty: 'electics', email: 'abdulmunif@mail.com'})
  const fajar  = Lecturer.build({name: 'fajar baskoro', department: 'informatika', faculty: 'electics', email: 'fajarbaskoro@mail.com'})
  const onggo  = Lecturer.build({name: 'raditya onggoro', department: 'informatika', faculty: 'electics', email: 'radityaonggoro@mail.com'})
  await royanna.save()
  await munif.save()
  await fajar.save()
  await onggo.save()

  const tag1 = Tag.build({title: 'auto lulus'})
  await tag1.save()
  const tag2 = Tag.build({title: 'auto ngulang'})
  await tag2.save()
  const tag3 = Tag.build({title: 'tugas truzz'})
  await tag3.save()
  const tag4 = Tag.build({title: 'killer'})
  await tag4.save()
  const tag5 = Tag.build({title: 'bolosan'})
  await tag5.save()
  const tag6 = Tag.build({title: 'santuy'})
  await tag6.save()
  const tag7 = Tag.build({title: 'disiplin'})
  await tag7.save()

  console.log(getMethods(fajar))

  await fajar.addTags([tag1, tag6])
  await onggo.addTags([tag1])

})()


const userRouter = require('./Router/user_router')
const lecturerRouter = require('./Router/lecturer_router')
const userRatingLecturer = require("./Router/user_rating_lecturer")

app.use('/users', userRouter)
app.use('/lecturers', lecturerRouter)
app.use('/rate', lecturerRouter)

app.get('/', function(req, res) {
  res.send(JSON.stringify({stat: 'ok'}))
})

app.listen(3000, () => {
  console.log("Running on port 3000")
})
/**
 * get all lecturers (pagination)
 * get all lecturers based on tags, most reviewed, subject, ratings (redis)
 * get a lecturer based on search by name
 * 
 */