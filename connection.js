const { Sequelize } = require('sequelize');
const database = 'sandbox'
const username = 'express'
const password = 'express'

const seq = new Sequelize(database, username, password, {
  host: '10.0.0.48',
  dialect: 'mysql'
});

module.exports = seq;

// sequelize.authenticate().then((value) => {
// 	console.log('Connection has been established successfully.');
// } ).catch((msg) => {
// 	console.error('Unable to connect to the database:', msg);
// })
