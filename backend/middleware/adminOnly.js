const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin only"
    });
  }

  next();
};

export default adminOnly;