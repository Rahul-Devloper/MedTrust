// import the libraries
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
require("dotenv").config();

// Initiate the express app
const app = express();

// Port
const PORT = process.env.PORT || 8000;

// db
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error - ${err}`));

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
require("./middlewares/passport")(passport);

// Routes (read routes in the "routes" dir and prepend "/api" to all routes)
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// Start server
app.listen(PORT, () =>
  console.log(`Express server is running on port: ${PORT}`)
);
