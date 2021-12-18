const { DataTypes } = require('sequelize');
const seq = require('../connection')

const Tag = seq.define('tag', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = Tag