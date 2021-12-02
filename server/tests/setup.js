const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo;

// jest.setTimeout(30000);

// Mongo Hook
beforeAll(async () => {
  // Set JWT environment variables
  process.env.JWT_ACCESS_SECRET = "asdasdasdasdf";
  process.env.JWT_REFRESH_SECRET = "asdasdasdasadsdf";
  process.env.JWT_ACCESS_TOKEN_TTL = "15m";
  process.env.JWT_EMAIL_SECRET = "asdasduediuabs";
  process.env.NODEMAILER_EMAIL = "dk09525@gmail.com";
  process.env.NODEMAILER_PASSWORD = "SOMEPASSWORD!";

  // Create a new MongoDB instance
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// A hook that runs before all tests in the suite
beforeEach(async () => {
  // Drop the database before each test
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Now stop the mongo server
afterAll(async () => {
  setTimeout(async () => {
    await mongo.stop();
    await mongoose.connection.close();
  }, 10000);
});
