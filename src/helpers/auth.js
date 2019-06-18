import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: "unauthorized access"
    });
  }

  jwt.verify(token, "ntagungira", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        error: "authenticate failed"
      });
    }
    if (decoded.type !== true) {
      return res.status(401).json({
        status: 401,
        error: "Only admin authorised"
      });
    }
    next();
    return true;
  });
  return true;
};

export default verifyToken;
