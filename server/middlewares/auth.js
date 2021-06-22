const jwt = require("jsonwebtoken");

// Authentication check middleware
exports.authCheck = (req, res, next) => {
  try {
    // Get the JWT thats sent in headers of the request
    const token = req.headers.authorization.split(" ")[1];
    // Check if is local login or google login
    // If token length < 500, it's local, else google
    const isCustomAuth = token.length < 500;

    // If token exists and is local auth
    if (token && isCustomAuth) {
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) {
          return res
            .status(403)
            .json("Token is not valid, please log in again");
        }
        req.user = user._id;
      });
    } else {
      // If google authentication
      let decodedData = jwt.decode(token);
      req.user = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log("AUTH_CHECK_ERROR", error);
  }
};
