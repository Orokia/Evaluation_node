const express = require('express');
const { createMessage, getMessageById, getMessage } = require('../controllers/messageController');
const messageRouter =express.Router();

messageRouter.post('/',createMessage)
messageRouter.get('/:id',getMessageById)
messageRouter.get('/',getMessage)

module.exports= messageRouter;