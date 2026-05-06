//protected routes (authentication)
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if(!user){
      return res.status(401).json({error : "User not found"});
    }
    req.user = user; // VERY IMPORTANT
    next();
  } catch (error) {
    if(error.name === "TokenExpiredError"){
      return res.status(401).json({ error : "Token expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
