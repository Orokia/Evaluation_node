const express = require('express');
const { relation } = require('../controllers/messageUserController');

const messageUserRouter = express.Router();

messageUserRouter.post('/users/:id/messages', relation);

module.exports = messageUserRouter;