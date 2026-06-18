import express from "express"
const router = express.Router()
import { handleSignUp, handleLogIn, clearUser, handelMe, updateProfile, handleCources, handleUpdateCources, handleGoogleAuth, handleSaveSemester, handleGetSemester, getUsers,updateUserRole } from "../controllers/user.js"
import { checkAuth } from "../middleware/auth.js"
import User from "../models/user.js";
import Details from "../models/userdetails.js";
import Cources from "../models/userCources.js";
import adminOnly from "../middleware/adminOnly.js";


router.get("/admin", checkAuth, adminOnly, getUsers);
router.patch("/admin/:id/role",checkAuth,adminOnly,updateUserRole);
router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);
router.get("/me", checkAuth, handelMe);
router.post("/semester-details", checkAuth, handleSaveSemester);
router.get("/semester-details/:semester", checkAuth, handleGetSemester);
router.post("/update-profile", checkAuth, updateProfile);
router.post("/logout", clearUser);
router.get("/your-courses", checkAuth, handleCources);
router.post("/your-courses", checkAuth, handleUpdateCources);
router.get("/auth/google", handleGoogleAuth);


export default router;
