const { DataTypes } = require('sequelize');
const seq = require('../connection');

const User = seq.define('user', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
	pass: {
		type: DataTypes.STRING,
		allowNull: false
	},
  email: {
    type: DataTypes.STRING(100),
		allowNull: false,
		unique: true
  }
}, {
  // Other model options go here
});

module.exports = User

