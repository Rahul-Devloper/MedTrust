const request = require("supertest");
const app = require("../../app");

// Emulate user signup and login
const login = async () => {
  await request(app).post("/api/signup").send({
    name: "test",
    email: "test@test.com",
    password: "Test1234!",
    role: "admin",
  });

  const login = await request(app).post("/api/login").send({
    email: "test@test.com",
    password: "Test1234!",
  });

  return login.body.accessToken;
};

/**********************************
  Coupon tests
***********************************/
describe("Coupon tests", () => {
  // Test to create a coupon by admin
  test("return 201 on coupon create by admin", async () => {
    const accessToken = await login();

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    expect(response.statusCode).toBe(201);
  });

  // Test coupon create by non-admin
  test("return 401 on coupon create by non-admin", async () => {
    const response = await request(app).post("/api/coupon").send({
      name: "test coupon",
      code: "TEST10",
    });

    expect(response.statusCode).toBe(401);
  });
});
