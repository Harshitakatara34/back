const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.status(400).send({
        msg: "No token found, please provide the token or log in again",
      });
    }

    const decoded = jwt.verify(token, "harshi");
    req.email = decoded.email;

    next();
  } catch (error) {
    return res.status(500).send({
      msg: "Something went wrong in middleware",
      error: error.message,
    });
  }
};

module.exports = { authMiddleware };
