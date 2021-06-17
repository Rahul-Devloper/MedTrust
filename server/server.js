// import the libraries
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const passport = require("./utils/passport");
require("dotenv").config();

// initiate the express app
const app = express();

// port
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

// middlewares
app.use(compression());
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(cookieParser());
app.use(morgan("dev")); // output colored by response status for development use
app.use(cors());

// routes (read routes in the "routes" dir and prepend "/api" to all routes)
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

app.listen(PORT, () =>
  console.log(`Express server is running on port: ${PORT}`)
);
