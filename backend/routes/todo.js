import express from "express";
import Todos from "../models/todo.js";
import { checkAuth } from "../middleware/auth.js";
import { handleTodoGet, handleTodoPost, handleTodPut, handleTodoDelete } from "../controllers/todo.js"

const router = express.Router();

router.get("/", checkAuth, handleTodoGet);


router.post("/", checkAuth, handleTodoPost);

router.put("/:id", checkAuth, handleTodPut);

router.delete("/:id", checkAuth, handleTodoDelete);

export default router;