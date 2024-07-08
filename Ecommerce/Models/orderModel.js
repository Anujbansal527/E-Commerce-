import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
        type:mongoose.ObjectId,
        ref:"Product",
    }],

    payment : {},
    
    buyers: {
        type:mongoose.ObjectId, 
        ref:"Users",
    },

    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipped","Delivered" , "Cancel"],
    }
},{timestamps:true})

export default mongoose.model("Order",orderSchema);