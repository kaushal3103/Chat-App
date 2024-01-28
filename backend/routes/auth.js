const express = require('express');
const router = express.Router();

const {login,register,getallfriends,getuser} = require('../controllers/auth');

router.post('/register',register);
router.post('/login',login);
router.post('/getfriends',getallfriends);//friends list
router.post('/currentuser',getuser);//logged in user

module.exports = router;