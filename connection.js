const { Sequelize } = require('sequelize');
const database = 'rate'
const username = 'express'
const password = 'express'
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, username, password, {
  host: '10.0.0.48',
  dialect: 'mysql'
});

sequelize.authenticate().then((value) => {
	console.log('Connection has been established successfully.');
} ).catch((msg) => {
	console.error('Unable to connect to the database:', msg);
})
