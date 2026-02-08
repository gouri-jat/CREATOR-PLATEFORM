const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//register
exports.registerUser = async(req,res)=>{
    try{
      const {name,email,password,role,isCreator,creatorProfile,followers} = req.body;
      const existingUser = await User.findOne({email});
     if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role,
            isCreator,
            creatorProfile,
            followers
        });
        res.status(201).json({
            message : "User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    }catch(error){
            res.status(500).json({error:error.message});
    }
};

//Login
exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        );
        res.status(200).json({
            message:"Login successfully",
            token
        });
    
    }catch(error){
res.status(500).json({error:error.message});
    }
};

    