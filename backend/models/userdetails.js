import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    cpi: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    totalCredits: {
      type: Number,
      default: 0,
    },

    creditsCompleted: {
      type: Number,
      default: 0,
    },

    currentSemester: {
      type: Number,
      min: 1,
      max: 12,
      default: 1,
    },

    bio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    codeforcesHandle: {
      type: String,
      default: "",
    },

    codechefHandle: {
      type: String,
      default: "",
    },

    streak: {
      type: Number,
      default: 0,
    },

    totalStudyHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Details = mongoose.model("details", detailsSchema);

export default Details;