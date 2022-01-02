// import the libraries
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// Initiate the express app
const app = express();

// Middlewares
app.use(compression());
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev")); // output colored by response status for development use
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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Export the app
module.exports = app;
