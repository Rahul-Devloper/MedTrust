const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo;

// Mongo Hook
beforeAll(async () => {
  // Set JWT environment variables
  process.env.JWT_ACCESS_SECRET =
    "b0c120ba56c8d245fa6189b6a93a22046afbc2f462cd1d5329868c140fe9c14749020c52e9fcc1060e6523b6f00ad8d35b215f7e6a34316432439cd6e07036d2";
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
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

// A hook that runs before every test in the suite
beforeEach(async () => {
  // Drop the database before each test
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// After all the test suites, stop the mongo server
afterAll(async () => {
  setTimeout(async () => {
    // Stop the mongo memory server
    await mongo.stop();
    // Disconnect mongoose
    await mongoose.connection.close();
  }, 1000).unref();
});

// Global login function
global.login = async (request, app, role, email) => {
  await request(app)
    .post("/api/signup")
    .send({
      name: "test",
      email: email || "test@test.com",
      password: "Test1234!",
      role: role,
    });

  const login = await request(app)
    .post("/api/login")
    .send({
      email: email || "test@test.com",
      password: "Test1234!",
    });

  return login.body.accessToken;
};
