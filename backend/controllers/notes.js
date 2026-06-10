import Notes from "../models/notes.js";

export const createNote = async (req, res) => {
  try {
    const note = await Notes.create({
      userId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      theme: req.body.theme,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({
      userId: req.user._id,
    }).sort({ updatedAt: -1 });

    return res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Notes.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Notes.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        theme: req.body.theme,
      },
      {
        returnDocument: "after"
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};