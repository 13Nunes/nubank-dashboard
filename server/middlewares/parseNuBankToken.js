const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization;
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    // Save decoded token on request
    const decoded = JSON.parse(token.toString("utf8"));
    req.decoded = decoded;
    return next();
  } else {
    return res.status(401).json({
      error: "Not Authorized.",
    });
  }
};

module.exports = {
  checkToken,
};
