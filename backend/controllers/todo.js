import Todos from "../models/todo.js"; 

async function handleTodoGet(req, res){
  try {
    const todos = await Todos.find({ userId: req.user._id }).sort({ pinned: -1, createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
}

async function handleTodoPost(req, res) {
  const { title, description, time, tag, pinned, completed } = req.body;

  try {
    const newTodo = new Todos({
      title,
      description,
      time: time || null,
      tag,
      pinned,
      completed,
      userId: req.user._id,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error: error.message });
  }
}

async function handleTodPut(req, res) {
  try {
    const todo = await Todos.findOne({ _id: req.params.id, userId: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.description = req.body.description !== undefined ? req.body.description : todo.description;
    todo.time = req.body.time !== undefined ? (req.body.time || null) : todo.time;
    todo.tag = req.body.tag !== undefined ? req.body.tag : todo.tag;
    todo.pinned = req.body.pinned !== undefined ? req.body.pinned : todo.pinned;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error: error.message });
  }
}

async function handleTodoDelete (req, res) {
  try {
    const result = await Todos.deleteOne({ _id: req.params.id, userId: req.user._id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
}



export {handleTodoGet,handleTodoPost,handleTodPut,handleTodoDelete}