import FeedbackVotes from "../models/feedbackVote.js";
import Feedbacks from "../models/feedback.js";
import User from "../models/user.js"

const createFeedback = async (req, res) => {
  const {
    type,
    semester,
    courseCode,
    title,
    content,
    tags,
  } = req.body;

  const feedback = await Feedbacks.create({
    user: req.user._id,
    type,
    semester,
    courseCode,
    title,
    content,
    tags,
  });

  const populated = await Feedbacks.findById(
    feedback._id
  )

  res.status(201).json(populated);
};

const getFeedbacks = async (req, res) => {
  const {
    type,
    semester,
    courseCode,
    sort,
  } = req.query;

  const query = {};

  if (type) query.type = type;

  if (semester)
    query.semester = Number(semester);

  if (courseCode)
    query.courseCode = courseCode.toUpperCase();

  const sortObj =
    sort === "helpful"
      ? { likes: -1 }
      : { createdAt: -1 };

  const feedbacks = await Feedbacks.find(query)
    .populate({
      path: "user",
      select: "name",
      populate: {
        path: "details",
        select: "branch",
      },
    })
    .sort(sortObj)
    .lean();

  res.json(feedbacks);
};

const updateFeedback = async (req, res) => {
  const feedbackId = req.params.id;

  const feedback = await Feedbacks.findById(feedbackId);

  if (!feedback) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  const isAuthor =
    feedback.user.toString() === req.user._id.toString();

  if (!isAuthor) {
    return res
      .status(403)
      .json({ message: "You can't edit this feedback" });
  }

  const {
    type,
    semester,
    courseCode,
    title,
    content,
    tags,
  } = req.body;

  feedback.type = type ?? feedback.type;
  feedback.semester = semester;
  feedback.courseCode = courseCode;
  feedback.title = title ?? feedback.title;
  feedback.content = content ?? feedback.content;
  feedback.tags = tags ?? feedback.tags;

  await feedback.save();

  const populated = await Feedbacks.findById(
    feedback._id
  )

  res.json(populated);
};

const deleteFeedback = async (req, res) => {
  const feedbackId = req.params.id;

  const feedback = await Feedbacks.findById(feedbackId);

  if (!feedback) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  const isAuthor =
    feedback.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "ADMIN";

  if (!isAuthor && !isAdmin) {
    return res
      .status(403)
      .json({ message: "You can't delete this feedback" });
  }

  await FeedbackVotes.deleteMany({ feedback: feedbackId });
  await feedback.deleteOne();

  res.json({ success: true });
};

const voteFeedback = async (req, res) => {
  const { value } = req.body;

  const feedbackId = req.params.id;

  let existing = await FeedbackVotes.findOne({
    feedback: feedbackId,
    user: req.user._id,
  });

  if (!existing && value) {
    await FeedbackVotes.create({
      feedback: feedbackId,
      user: req.user._id,
      value,
    });

    await Feedbacks.findByIdAndUpdate(
      feedbackId,
      {
        $inc:
          value === "like"
            ? { likes: 1 }
            : { dislikes: 1 },
      }
    );

    return res.json({ success: true });
  }

  if (existing && value === null) {
    await Feedbacks.findByIdAndUpdate(
      feedbackId,
      {
        $inc:
          existing.value === "like"
            ? { likes: -1 }
            : { dislikes: -1 },
      }
    );

    await existing.deleteOne();

    return res.json({ success: true });
  }

  if (
    existing &&
    existing.value !== value
  ) {
    await Feedbacks.findByIdAndUpdate(
      feedbackId,
      {
        $inc:
          value === "like"
            ? { likes: 1, dislikes: -1 }
            : { likes: -1, dislikes: 1 },
      }
    );

    existing.value = value;

    await existing.save();
  }

  res.json({ success: true });
};

export {
  voteFeedback,
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};