const request = require("supertest");
const app = require("../../app");

/**********************************
  User signup tests
***********************************/
describe("Signup user", () => {
  // Test successful signup
  it("returns 201 on successful sign up", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test@test.com",
      password: "Test1234!",
    });

    expect(response.statusCode).toBe(201);
  });

  // Test with invalid email
  it("returns 400 with invalid email", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test",
      password: "Test1234!",
    });

    expect(response.status).toBe(400);
  });

  // Test with invalid password
  it("returns 400 with invalid password", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test@test.com",
      password: "Test",
    });

    expect(response.status).toBe(400);
  });

  // Test duplicate email
  it("returns 409 with duplicate email", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test1@gmail.com",
      password: "Test1234!",
    });

    expect(response.status).toBe(201);

    const response2 = await request(app).post("/api/signup").send({
      name: "test",
      email: "test1@gmail.com",
      password: "Test1234!",
    });

    expect(response2.status).toBe(409);
  });
});

/**********************************
  User login tests
***********************************/
describe("Login user", () => {
  // Test successful login
  it("returns 200 on successful login", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test@gmail.com",
      password: "Test1234!",
    });

    expect(response.status).toBe(201);

    const response2 = await request(app).post("/api/login").send({
      email: "test@gmail.com",
      password: "Test1234!",
    });

    expect(response2.status).toBe(200);
  });

  // Test invalid email
  it("returns 401 with invalid email", async () => {
    const response = await request(app).post("/api/login").send({
      email: "test@gmail.com",
      password: "Test1234!",
    });

    expect(response.body.status).toBe(401);
  });

  // Test invalid password
  it("returns 401 with invalid password", async () => {
    const response = await request(app).post("/api/login").send({
      email: "test@gmail.com",
      password: "asd",
    });

    expect(response.status).toBe(401);
  });

  // Test if access token is returned upon login
  it("returns 200 with access token upon login", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test@gmail.com",
      password: "Test1234!",
    });

    expect(response.status).toBe(201);

    const response2 = await request(app).post("/api/login").send({
      email: "test@gmail.com",
      password: "Test1234!",
    });

    expect(response2.status).toBe(200);
    expect(response2.body.accessToken).toBeDefined();
  });
});
