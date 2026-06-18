import mongoose from "mongoose";

const feedbackVoteSchema = new mongoose.Schema(
  {
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    value: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

feedbackVoteSchema.index(
  { feedback: 1, user: 1 },
  { unique: true }
);

const FeedbackVotes = mongoose.model(
  "FeedbackVote",
  feedbackVoteSchema
);

export default FeedbackVotes;