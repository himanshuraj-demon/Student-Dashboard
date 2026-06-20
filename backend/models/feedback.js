import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    type: {
      type: String,
      enum: ["semester", "course", "general"],
      required: true,
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,
    },

    courseCode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 20,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    tags: {
      type: [String],
      default: [],
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Feedbacks = mongoose.model("Feedback", feedbackSchema);

export default Feedbacks;