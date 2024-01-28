
const Chat = require('../models/Chat');
const User = require('../models/User');
const {io} = require('../socket');


const chat = async function(req,res){

//we have created chat schema using user1id and user2id and will be using as to filter from others
// two users having chat will have one common CHAT.

    try {
      //user2Id represent the id of user to whom we will chat
    const {user2Id} = req.params;

    //userId represent the id of logged in user (current user)
    const {userId} = req.body;
    const user1Id = userId;
    

    //we will check on basis of users id that if they already had a chat, we will check both side 
    const chat = await Chat.findOne({
    
    user1: { $in: [user1Id, user2Id] },
    user2: { $in: [user1Id, user2Id] },
   
    })

    if(chat){
        res.status(200).json({chat});
      
    }
    else {
      //if they are new to chat then we will create it
        const chat = await Chat.create({
            user1:user1Id,
            user2:user2Id,
            messages:[],
        });

      await User.findByIdAndUpdate(user1Id, { $push: { chats: chat._id } });
      await User.findByIdAndUpdate(user2Id, { $push: { chats: chat._id } });
      
      res.status(201).json({chat});
    }

}
catch(error){
    res.status(500).json({ error: 'Server error' });
}
}

//we are sending the message by having user2Id (to who mesage is going to be send), chatId that is conversation of both the two (in params)
const sendMessage = async function(req,res){

  //messages are being send to this chat having (chatid) and will be pushing messages to to its messasge schema of chat
    try{
     const {chatId,user2Id} = req.params;
     const {text,userId} = req.body;

     const user1Id = userId;
     
     const newMessage = await Chat.findByIdAndUpdate(
        chatId,
        {
        $push:{
          messages: {
            sender: user1Id,
            receiver: user2Id,
            text,
          },
        },
      },
        {new:true} // updating document
     )
    
     if(!newMessage){
        return res.status(404).json({error:'Chat not Found'});
     }

    res.status(201).json({ newMessage,chatId });
    }
    catch(error){
      console.log(error);
   res.status(500).json({error:'Server Error'})
    }
}


module.exports = {chat,sendMessage};