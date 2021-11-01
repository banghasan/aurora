import { createMocks } from "node-mocks-http";
import { verify } from "../../utils/hash";
import users from "../../mocks/users.json";
import db from "../../lib/db";
import prisma from "../../lib/dbInstance";

import { default as multiHandler } from "../../pages/api/users";
import { default as singleHandler } from "../../pages/api/users/[id]";

describe("GET /api/users", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  it("should return an array", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(Array.isArray(res._getJSONData())).toBe(true);
  });

  it("should match the response schema", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);

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
});

describe("GET /api/users/[id]", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  it("should return an user", async () => {
    const { req, res } = createMocks({ method: "GET", params: { id: 1 } });
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

  it("should return 404 if user not found", async () => {
    const { req, res } = createMocks({ method: "GET", params: { id: 9999 } });
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

  it("should update an user (without password)", async () => {
    const { password, confirmPassword, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
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

    const user = await db.getUserById(1);

    expect(user).toMatchObject({
      firstname: rest.firstname,
      lastname: rest.lastname,
      email: rest.email,
    });
  });

  it("should update an user (with password)", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: data,
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

    const user = await db.getUserById(1);

    expect(user).toMatchObject({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    });

    expect(verify(data.password, user.password)).toBe(true);
  });

  it("should return 400 because firstname is required", async () => {
    const { firstname, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because lastname is required", async () => {
    const { lastname, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is required", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: rest,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is invalid", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: { ...rest, email: "invalid" },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because email is already taken", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 1 },
      body: { ...rest, email: "fklaes1@is.gd" },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 404 if user not found", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: 9999 },
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
      },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      message: "User not found",
    });
  });

  it("should return 400 if password and confirmPassword don't match", async () => {
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
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
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
    const { req, res } = createMocks({
      method: "POST",
      body: data,
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
    const user = await db.getUserByEmail(data.email);
    expect(verify(data.password, user.password)).toBe(true);
  });

  it("should return an error, email already exists", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: data,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, firstname is required", async () => {
    const { firstname, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, lastname is required", async () => {
    const { lastname, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, email is required", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, email is invalid", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, email: "invalid" },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, password is required", async () => {
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, password is invalid", async () => {
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, password: "invalid" },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, the password does not match the confirmation", async () => {
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, confirmPassword: "invalid" },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
