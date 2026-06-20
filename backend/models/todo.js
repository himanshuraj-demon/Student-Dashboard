import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    time: {
      type: Date,
    },
    tag: {
      type: String,
      enum: ["coding", "game", "study", "music", "fitness", "personal"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
TodoSchema.index({ time: 1 }, { expireAfterSeconds: 0 });

const Todos=mongoose.model("Todo", TodoSchema);
export default Todos;