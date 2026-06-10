import express from "express";
import { checkAuth } from "../middleware/auth.js";
const router=express.Router();
import {createNote,getNotes,getNote,updateNote,deleteNote} from "../controllers/notes.js"

router.post("/", checkAuth, createNote);
router.get("/", checkAuth, getNotes);
router.get("/:id", checkAuth, getNote);
router.put("/:id", checkAuth, updateNote);
router.delete("/:id", checkAuth, deleteNote);

export default router;