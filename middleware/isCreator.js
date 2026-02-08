//RBAC (authorization)
//only authorize user can crete (only creators allow to perform action here)
const User = require("../models/user");
const isCreator = async(req,res,next)=>{
       try{
        const user = await findById(req.user.id);
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        if(!user.isCreator){
            return res.status(403).json({message : "Access Denied ! creators only allowed"});
        }
        next();

       }catch(error){
        return res.status(500).json({error : error.message});
       }
};
module.exports = isCreator;