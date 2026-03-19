const { DataTypes } = require('sequelize');
const { sequelize}= require("../db");

const Message = sequelize.define(
    'message',
     {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  type: {
    type: DataTypes.STRING,
    defaultValue: 'public'
  }
});

module.exports = Message;