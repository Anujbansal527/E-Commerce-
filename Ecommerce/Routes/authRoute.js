import express from "express"

//importing controllers
import {registerController,loginController, testController, ForgotPassword, updateProfile, getOrderDetails, getAllOrderDetails} from "../Controllers/authController.js"
import { isAdmin, requireSignIn } from "../Middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//object // route(//path) // httpmethod (//controller)
router.route("/register").post(registerController);

router.route("/login").post(loginController);

//forgot password 
router.route("/forgot-password").post(ForgotPassword)

//protected route user
router.route("/user-auth").get(requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected route admin
router.route("/admin-auth").get(requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//Update Profile
router.route("/profile").put(requireSignIn,updateProfile)

//orders
router.route("/orders").get(requireSignIn,getOrderDetails)

//all orders orders
router.route("/all-orders").get(requireSignIn,isAdmin,getAllOrderDetails)

//orders status update
router.route("/order-status/:id").put(requireSignIn,isAdmin,)

//test controller
router.route("/test").get(requireSignIn,isAdmin,testController);

export default router;