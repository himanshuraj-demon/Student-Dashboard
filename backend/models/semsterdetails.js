import mongoose from "mongoose"

const semesterCourseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const semesterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    courses: [semesterCourseSchema],
  },
  {
    timestamps: true,
  }
);

semesterSchema.index(
  {
    userId: 1,
    semester: 1,
  },
  {
    unique: true,
  }
);

const SemesterDetail=mongoose.model("SemesterDetail", semesterSchema);
export default SemesterDetail;
