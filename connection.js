const { Sequelize } = require('sequelize');
const database = 'sandbox'
const username = 'express'
const password = 'express'
// Option 3: Passing parameters separately (other dialects)
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
