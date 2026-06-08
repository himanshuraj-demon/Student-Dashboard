import express from "express";

const router = express.Router();
import { handleAi } from "../controllers/ai-chat.js";
import { checkAuth } from "../middleware/auth.js"

router.post("/ai-chat",handleAi);

export default router;