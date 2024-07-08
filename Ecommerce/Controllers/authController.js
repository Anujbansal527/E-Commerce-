import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import Order from "../Models/orderModel.js"
import { comparePassword, hashPassword } from "../Utils/authHelper.js";

export const registerController = async (req, res) => {
  try {
    //fetching data
    const { name, email, password, phone, address, ans } = req.body;

    
    //validation
    if (!name) {
      return res.status(400).json({ message: "Please enter your name" });
    }

    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }

    if (!password) {
      return res.status(400).json({ message: "Please enter your password" });
    }

    if (!phone) {
      return res.status(400).json({ message: "Please enter your phone" });
    }

    if (!address) {
      return res.status(400).json({ message: "Please enter your address" });
    }

    if (!ans) {
      return res.status(400).json({ message: "Please enter your Answer For Your Question" });
    }

    
    //check user
    const exist = await User.findOne({ email: email });

    //checking is exist or not
    if (exist) {
      return res.status(200).send({
        sucess: false,
        message: "Already Register please Login",
      });
    }

    //register user

    //hasing  the password
    const hashedPass = await hashPassword(password);

    //saving database
    const user = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPass,
      ans,
    }).save();
  
    //sending response
    res.status(200).send({
      sucess: true,
      message: "User Register Sucessfull",
      user,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Registering",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    //fetcing data
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Please enter your email and password" });
    }

    //check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "Email is not registered",
      });
    }

    //comparing password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(200).send({
        sucess: false,
        message: "Invalid Password",
      });
    }

    //creating token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECERETE, {
      expiresIn: "7d",
    });

    //sending response
    res.status(200).send({
      message: "Logged In sucessfully",
      sucess: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Registering",
      error,
    });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email, ans, newPassword } = req.body;

    console.log(req.body)

    if (!email) {
      return res.status(404).json({ message: "Email is Required" });
    }

    if (!ans) {
      return res.status(404).json({ message: "Answer is Required" });
    }

    if (!newPassword) {
      return res.status(404).json({ message: "New Password is Required" });
    }

    const user = await User.findOne({ email, ans });

    if (!user) {
      return (
          res.status(404).json({ 
          sucess: false, 
          message: "User Not Found or Answer is Wrong!" 
        })
        )
    }

    const hashedPass = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id,{password:hashedPass})

    res.status(200).send({
      sucess:true,
      message:"Password Reset Sucessfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Forgot Password",
      error,
    });
  }
};

//update profile
export const updateProfile = async(req,res) => {
  try {
    const {name,email,password,address,phone} = req.body

    const user = await User.findById(req.user._id);

   const id = user._id;
    //check password
    if (password && password.length < 6)
    {
      return res.status(400).send({error:"Password is required and 6 CHaracter long"})
    }

    const hashedPassword =  password ? await hashPassword(password) : undefined

    const updateUser = await User.findByIdAndUpdate(id,{
      name:name|| user.name,
      password : hashedPassword || user.password ,
      address : address || user.address,
      phone : phone || user.phone,
    },{new:true})

    res.status(200).send({
      success:true,
      message:"Profile Update Successfully",
      updateUser
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error While Update Profile",
      error,
    });    
  }
}

//orders
export const getOrderDetails = async (req,res) =>{
  try {
    const orders = await Order.find({buyers:req.user._id})
    .populate("products","-photo")
    .populate("buyers","name")

    res.status(200).json(orders)

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error While Fetching Orders",
      error,
    });
  }
}

//all - orders admin side
export const getAllOrderDetails = async (req,res) =>{
  try {
    const orders = await Order.find({})
    .populate("products","-photo")
    .populate("buyers","name")
    .sort({createdAt: -1})

    res.status(200).json(orders)

  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error While Fetching Orders",
      error,
    });
  }
}


//order status update
export const orderStatus = async (req,res) =>{
  try {
    const { id } = req.params;
    const { status } = req.body;

    const  order = await Order.findByIdAndUpdate(id ,{status}, {new : true});

    res.status(200).json(order)
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error While Fetching Orders",
      error,
    });
  }
}


//test controller
export const testController = async (req,res) => {
  res.status(200).send({
    message: "User Controller Works",
  });
};


