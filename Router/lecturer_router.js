const express 		= require('express')
const router  		= express.Router()
const { Op, QueryTypes }  = require('sequelize')
const seq = require('../connection')
const Lecturer 		= require('../Model/lecturer')
const bodyParser  = require('body-parser')
const redis				= require('../redis')

// query tag 
router.get('/', async function(req, res, next) {
	if ('tags' in req.query) {
		try {
			const result = await seq.query(
				'select lecturers.id, name from tagging inner join lecturers on lecturerId=id inner join tags on tags.id=tagId where title IN(:queryTag);',
				{
					replacements: { queryTag: req.query.tags.split(',')},
					type: QueryTypes.SELECT
				}
			)
			res.json(result)
		} catch (error) {
			res.send('not ok')
		}
	} else {
		next()
	}
})

router.get('/', async (req, res, next) => {
	const op1 = `desc`
	const op2 = `asc`
	if ('score' in req.query) {
		try {
			const resp = await redis.get(req.query.score)
			if (resp == null) {
				const result = await seq.query(
					`select avg(score) as scores, name from (ratings inner join lecturers on ratings.lecturerId=lecturers.id) 
					group by lecturerId 
					order by scores ${req.query.score == 'highest' ? op1 : op2} limit 5;`,
					{
						type: QueryTypes.SELECT
					}
				)
				redis.set(req.query.score, JSON.stringify(result))
				res.json(result)
			} else {
				res.send(resp)
			}
		} catch (error) {
			res.send('not ok')
		}	
	} else {
		next()
	}
})


router.get('/', async (req, res, next) => {
	try {
		const lecturers = await Lecturer.findAll({attributes: {exclude: ['faculty', 'email']}})
		res.json(lecturers)
	} catch (error) {
		res.send('not ok');
	}
})


router.get('/:id', async function(req, res, next) {
	try {
		const lecturer = await Lecturer.findByPk(req.params.id)
		res.send(lecturer.toJSON())
	} catch (error) {
		res.send('not ok')
	}
})

router.post('/', bodyParser.json(), async function(req, res, next) {
	try {
		console.log(req.body)
		const newLecturer = Lecturer.build(req.body)
		await newLecturer.save()
		console.log(newLecturer)
		res.status(200).json(newLecturer)
	} catch (error) {
		res.send('not ok')
	}
})

router.put('/:id', function(req, res, next) {

})

router.delete('/:id', async function(req, res, next) {
	try {
		const lecturer = await Lecturer.destroy({where: {id: {
			[Op.eq]: req.params.id
		}}})
		res.send({message: 'successfully deleted'})
	} catch (error) {
		res.send('not ok')
	}
})

module.exports = router;

