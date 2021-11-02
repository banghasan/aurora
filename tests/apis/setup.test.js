import { createMocks } from "node-mocks-http";
import users from "../../mocks/users.json";
import prisma from "../../lib/dbInstance";
import handler from "../../pages/api/setup";

describe("POST /setup", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
  });

  it("should create the first user", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
        confirmPassword: "password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._getJSONData()).toMatchObject({
      email: "john.doe@example.com",
      firstname: "John",
      lastname: "Doe",
    });
  });

  it("should return an error if the passwords don't match", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
        confirmPassword: "password2",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error if the password is too short", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "pass",
        confirmPassword: "pass",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error if the firstname is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
        confirmPassword: "password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error if the lastname is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        email: "john.doe@example.com",
        password: "password",
        confirmPassword: "password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error if the email is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        lastname: "Doe",
        password: "password",
        confirmPassword: "password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error if the password is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        confirmPassword: "password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return an error if the confirmPassword is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password",
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});

describe("GET /setup", () => {
  beforeAll(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
  });

  it("should return 200 because the setup is not done", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  it("should return 400 because the setup is already done", async () => {
    await prisma.user.createMany({ data: users });

    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
