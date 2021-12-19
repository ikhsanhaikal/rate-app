const seq     = require('./connection')
const { getMethods } = require('./utils')
const Rating    = require('./Model/rating')
const Lecturer  = require('./Model/lecturer')
const Tag       = require('./Model/tag')
const User      = require('./Model/user')
const Review    = require('./Model/review')
const faker = require('faker/locale/id_ID')

Lecturer.belongsToMany(User, { through: Rating, as: "evaluators" });
User.belongsToMany(Lecturer, { through: Rating, as: "evaluees" });

Lecturer.belongsToMany(User, { through: Review, as: "reviewer" });
User.belongsToMany(Lecturer, { through: Review, as: "reviewee" });

Tag.belongsToMany(Lecturer, {through: 'tagging'});
Lecturer.belongsToMany(Tag, { through: 'tagging'});

const run = async function () {
	await seq.sync({force: true});
	const users = Array(10).fill().map(() => {
			return User.build({username: faker.internet.userName(), pass: faker.internet.password(), email: faker.internet.exampleEmail()})
		})
	
	for (const user of users) {
		try {
			await user.save()
		} catch (error) {
			console.log("ERR: user.save()")
		}
	}
	
	const lecturers = Array(50).fill().map(() => {
		return Lecturer.build({name: faker.name.firstName(), department: 'informatika', faculty: 'electics', email: faker.internet.email()})
	})

	for (const lecturer of lecturers) {
		try {
			await lecturer.save()
		} catch (error) {
			console.log("ERR: lecture.save()")
		}
	}
	
	const tagsTitle = ['auto lulus', 'bolosan', 'santuy', 'suka cerita2', 'disiplin', 'auto ngulang', 'tugas truzz', 'killer', 'baperan']
	let tags = []
	for (const tag of tagsTitle) {
		const tagInstance = Tag.build({title: tag})
		try {
			await tagInstance.save()
			tags.push(tagInstance)
		} catch (error) {
			console.log("ERR: tag.save()")
		}
	}

	console.log(getMethods(lecturers[0]))
	for (const _ of Array(30).fill()){
		const ith = Math.floor(Math.random() * users.length) 
		const jth = Math.floor(Math.random() * lecturers.length)
		const user = users[ith]
		const lecturer = lecturers[jth]
		try {				 
			await user.addReviewee(lecturer, {through: {text: faker.lorem.lines()}})
		} catch (error) {
			console.log(error)
		}
	}

	for (const _ of Array(30).fill()) {
		try {
			const randNumber = Math.floor(Math.random() * tags.length)
			const lecturer = lecturers[Math.floor(Math.random() * lecturers.length)]
			await lecturer.addTag(tags[randNumber])
		} catch (error) {
			console.log(error)
		}
	}

	for (const _ of Array(50).fill()) {
		try {
			const score = Math.floor(Math.random() * 4) + 1
			const ith = Math.floor(Math.random() * lecturers.length)
			const jth = Math.floor(Math.random() * users.length)  
			await lecturers[ith].addEvaluator(users[jth], {through: {score: score}})
		} catch (error) {
			console.log(error)
		}
	}
  // await dosenC.addTags([tag1, tag6])
  // await dosenD.addTags([tag1])
}

module.exports = run
