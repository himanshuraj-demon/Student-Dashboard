import mongoose from "mongoose";

const userCoursesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    courses: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const Cources=mongoose.model("userCourses", userCoursesSchema);
export default Cources;