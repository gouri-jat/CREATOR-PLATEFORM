const User = require("../models/user");
exports.becomeCreator = async(req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        if(user.isCreator){
            return res.status(400).json({message:"Already a creator"});
        }
        user.isCreator = true;
        user.creatorProfile = {
            bio:req.body.bio ||" ",
            category : req.body.category || " ",
            ProfileImage : req.body.profileImage || " ",
                };
                await user.save();
                res.status(200).json({
                    message : "You are now a creator",
                    creatorProfile : user.creatorProfile,
                });

    }catch(error){
        return res.status(500).json({error:error.message});
    }
};