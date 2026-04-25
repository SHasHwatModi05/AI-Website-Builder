import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const isAuth=async (req,res,next)=>{
try {
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"token not found"})
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await User.findById(decoded.id)
    if(!user){
        return res.status(401).json({message:"user not found"})
    }
    req.user=user
    next()
} catch (error) {
    // jwt.verify throws on invalid/expired tokens — return 401, not 500
    return res.status(401).json({message:"invalid or expired token"})
}
}

export default isAuth
