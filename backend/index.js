import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit"

import connectDB from "./connection.js";
const PORT = 3020;

import userRoute from "./routes/user.js"

const app = express();

app.use(morgan("dev"));
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' },
});
app.use(globalLimiter)
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('public')));

connectDB(process.env.MONGO_URL);

app.use("/user",authLimiter, userRoute);
app.get("/", (req, res) => {
  return res.json({ working: "good" });
})





app.listen(process.env.PORT || PORT, () => console.log("server started"));