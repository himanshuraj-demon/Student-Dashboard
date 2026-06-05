import express from "express"
const router = express.Router()
import { handleSignUp, handleLogIn, clearUser } from "../controllers/user.js"
import { checkAuth } from "../middleware/auth.js"

router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);
router.get("/me", checkAuth, (req, res) => {
    return res.json(req.user);
})
router.post("/logout", clearUser);


export default router;
