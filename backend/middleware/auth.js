import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("No token");
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, "secret123"); // ✅ SAME SECRET
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(400).json("Invalid token");
  }
};