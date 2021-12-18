const express 		= require('express')
const router  		= express.Router()
const { Op }  		= require('sequelize')
const Lecturer 		= require('../Model/lecturer')

router.post('/:userId/lecturers/:id', function(req, res, next) {
	
})

router.put('/:userId/lecturers/:id', function(req, res, next) {

})

router.delete('/:userId/lecturers/:id', async function(req, res, next) {

})

module.exports = router;

