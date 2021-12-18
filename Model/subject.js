const { DataTypes } = require('sequelize');
const seq = require('../connection')

const Subject = seq.define('subject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
	obligatory: {
		type: DataTypes.STRING,
		default: false
	}
}, {
  // Other model options go here
});

module.exports = Lecturer
