import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from 'jsonwebtoken'

export const vrifyToken = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies.accesstoken;
        if(!token){
            throw new ApiError(400  ,"unuthorized")
        }
        
        const decodedToken = await jwt.verify(token , process.env.ACCESS_TOKEN_SECERE)
        const user = await User.findById(decodedToken?._id)
        req.user = user
        next();
      
    } catch (error) {
        console.log(error)
    }
})