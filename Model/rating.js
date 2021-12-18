const { DataTypes } = require('sequelize');
const seq = require('../connection')

const Rating = seq.define('ratings', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = Rating