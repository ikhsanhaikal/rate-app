const { DataTypes } = require('sequelize');
const seq = require('../connection')

const Reviews = seq.define('reviews', {
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

module.exports = Reviews




// module.exports = Review
