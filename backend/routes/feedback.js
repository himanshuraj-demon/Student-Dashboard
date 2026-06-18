import express from "express";
const router = express.Router();
import { checkAuth } from "../middleware/auth.js";
import adviserOnly from "../middleware/advisor.js";
import {getFeedbacks,createFeedback,voteFeedback,updateFeedback,deleteFeedback} from "../controllers/feedback.js"


router.get("/", getFeedbacks);
router.post(
    "/",
    checkAuth,
    adviserOnly,
    createFeedback
);

router.post(
    "/:id/vote",
    checkAuth,
    voteFeedback
);
router.put("/:id", checkAuth, updateFeedback);
router.delete("/:id", checkAuth, deleteFeedback);

export default router;