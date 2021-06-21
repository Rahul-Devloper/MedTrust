const jwt = require("jsonwebtoken");

// Authentication check middleware
exports.authCheck = (req, res, next) => {
  // Get the JWT thats sent in headers of the request
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res.status(403).json("You are not authorized");
    } else {
      // If the JWT is present, get only that string
      const token = authHeader.split(" ")[1];
      // Verify the token, provide access to the route with next()
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res
            .status(403)
            .json("Token is not valid, please log in again");
        }
        req.user = user;
      });

      next();
    }
  } catch (error) {
    console.log("AUTH_CHECK_ERROR", error);
  }
};
