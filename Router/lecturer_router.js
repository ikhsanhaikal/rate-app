const { query } = require('express')
const express 		= require('express')
const router  		= express.Router()
const { Op, QueryTypes }  = require('sequelize')
const seq = require('../connection')
const Lecturer 		= require('../Model/lecturer')

router.get('/', async function(req, res, next) {
	console.log('query: ', req.query)
	if ('tags' in req.query) {
		const result = await seq.query(
			'select lecturers.id, name from tagging inner join lecturers on lecturerId=id inner join tags on tags.id=tagId where title IN(:queryTag);',
			{
				replacements: { queryTag: req.query.tags.split(',')},
				type: QueryTypes.SELECT
			}
		)
		console.log(result)
		res.json(result)
	} else {
		res.send('not ok')
	}
	// try {
	// 	const lecturers = await Lecturer.findAll({attributes: {exclude: ['faculty', 'email']}})
	// 	res.json(lecturers)
	// 	res.send('ok')
	// } catch (error) {
	// 	res.send('not ok');
	// }
})

router.get('/:id', async function(req, res, next) {
	const user = await Lecturer.findByPk(req.params.id)
	res.send(user.toJSON())
})

router.post('/', function(req, res, next) {
	res.send('ok')
})

router.put('/:id', function(req, res, next) {

})

router.delete('/:id', async function(req, res, next) {
	try {
		const user = await User.destroy({where: {id: {
			[Op.eq]: req.params.id
		}}})
		res.send('ok')
	} catch (error) {
		res.send('not ok')
	}
})

module.exports = router;

