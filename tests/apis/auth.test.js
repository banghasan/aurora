import { createMocks } from "node-mocks-http";
import users from "../../mocks/users.json";
import prisma from "../../lib/dbInstance";
import { AuthTest } from "../../utils/tests";
import { default as loginHandler } from "../../pages/api/auth/login";
import { default as logoutHandler } from "../../pages/api/auth/logout";

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
  await prisma.user.createMany({ data: users });
});

describe("POST /auth/login", () => {
  const data = {
    email: "firstuser@example.com",
    password: "password",
  };

  it("should return a valid token", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: data,
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getHeaders()["set-cookie"]).toBeDefined();
    expect(res._getJSONData()).toEqual({
      accessToken: expect.any(String),
      user: {
        id: expect.any(Number),
        email: data.email,
        firstname: "First",
        lastname: "User",
        created_at: expect.any(String),
        updated_at: expect.any(String),
        // role: "USER", TODO: fix this
      },
    });
  });

  it("should fail if the user does not exist", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "notexists",
        password: data.password,
      },
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getHeaders()["set-cookie"]).toBeUndefined();
    expect(res._getJSONData()).toEqual({
      message: "Invalid credentials",
    });
  });

  it("should fail if the password is incorrect", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: data.email,
        password: "invalid",
      },
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getHeaders()["set-cookie"]).toBeUndefined();
    expect(res._getJSONData()).toEqual({
      message: "Invalid credentials",
    });
  });

  it("should fail if the email is incorrect", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "invalid",
        password: data.password,
      },
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getHeaders()["set-cookie"]).toBeUndefined();
    expect(res._getJSONData()).toEqual({
      message: "Invalid credentials",
    });
  });
});

describe("POST /auth/logout", () => {
  it("should logout the user", async () => {
    const cookie = await new AuthTest().getCookie();

    const { req, res } = createMocks({
      method: "POST",
      cookies: cookie,
    });

    await logoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getHeaders()["set-cookie"]).toBeDefined();
    expect(res._getJSONData()).toEqual({
      message: "Logged out successfully",
    });
  });

  it("should fail if the user is not logged in", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    await logoutHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._getHeaders()["set-cookie"]).toBeUndefined();
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });
});
