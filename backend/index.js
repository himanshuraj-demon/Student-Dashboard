import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";


import connectDB from "./connection.js";
const PORT=3020;

import userRoute from "./routes/user.js"

const app = express();

app.use(morgan("dev"));
app.use(helmet());  
app.use(
  cors({
    origin: "http://localhost:5173", // Vite
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve('public'))); 

connectDB(process.env.MONGO_URL);

app.use("/user",userRoute);
app.get("/",(req,res)=>{
    return res.json({working:"good"});
})





app.listen(process.env.PORT || PORT,()=>console.log("server started"));