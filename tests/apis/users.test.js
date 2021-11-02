import { createMocks } from "node-mocks-http";
import { verify } from "../../utils/hash";
import users from "../../mocks/users.json";
import db from "../../lib/db";
import prisma from "../../lib/dbInstance";

import { default as multiHandler } from "../../pages/api/users";
import { default as singleHandler } from "../../pages/api/users/[id]";
import { AuthTest } from "../../utils/tests";

describe("GET /api/users", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  it("should return the user list", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({ method: "GET", cookies: user.cookie });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(Array.isArray(res._getJSONData())).toBe(true);

    res._getJSONData().forEach((user) => {
      expect(user).toEqual({
        id: expect.any(Number),
        firstname: expect.any(String),
        lastname: expect.any(String),
        email: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({ method: "GET" });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toBe(true);
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });
});

describe("GET /api/users/[id]", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  it("should return an user", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "GET",
      params: { id: 1 },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

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
  });

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({
      method: "GET",
      params: { id: 1 },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toBe(true);
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });

  it("should return 404 if user not found", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "GET",
      params: { id: 9999 },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      message: "User not found",
    });
  });
});

describe("PUT /api/users/[id]", () => {
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

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: data,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toBe(true);
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });

  it("should return 400 because firstname is required", async () => {
    const user = await new AuthTest().signIn();
    const { firstname, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because lastname is required", async () => {
    const user = await new AuthTest().signIn();
    const { lastname, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is required", async () => {
    const user = await new AuthTest().signIn();
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is invalid", async () => {
    const user = await new AuthTest().signIn();
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: { ...rest, email: "invalid" },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is already taken", async () => {
    const user = await new AuthTest().signIn();
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: { ...rest, email: "fklaes1@is.gd" },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 404 if user not found", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 9999 },
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      message: "User not found",
    });
  });

  it("should return 400 if password and confirmPassword don't match", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
        confirmPassword: "password2",
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should update an user (without password)", async () => {
    const user = await new AuthTest().signIn();
    const { password, confirmPassword, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
      cookies: user.cookie,
    });

    await singleHandler(req, res);

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

    const userFromDb = await db.getUserById(1);

    expect(userFromDb).toMatchObject({
      firstname: rest.firstname,
      lastname: rest.lastname,
      email: rest.email,
    });
  });

  it("should update an user (with password)", async () => {
    const user = await new AuthTest().signIn(data.email);
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: data,
      cookies: user.cookie,
    });

    await singleHandler(req, res);

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

    const userFromDb = await db.getUserById(1);

    expect(userFromDb).toMatchObject({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });

    expect(verify(data.password, userFromDb.password)).toBe(true);
  });
});

describe("POST /api/users", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  const data = {
    firstname: "Fresco",
    lastname: "Baldo",
    email: "frescobaldo@example.com",
    password: "password",
    confirmPassword: "password",
  };

  it("should return a created user", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: data,
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toEqual({
      id: expect.any(Number),
      firstname: expect.any(String),
      lastname: expect.any(String),
      email: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    // Check password validity
    const userFromDb = await db.getUserByEmail(data.email);
    expect(verify(data.password, userFromDb.password)).toBe(true);
  });

  it("should return 401 because user is not authenticated", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: data,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toBe(true);
    expect(res._getJSONData()).toEqual({
      message: "Unauthorized",
    });
  });

  it("should return an error, email already exists", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: data,
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, firstname is required", async () => {
    const user = await new AuthTest().signIn();
    const { firstname, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, lastname is required", async () => {
    const user = await new AuthTest().signIn();
    const { lastname, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, email is required", async () => {
    const user = await new AuthTest().signIn();
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, email is invalid", async () => {
    const user = await new AuthTest().signIn();
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, email: "invalid" },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, password is required", async () => {
    const user = await new AuthTest().signIn();
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, password is invalid", async () => {
    const user = await new AuthTest().signIn();
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, password: "invalid" },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, the password does not match the confirmation", async () => {
    const user = await new AuthTest().signIn();
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, confirmPassword: "invalid" },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
