import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

//checking is user is logged in or not
export const requireSignIn = async(req,res,next) =>{
try {
    const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECERETE)
    
    //parsing decode in our user to identify user that is decryption
    req.user=decode;

    //send to next work
    next();
} catch (error) {
    return res.status(500).send({
        sucess:false,
        message:"User must have Logged-in to access this page"})
    console.log(error)
}
}

//checking is user is admin or not
export const isAdmin = async(req,res,next)=>{
    try {
        
        const user = await User.findById(req.user._id)

        if(user.role !== 1 ){
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
              });
        }
        else
        {
            next();
        }

    } catch (error) {
        return res.status(500).send({
            sucess:false,
            message:"User does not have any admin  authority to access this page",
            error
        })
        console.log(error)
    }
}