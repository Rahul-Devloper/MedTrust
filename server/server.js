const app = require("./app");

// Port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () =>
  console.log(`Express server is running on port: ${PORT}`)
);
