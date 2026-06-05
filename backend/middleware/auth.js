import { validateToken } from "../services/auth.js";

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

export {
    checkAuth
}