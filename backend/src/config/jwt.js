const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function JWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "Token not provided" });

  jwt.verify(token, process.env.JWT_TOKEN, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token" });

    req.userId = decoded.id;
    next();
  });
}

module.exports = { JWT };
