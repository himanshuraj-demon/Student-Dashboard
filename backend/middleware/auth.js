import { validateToken } from "../services/auth.js";
import User from "../models/user.js";

function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      ok: false,
    });
  }
  const user = validateToken(token);

  if (!user) {
    return res.status(401).json({
      ok: false,
    });
  }
  req.user = user;
  next();
}

async function protect(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      ok: false,
    });
  }

  const tokenUser = validateToken(token);

  if (!tokenUser) {
    return res.status(401).json({
      ok: false,
    });
  }

  const dbUser = await User.findById(
    tokenUser._id
  ).select("_id name email role");

  if (!dbUser) {
    return res.status(401).json({
      ok: false,
    });
  }

  req.user = dbUser;

  next();
}

export {
  checkAuth,protect
}