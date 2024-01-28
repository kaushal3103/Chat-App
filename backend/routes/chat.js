const express = require('express');
const router = express.Router();

const {chat,sendMessage} = require('../controllers/message');

router.post('/chats/:user2Id',chat);
router.post('/chats/:user2Id/:chatId',sendMessage);

module.exports = router;

// /chats/:user2Id  this endpoint is used to create or get (already existing chat) 
// /chats/:user2Id/:chatid this endpoint is used to send the mesagages to chat (chatid) and to user2Id