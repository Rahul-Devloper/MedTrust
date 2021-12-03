const request = require("supertest");
const app = require("../../app");

/**********************************
  Coupon tests
***********************************/
describe("Coupon tests", () => {
  // Test to create a coupon by admin
  test("return 201 on coupon create by admin", async () => {
    const accessToken = await global.login(request, app, "admin");

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
  test("return 403 on coupon create by non-admin", async () => {
    const accessToken = await global.login(request, app, "normal");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    expect(response.statusCode).toBe(403);
  });

  // Test coupon create without login
  test("return 401 on coupon create without login", async () => {
    const response = await request(app).post("/api/coupon").send({
      name: "test coupon",
      code: "TEST10",
    });

    expect(response.statusCode).toBe(401);
  });

  // Test coupon create without name
  test("return 400 on coupon create without name", async () => {
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        code: "TEST10",
      });

    expect(response.statusCode).toBe(400);
  });

  // Test coupon create without code
  test("return 400 on coupon create without code", async () => {
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
      });

    expect(response.statusCode).toBe(400);
  });
});
