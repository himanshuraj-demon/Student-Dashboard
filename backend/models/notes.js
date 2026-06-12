import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength:200,
    },

    description: {
      type: String,
      default: "",
      maxlength: 100000,
    },

    theme: {
      bg: {
        type: String,
        default: "#FEF3C7",
      },
      text: {
        type: String,
        default: "#92400E",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Notes=mongoose.model("Note", NoteSchema);

export default Notes;