import { createMocks } from "node-mocks-http";
import { verify } from "../../utils/hash";
import { AuthTest } from "../../utils/tests";
import users from "../../mocks/users.json";
import db from "../../lib/db";
import prisma from "../../lib/dbInstance";
import handler from "../../pages/api/me";

describe("GET /api/me", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  it("should return the logged user", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({ method: "GET", cookies: user.cookie });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
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

describe("PUT /api/me", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  const data = {
    firstname: "Fresco",
    lastname: "Baldo",
    email: "frescobaldo@example.com",
    password: "marcopolo",
    confirmPassword: "marcopolo",
  };

  it("should update the logged user (without password)", async () => {
    const user = await new AuthTest().signIn();
    const { password, confirmPassword, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      body: rest,
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: user.id,
      firstname: rest.firstname,
      lastname: rest.lastname,
      email: rest.email,
      created_at: user.created_at,
      updated_at: expect.any(String),
    });

    const userFromDb = await db.getUserById(user.id);

    expect(userFromDb).toMatchObject({
      firstname: rest.firstname,
      lastname: rest.lastname,
      email: rest.email,
    });
  });

  it("should update the logged user (with password)", async () => {
    const user = await new AuthTest().signIn(data.email);

    const { req, res } = createMocks({
      method: "PUT",
      body: data,
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: expect.any(Number),
      firstname: expect.any(String),
      lastname: expect.any(String),
      email: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    const userFromDb = await db.getUserById(user.id);

    expect(userFromDb).toMatchObject({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });

    expect(verify(data.password, userFromDb.password)).toBe(true);
  });

  it("should return 401 if user is not logged", async () => {
    const { req, res } = createMocks({ method: "PUT" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });

  it("should return 400 because firstname is required", async () => {
    const user = await new AuthTest().signIn(data.email, data.password);
    const { firstname, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      body: rest,
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because lastname is required", async () => {
    const user = await new AuthTest().signIn(data.email, data.password);
    const { lastname, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      body: rest,
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is required", async () => {
    const user = await new AuthTest().signIn(data.email, data.password);
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      body: rest,
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is invalid", async () => {
    const user = await new AuthTest().signIn(data.email, data.password);
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      body: { ...rest, email: "invalid" },
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is already taken", async () => {
    const user = await new AuthTest().signIn(data.email, data.password);
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      body: { ...rest, email: "fklaes1@is.gd" },
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 if password and confirmPassword don't match", async () => {
    const user = await new AuthTest().signIn(data.email, data.password);
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
        confirmPassword: "password2",
      },
      cookies: user.cookie,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
