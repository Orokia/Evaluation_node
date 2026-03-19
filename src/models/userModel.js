const { DataTypes } = require("sequelize");
const { sequelize } = require("../db"); 

const User = sequelize.define(
    "User", 
{
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: "public"
  }
}, {
  timestamps: true
});

module.exports = Message;