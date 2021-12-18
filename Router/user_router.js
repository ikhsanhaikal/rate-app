const express = require('express')
const bodyParser = require('body-parser')
const router  = express.Router()
const { Op }  = require('sequelize')
const User 		= require('../Model/user')
const Lecturer = require('../Model/lecturer')

router.get('/', async function(req, res, next) {
	try {
		const users = await User.findAll({})
		res.json(users)
	} catch (error) {
		console.log('not ok')
	}
})

router.get('/:id', async function(req, res, next) {
	const user = await User.findByPk(req.params.id)
	res.send(user.toJSON())
})

router.post('/', bodyParser.json(), async function(req, res, next) {
	try {
		const resp = await User.create(req.body)
		await resp.save()
		console.log(resp.toJSON())
		res.send('ok')
	} catch (error) {
		res.send('not ok')
	}
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

