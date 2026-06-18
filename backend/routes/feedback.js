import express from "express";
const router = express.Router();
import { checkAuth,protect } from "../middleware/auth.js";
import adviserOnly from "../middleware/advisor.js";
import { getFeedbacks, createFeedback, voteFeedback, updateFeedback, deleteFeedback } from "../controllers/feedback.js"

router.get("/", getFeedbacks);
router.post(
    "/",
    protect,
    adviserOnly,
    createFeedback
);

router.post(
    "/:id/vote",
    checkAuth,
    voteFeedback
);
router.put("/:id", protect, updateFeedback);
router.delete("/:id", protect, deleteFeedback);

export default router;