const { DataTypes } = require('sequelize');
const seq = require('../connection')

const Review = seq.define('reviews', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
	upvote: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	downvote: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, {
  // Other model options go here
});

module.exports = Review




// module.exports = Review
