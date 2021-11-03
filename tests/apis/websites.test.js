import { createMocks } from "node-mocks-http";
import { AuthTest } from "../../utils/tests";
import users from "../../mocks/users.json";
import websites from "../../mocks/websites.json";
import prisma from "../../lib/dbInstance";
import { default as multiHandler } from "../../pages/api/websites";
import { default as singleHandler } from "../../pages/api/websites/[id]";
import db from "../../lib/db";

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "websites" RESTART IDENTITY`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
  await prisma.user.createMany({ data: users });
  await prisma.website.createMany({ data: websites });
});

describe("GET /websites", () => {
  it("should return a list of websites", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({ method: "GET", cookies: user.cookie });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData().length).toBe(10);

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

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({ method: "GET" });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Unauthorized" });
  });
});

describe("GET /websites/[id]", () => {
  let website;

  const data = {
    name: "test",
    url: "https://test.com",
    is_public: true,
    user_id: 1,
  };

  beforeAll(async () => {
    website = await db.createWebsite(data);
  });

  it("should return a website", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "GET",
      params: { id: website.id },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: website.id,
      name: data.name,
      url: data.url,
      is_public: data.is_public,
      user_id: user.id,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it("should return 404 if website does not exist", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "GET",
      params: { id: "123" },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Website not found" });
  });

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({
      method: "GET",
      params: { id: website.id },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Unauthorized" });
  });

  it("should return 404 if user is not the owner of the website", async () => {
    const user = await new AuthTest().signIn("fklaes1@is.gd");
    const { req, res } = createMocks({
      method: "GET",
      params: { id: website.id },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Website not found" });
  });
});

describe("PUT /websites/[id]", () => {
  let website;

  const data = {
    name: "test",
    url: "https://test.com",
    is_public: true,
    user_id: 1,
  };

  beforeAll(async () => {
    website = await db.createWebsite(data);
  });

  it("should update a website", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        name: "test2",
        url: "https://test2.com",
        is_public: false,
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: website.id,
      name: "test2",
      url: "https://test2.com",
      is_public: false,
      user_id: user.id,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it("should return 404 if website does not exist", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: "123" },
      body: {
        name: "test2",
        url: "https://test2.com",
        is_public: false,
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Website not found" });
  });

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        name: "test2",
        url: "https://test2.com",
        is_public: false,
      },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Unauthorized" });
  });

  it("should return 404 if user is not the owner of the website", async () => {
    const user = await new AuthTest().signIn("fklaes1@is.gd");
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        name: "test2",
        url: "https://test2.com",
        is_public: false,
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Website not found" });
  });

  it("should return 400 because name is required", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        url: "https://test2.com",
        is_public: false,
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because url is required", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        name: "test2",
        is_public: false,
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because is_public is required", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        name: "test2",
        url: "https://test2.com",
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because is_public is not a boolean", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "PUT",
      params: { id: website.id },
      body: {
        name: "test2",
        url: "https://test2.com",
        is_public: "thisisnotaboolean",
      },
      cookies: user.cookie,
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._isJSON()).toEqual(true);
  });
});

describe("POST /websites", () => {
  it("should create a new website", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "test",
        url: "https://test.com",
        is_public: true,
      },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: expect.any(String),
      name: "test",
      url: "https://test.com",
      is_public: true,
      user_id: user.id,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it("should create a new website also with is_public as a boolean string", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "test",
        url: "https://test.com",
        is_public: "true",
      },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({
      id: expect.any(String),
      name: "test",
      url: "https://test.com",
      is_public: true,
      user_id: user.id,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });

  it("should return 401 if user is not authenticated", async () => {
    const { req, res } = createMocks({ method: "POST" });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(res._isJSON()).toEqual(true);
    expect(res._getJSONData()).toEqual({ message: "Unauthorized" });
  });

  it("should return 400 because the name is required", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: {
        url: "https://test.com",
        is_public: true,
      },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because the url is required", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "test",
        is_public: true,
      },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because the is_public is required", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "test",
        url: "https://test.com",
      },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because the is_public is not a boolean", async () => {
    const user = await new AuthTest().signIn();
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "test",
        url: "https://test.com",
        is_public: "thisisnotboolean",
      },
      cookies: user.cookie,
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
