const Reviews = require('./review')
const Lecturer = require('./lecturer')
const User = require('./user')

Lecturer.belongsToMany(User, { through: Reviews, as: "reviewers" });
User.belongsToMany(Lecturer, { through: Reviews, as: "professors" });

const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

async function run() {
	// console.log('running...')
	const seq = require('../connection');
	Reviews.drop()
	User.drop()
	Lecturer.drop()
	// await Lecturer.sync({force: true})
	// await User.sync({force: true})
	await seq.sync({force: true});
	const lecturer1 = Lecturer.build({name: 'lecturer1', departmen: 'informatika', faculty: 'electics', email: 'tough@mail.com'})
	await lecturer1.save()
	const oporayam  = User.build({username: 'oporayam', pass: 'secret', email: 'oporayam@mail.com'})
	await oporayam.save()
	await oporayam.addComments(lecturer1, {through: {text: "This class is so hard! don't sign up for this class i'm warning u!!"}})
	const comments = await oporayam.getComment()
	console.log(getMethods(oporayam))
	console.log(comments)
}

run();


// User.findOne({
// 	where: {username: 'oporayam'},
// 	include: lecturer1
// })
// .then(resp => {
// 	console.log(resp)
// })
// .catch(err => console.log(err))

