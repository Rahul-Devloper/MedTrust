const request = require("supertest");
const app = require("../../app");

/**********************************
  Current User Admin Test
***********************************/
describe("Current User Admin Test", () => {
  it("Should return 200 if user is admin", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .post("/api/currentAdmin")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({});

    expect(response.statusCode).toBe(200);
  });
});

/**********************************
  Other Admin Tests
***********************************/
describe("Other Admin Tests", () => {
  // Test member team invite by admin
  it("Should return 200 on member team invite", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    const response = await request(app)
      .post("/api/admin/team/invite")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email: "member@test.com",
      });

    expect(response.statusCode).toBe(200);
  });

  // Test get all projects belonging to admin
  it("Should return 200 on get all admin projects", async () => {
    // Login as admin
    const accessToken = await global.login(request, app, "admin");

    // Create project one
    const responseOne = await request(app)
      .post("/api/project")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "One Project",
        description: "One Project Description",
        startDate: "2020-01-01",
        endDate: "2020-01-01",
      });

    expect(responseOne.statusCode).toBe(201);

    // Create project two
    const responseTwo = await request(app)
      .post("/api/project")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Two Project",
        description: "Two Project Description",
        startDate: "2020-01-01",
        endDate: "2020-01-01",
      });

    expect(responseTwo.statusCode).toBe(201);

    // Login as another admin
    const secondAccessToken = await global.login(
      request,
      app,
      "admin",
      "second@test.com"
    );

    // Create a project for this admin
    const responseThree = await request(app)
      .post("/api/project")
      .set("Authorization", `Bearer ${secondAccessToken}`)
      .send({
        name: "Three Project",
        description: "Three Project Description",
        startDate: "2020-01-01",
        endDate: "2020-01-01",
      });

    expect(responseThree.statusCode).toBe(201);

    // Get all projects of admin first admin
    const firstAdminProjects = await request(app)
      .get("/api/admin/projects")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(firstAdminProjects.statusCode).toBe(200);
    expect(firstAdminProjects.body.projects.length).toBe(2);

    // Get all projects of admin second admin
    const secondAdminProjects = await request(app)
      .get("/api/admin/projects")
      .set("Authorization", `Bearer ${secondAccessToken}`);

    expect(secondAdminProjects.statusCode).toBe(200);
    expect(secondAdminProjects.body.projects.length).toBe(1);
  });
});
