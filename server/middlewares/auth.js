const jwt = require("jsonwebtoken");

// Authentication check middleware
exports.authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      // Get the JWT thats sent in headers of the request
      const token = req.headers.authorization.split(" ")[1];

      // If token exists
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
          // If the token provided is not valid
          if (err) {
            return res.json({
              error: true,
              type: [
                {
                  code: "GLOBAL_ERROR",
                  message: "Token is not valid or expired, please log in again",
                },
              ],
            });
          }
          req.user = user;
        });
      }
      next();
    } catch (error) {
      console.log("AUTH_CHECK_ERROR", error);
    }
  } else {
    res.json("You are unauthorized");
  }
};

// Admin check middleware
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.json({
      error: true,
      type: [
        {
          code: "GLOBAL_ERROR",
          message: "Admin resource, access denied",
        },
      ],
    });
  } else {
    next();
  }
};
