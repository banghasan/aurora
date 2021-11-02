import { createMocks } from "node-mocks-http";
import { AuthTest } from "../../utils/tests";
import users from "../../mocks/users.json";
import websites from "../../mocks/websites.json";
import db from "../../lib/db";
import prisma from "../../lib/dbInstance";
import handler from "../../pages/api/me/websites";

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "websites" RESTART IDENTITY`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
  await prisma.user.createMany({ data: users });
  await prisma.website.createMany({ data: websites });
});

describe("GET /api/me/websites", () => {
  it("should return the websites of the user", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({ method: "GET", cookies: user.cookie });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData().length).toBe(3);

    res._getJSONData().forEach((website) => {
      expect(website).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        url: expect.any(String),
        is_public: expect.any(Boolean),
        user_id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  it("should return 401 if user is not logged", async () => {
    const { req, res } = createMocks({ method: "GET" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });
});
