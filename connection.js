const { Sequelize } = require('sequelize');
const database = 'sandbox'
const username = 'express'
const password = 'express'

const seq = new Sequelize(database, username, password, {
  dialect: 'mysql',
  port: 3306,
  replication: {
    read: [
      // { host: '10.0.0.48'  },
      { host: '10.0.0.241' },
    ],
    write: { host: '10.0.0.48'}
  },
  pool: { // If you want to override the options used for the read/write pool you can do so here
    // max: 20,
    // idle: 30000
  },
})

// const seq = new Sequelize(database, username, password, {
//   host: '10.0.0.48',
//   dialect: 'mysql'
// });

module.exports = seq;

