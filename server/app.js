// import the libraries
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const rateLimit = require("express-rate-limit");
const logger = require("./src/utils/logger");

require("dotenv").config();

// Initiate the express app
const app = express();

// Middlewares
var allowedDomains = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
// Rate Limiting
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    message: "You exceeded 100 requests in a minute limit!",
    headers: true,
  })
);

app.use(compression());
app.use(
  express.json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith("/api/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));
// Logger
app.use(morgan("combined", { stream: logger.stream }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./src//middlewares/passport")(passport);

// Routes (read routes in the "routes" dir and prepend "/api" to all routes)
fs.readdirSync("./src/routes").map((route) =>
  app.use("/api", require("./src/routes/" + route))
);

// Export the app
module.exports = app;
