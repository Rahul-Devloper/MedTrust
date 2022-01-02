const request = require("supertest");
const app = require("../../app");

/**********************************
  Coupon create tests
***********************************/
describe("Coupon Create Tests", () => {
  // Test to create a coupon by super admin
  test("return 201 on coupon create by super admin", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2021-12-18",
        discount: "10",
        limit: "10",
        used: "1",
      });

    expect(response.statusCode).toBe(201);
  });

  // Test coupon create by non-superadmin
  test("return 403 on coupon create by non-superadmin", async () => {
    const accessToken = await global.login(request, app, "member");

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

  // Test coupon create without code
  test("return 400 on coupon create without code", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
      });
    expect(response.statusCode).toBe(400);
  });

  // Test coupon create without expiry
  test("return 400 on coupon create without expiry", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        discount: "10",
        limit: "10",
        used: "1",
      });
    expect(response.statusCode).toBe(400);
  });

  // Test coupon create without discount
  test("return 400 on coupon create without discount", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        limit: "10",
        used: "0",
      });
    expect(response.statusCode).toBe(400);
  });

  // Test coupon create without limit
  test("return 400 on coupon create without limit", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        used: "0",
      });
    expect(response.statusCode).toBe(400);
  });

  // Test coupon create without used
  test("return 400 on coupon create without used", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
      });
    expect(response.statusCode).toBe(400);
  });

  // Test coupon create with already existing code
  test("return 400 on coupon create with already existing code", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "0",
      });
    expect(response.statusCode).toBe(201);

    const response2 = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "0",
      });

    expect(response2.statusCode).toBe(400);
  });
});

/**********************************
  Coupon read tests
***********************************/
describe("Coupon Read Tests", () => {
  // Test get all coupons error if not present
  test("return 404 on get all coupons, if no coupons", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .get("/api/coupons")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });

  // Test get all coupons
  test("return 200 on get all coupons", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    // Create a coupon
    await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const response = await request(app)
      .get("/api/coupons")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  // Test get coupon by id error if not present
  test("return 404 on get coupon by id, if no coupon", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .get("/api/coupon/61af55568a02a340020fa728")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });

  // Test get coupon by id
  test("return 200 on get coupon by id", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    // Create a coupon
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const couponId = response.body._id;

    const response2 = await request(app)
      .get(`/api/coupon/${couponId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response2.statusCode).toBe(200);
  });
});

/**********************************
  Coupon update tests
***********************************/
describe("Coupon Update Tests", () => {
  // Test update coupon name
  test("return 200 on update coupon name", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test1",
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.name).toBe("test1");
  });

  // Test update coupon code
  test("return 200 on update coupon code", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });
    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        code: "TEST11",
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.code).toBe("TEST11");
  });

  // Test update coupon expiry
  test("return 200 on update coupon expiry", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2021-12-31T00:00:00.000Z",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        expiry: "2021-12-28T00:00:00.000Z",
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.expiry).toBe("2021-12-28T00:00:00.000Z");
  });

  // Test update coupon discount
  test("return 200 on update coupon discount", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        discount: 20,
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.discount).toBe(20);
  });

  // Test update coupon limit
  test("return 200 on update coupon limit", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        limit: 20,
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.limit).toBe(20);
  });

  // Test update coupon used
  test("return 200 on update coupon used", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        used: 20,
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.used).toBe(20);
  });
});

/**********************************
  Coupon delete tests
***********************************/
describe("Coupon Delete Tests", () => {
  // Test delete coupon
  test("return 200 on delete coupon", async () => {
    // Create a coupon
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/coupon")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test",
        code: "TEST10",
        expiry: "2020-12-31",
        discount: "10",
        limit: "10",
        used: "1",
      });

    const id = response.body._id;

    const response2 = await request(app)
      .delete(`/api/coupon/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response2.statusCode).toBe(200);
  });
});
