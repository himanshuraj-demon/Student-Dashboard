import express from "express"
const router = express.Router()
import { handleSignUp, handleLogIn, clearUser } from "../controllers/user.js"
import { checkAuth } from "../middleware/auth.js"
import User from "../models/user.js";

router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);
router.get("/me", checkAuth, (req, res) => {
    return res.json({
        user: req.user
    });
})
router.post("/logout", clearUser);
router.get("/",async (req,res)=>{
    const users=await User.find({});
    res.json({users:users});
})


export default router;
