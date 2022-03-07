const request = require("supertest");
const app = require("../../app");

/**********************************
  Current User Super Admin Test
***********************************/
describe("Current User Super Admin Test", () => {
  it("Should return 200", async () => {
    // Login as superadmin
    const accessToken = await global.login(request, app, "superadmin");

    const response = await request(app)
      .post("/api/currentSuperAdmin")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({});

    expect(response.statusCode).toBe(200);
  });
});
