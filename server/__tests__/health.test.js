const request = require("supertest");
const app = require("../app");

describe("API Health Check", () => {
  it("GET / should return 200 and a message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBeDefined();
  });
});

describe("Security Headers", () => {
  it("should include Helmet security headers", async () => {
    const res = await request(app).get("/");
    // Helmet sets these headers
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("SAMEORIGIN");
  });
});

describe("NoSQL Injection Prevention", () => {
  it("should reject login with $ operator in body", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: { $gt: "" }, password: { $gt: "" } });
    // express-validator rejects non-string email
    expect(res.statusCode).toBe(400);
  });
});
