const request = require("supertest");
const app = require("../../app");

/**********************************
  Coupon create tests
***********************************/
describe("Coupon Create Tests", () => {
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

/**********************************
  Coupon read tests
***********************************/
describe("Coupon Read Tests", () => {
  // Test get all coupons error if not present
  test("return 404 on get all coupons, if no coupons", async () => {
    const response = await request(app).get("/api/coupons");
    expect(response.statusCode).toBe(404);
  });

  // Test get all coupons
  test("return 200 on get all coupons", async () => {
    const accessToken = await global.login(request, app, "admin");

    // Create a coupon
    await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    const response = await request(app).get("/api/coupons");
    expect(response.statusCode).toBe(200);
  });

  // Test get a coupon by id
  test("return 200 on get a coupon by id", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "admin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    const couponId = response.body.data._id;
    const response2 = await request(app).get(`/api/coupon/${couponId}`);
    expect(response2.statusCode).toBe(200);
  });
});

/**********************************
  Coupon update tests
***********************************/
describe("Coupon Update Tests", () => {
  // Test update coupon error if name and code not present
  test("return 400 on update coupon, if name and code not present", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "admin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    const couponId = response.body.data._id;

    const response2 = await request(app)
      .put(`/api/coupon/${couponId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({});
    expect(response2.statusCode).toBe(400);
  });

  // Test update coupon name
  test("return 200 on update coupon name", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "admin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    const couponId = response.body.data._id;

    const response2 = await request(app)
      .put(`/api/coupon/${couponId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon updated",
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.coupon.name).toBe("test coupon updated");
  });

  // Test update coupon code
  test("return 200 on update coupon code", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "admin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    const couponId = response.body.data._id;

    const response2 = await request(app)
      .put(`/api/coupon/${couponId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        code: "TEST11",
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.coupon.code).toBe("TEST11");
  });
});

/**********************************
  Coupon delete tests
***********************************/
describe("Coupon Delete Tests", () => {
  // Test delete coupon error if coupon not present
  test("return 404 on delete coupon, if coupon not present", async () => {
    const accessToken = await global.login(request, app, "admin");
    const response = await request(app)
      .delete("/api/coupon/61a9c3ae5c739a99a463f0ab")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });

  // Test delete coupon
  test("return 200 on delete coupon", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "admin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
      });

    const couponId = response.body.data._id;
    const response2 = await request(app)
      .delete(`/api/coupon/${couponId}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response2.statusCode).toBe(200);
  });
});
