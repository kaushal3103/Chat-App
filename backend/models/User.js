const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Username'],
        minlength:3,
        maxlength:30
    },
    username:{
        type:String,
        required:[true,'Please Enter Username'],
        minlength:5,
        maxlength:30,
        unique:true,
    },
    password:{
        type: String,
        required:[true,'Please Provide Password'],
        minlength:5
    }
    ,
    chats: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
},
{timestamps:true});

//encrypting the password
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//comparing the password
UserSchema.methods.comparePassword = async function(candiatepassword){
    
    const correctpass = await bcrypt.compare(candiatepassword,this.password);
    return correctpass;
}

module.exports = mongoose.model('User',UserSchema);