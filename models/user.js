const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name :{
         type : String,
         required : true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
    roles:{
        type:String, 
        enum:["user","admin"],
        default:"user"
    },
    isCreator :{
        type:Boolean,
        default:"false"
    },
     creatorProfile: {
      bio: String,
      profileImage: String,
      category: String,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  
},{timeStamps : true});


module.exports =  mongoose.model("User",userSchema);