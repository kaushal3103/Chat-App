const User = require('../models/User');

const register = async function(req,res){

    const user = await User.create({...req.body});

    res.status(200).json({user:{name:user.name}})
}

const login = async function(req,res){
    try{
    const {username,password} = req.body;

   if(!username || !password){
    
      return res.status(401).json({ error: 'Invalid username or password' });
   }

   const user = await User.findOne({username});
   
   if(!user){
    return res.status(401).json({ error: 'User Not Existed' });
   }

   const correcpass = await user.comparePassword(password);
   
   if(!correcpass){
    return res.status(401).json({ error: 'Invalid Password' });
   }
   
   res.status(200).json({ message: 'Login successful' ,userId:user._id});
}catch(error){
    console.log(error);
}
}

//getting the list of all the users accept the logged in user(currentuser)
const getallfriends = async function(req,res){
    try{
const {userId} = req.body;

 const users = await User.find({_id:{$ne:userId}});
 
 return res.status(200).json({users});

    }catch(error){
        console.log(error);
        return res.status(500).json({error});
    }
 
}

//getting the information of logged in user (currentuser)
const getuser = async function(req,res){
    try{
      const {userId} = req.body;
 const users = await User.findById(userId);
 return res.status(200).json({users});
    }
    catch(error){
  console.log(error);
        return res.status(500).json({error});
    }
}


module.exports = {register,login,getallfriends,getuser};