const request = require("supertest");
const app = require("../../app");

// Test signup
describe("Signup user", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).post("/api/signup").send({
      name: "test",
      email: "test@test.com",
      password: "Test1234!",
    });

    expect(response.statusCode).toBe(201);
  });
});
