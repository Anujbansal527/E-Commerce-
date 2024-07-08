import express from "express"
import  Color  from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./Config/DB.js";
import authRoutes from "./Routes/authRoute.js"
import categoryRoutes from "./Routes/categoryRoute.js"
import productRoutes from "./Routes/productsRoute.js"

//configure env
dotenv.config();

//connecting db
connectDB();

//creating rest object
const app = express();

//Port
const PORT = process.env.PORT;

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)


app.get("/",(req,res)=>{
    res.send({msg:"Hello World"})
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.bgCyan.bgBlue)
})