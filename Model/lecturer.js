const { DataTypes } = require('sequelize');
const seq = require('../connection')

const Lecturer = seq.define('lecturer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
	departmen: {
		type: DataTypes.STRING,
		allowNull: false
	},
	faculty: {
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

module.exports = Lecturer
