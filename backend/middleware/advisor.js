const adviserOnly = (req, res, next) => {
  if (req.user.role !== "ADVISER") {
    return res
      .status(403)
      .json({ message: "Only advisers can post" });
  }

  next();
};

export default adviserOnly;