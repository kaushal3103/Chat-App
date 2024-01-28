const mongoose = require('mongoose');

//chat schema is made using user1d and user2 the conversation between two users and the messages will be array of object inside
//the information of sender, reciver,time and text will be made

const ChatSchema = new mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true],
    }
    , 
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true],
    
    }
    , 
   messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],

},{timestamp:true})

module.exports = mongoose.model('Chat',ChatSchema);