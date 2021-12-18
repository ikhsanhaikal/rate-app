const express 		= require('express')
const router  		= express.Router()
const { Op }  		= require('sequelize')
const Lecturer 		= require('../Model/lecturer')

router.post('/review/:userId/lecturers/:id', async function(req, res, next) {

})

router.put('/review/:userId/lecturers/:id', async function(req, res, next) {

})

router.delete('/review/:userId/lecturers/:id', async function(req, res, next) {

})

module.exports = router;

