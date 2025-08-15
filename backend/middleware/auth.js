const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // { id: ... }
    // expose in both shapes so routes can use either style
    req.userId = payload.id;
    req.user = { id: payload.id };
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
