const { DataTypes } = require("sequelize");
const { sequelize } = require("../db"); 
const User = require('./userModel');

const Message = sequelize.define("Message", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
  type: DataTypes.ENUM('public', 'prive'),
  defaultValue: 'public'
}
}, {
  timestamps: true
});

Message.belongsTo(User);
User.hasMany(Message);
module.exports = Message;