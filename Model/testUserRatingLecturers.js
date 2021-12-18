const Rating = require('./rating')
const Lecturer = require('./lecturer')
const User = require('./user')
const {getMethods} = require('../utils')

Lecturer.belongsToMany(User, { through: Rating, as: "evaluators" });
User.belongsToMany(Lecturer, { through: Rating, as: "evaluees" });

async function run() {
	// console.log('running...')
	const seq = require('../connection');
	Rating.drop()
	User.drop()
	Lecturer.drop()
	await seq.sync({force: true});
	const lecturer1 = Lecturer.build({name: 'lecturer1', departmen: 'informatika', faculty: 'electics', email: 'tough@mail.com'})
	await lecturer1.save()
	const oporayam  = User.build({username: 'oporayam', pass: 'secret', email: 'oporayam@mail.com'})
	await oporayam.save()
	// await oporayam.addComments(lecturer1, {through: {text: "This class is so hard! don't sign up for this class i'm warning u!!"}})
	// const comments = await oporayam.getComment()
	console.log(getMethods(oporayam))
}

run();
