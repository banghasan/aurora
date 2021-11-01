import { createMocks } from "node-mocks-http";
import users from "../../mocks/users.json";
import db from "../../lib/db";
import prisma from "../../lib/dbInstance";
import handler from "../../pages/api/users";
import { verify } from "../../utils/hash";

describe("GET /api/users", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
    await prisma.user.createMany({ data: users });
  });

  it("should return an array", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(Array.isArray(res._getJSONData())).toBe(true);
  });

  it("should match the response schema", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await handler(req, res);

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

describe("POST /api/users", () => {
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

    await handler(req, res);

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

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, firstname is required", async () => {
    const { firstname, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, lastname is required", async () => {
    const { lastname, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, email is required", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, email is invalid", async () => {
    const { email, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, email: "invalid" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, password is required", async () => {
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: rest,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, password is invalid", async () => {
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, password: "invalid" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error, the password does not match the confirmation", async () => {
    const { password, ...rest } = data;
    const { req, res } = createMocks({
      method: "POST",
      body: { ...rest, confirmPassword: "invalid" },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
