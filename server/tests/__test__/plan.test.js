const request = require("supertest");
const app = require("../../app");

/**********************************
  Plan create tests
***********************************/
describe("Plan Create Tests", () => {
  // Test to create a plan by super admin
  test("return 201 on plan create by super admin", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test plan",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });

    expect(response.statusCode).toBe(201);
  });

  // Test plan create by non-superadmin
  test("return 403 on plan create by non-superadmin", async () => {
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test plan",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });
    expect(response.statusCode).toBe(403);
  });

  // Test plan create without login
  test("return 401 on plan create without login", async () => {
    const response = await request(app).post("/api/plan").send({
      name: "test plan",
      description: "test description",
      monthlyPrice: 100,
      annualPrice: 1000,
      trialDays: 30,
      maxProjects: 10,
      maxUsers: 10,
    });
    expect(response.statusCode).toBe(401);
  });

  // Test plan create without required fields
  test("return 400 on plan create without required fields", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test coupon",
      });
    expect(response.statusCode).toBe(400);
  });

  // Test plan create with already existing name
  test("return 400 on plan create with already existing name", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "free",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });
    expect(response.statusCode).toBe(201);

    const response2 = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "free",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });
    expect(response2.statusCode).toBe(400);
  });
});

/**********************************
  Plan read tests
***********************************/
describe("Plan Read Tests", () => {
  // Test get all plans error if not present
  test("return 404 on get all plans, if no plans", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .get("/api/plans")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });

  // Test get all plans
  test("return 200 on get all plans", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    // Create a plan
    await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test plan",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });

    const response = await request(app)
      .get("/api/plans")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  // Test get plan by id error if not present
  test("return 404 on get plan by id, if no plan", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .get("/api/plan/61af55568a02a340020fa728")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });

  // Test get plan by id
  test("return 200 on get plan by id", async () => {
    const accessToken = await global.login(request, app, "superadmin");

    // Create a plan
    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test plan",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });

    const planId = response.body._id;

    const response2 = await request(app)
      .get(`/api/plan/${planId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response2.statusCode).toBe(200);
  });
});

/**********************************
  Plan update tests
***********************************/
describe("Plan Update Tests", () => {
  // Test update plan by super admin
  test("return 200 on update plan", async () => {
    // Create a plan
    const accessToken = await global.login(request, app, "superadmin");
    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test plan",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });

    const id = response.body._id;

    const response2 = await request(app)
      .put(`/api/plan/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test1",
        description: "test description1",
        monthlyPrice: 103,
        annualPrice: 1003,
      });

    expect(response2.statusCode).toBe(200);
    expect(response2.body.monthlyPrice).toBe(103);
  });
});

/**********************************
  Plan delete tests
***********************************/
describe("Plan Delete Tests", () => {
  // Test delete plan
  test("return 200 on delete plan", async () => {
    const accessToken = await global.login(request, app, "superadmin");
    // Create a plan
    const response = await request(app)
      .post("/api/plan")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "test plan",
        description: "test description",
        monthlyPrice: 100,
        annualPrice: 1000,
        trialDays: 30,
        maxProjects: 10,
        maxUsers: 10,
      });

    const id = response.body._id;

    const response2 = await request(app)
      .delete(`/api/plan/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response2.statusCode).toBe(200);
  });
});
