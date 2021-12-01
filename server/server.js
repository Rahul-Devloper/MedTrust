const app = require("./app");
const mongoose = require("mongoose");

// Port
const PORT = process.env.PORT || 8000;

// Check for auth MongoDB URI
if (!process.env.ATLAS_URI) {
  throw new Error("MONGO URI NOT SET!");
}

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

// Start server
app.listen(PORT, () =>
  console.log(`Express server is running on port: ${PORT}`)
);
