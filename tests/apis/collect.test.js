import { createMocks } from "node-mocks-http";
import websites from "../../mocks/websites.json";
import prisma from "../../lib/dbInstance";
import { default as multiHandler } from "../../pages/api/collect";
import { default as singleHandler } from "../../pages/api/collect/[id]";
import db from "../../lib/db";

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "websites" RESTART IDENTITY`);
  await prisma.website.createMany({ data: websites });
});

describe("POST /api/collect", () => {
  let website;

  beforeAll(async () => {
    website = await db.createWebsite({ name: "test", url: "test", user_id: 1 });
  });

  it("should return 400 because element is required", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        type: "pageview",
        wid: website.id,
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 400 because wid is required", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        type: "pageview",
        element: "/",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 404 because wid does not exists", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        type: "pageview",
        element: "/",
        wid: "invalid",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(404);
  });

  it("should set pageview as default type", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().type).toBe("pageview");
  });

  it("should set custom type", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        type: "custom",
        element: "/",
        wid: website.id,
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().type).toBe("custom");
  });

  it("should set locale as en-GB", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
        locale: "en-GB",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().locale).toBe("en-GB");
  });

  it("should set https://example.com as referrer", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
        referrer: "https://example.com",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().referrer).toBe("https://example.com");
  });

  it("should set desktop as default device", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().device).toBe("desktop");
  });

  it("should set desktop as device", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().device).toBe("desktop");
  });

  it("should set mobile as device", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().device).toBe("mobile");
  });

  it("should set tablet as device", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().device).toBe("tablet");
  });

  it("should set chrome as browser in metadata", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const browser = res
      ._getJSONData()
      .metadata.find((el) => el.type === "browser");

    expect(browser.value).toBe("Chrome");
  });

  it("should set Mac OS as os in metadata", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const os = res._getJSONData().metadata.find((el) => el.type === "os");

    expect(os.value).toBe("Mac OS");
  });

  it("should set duration to 0 by default", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        element: "/",
        wid: website.id,
      },
    });

    await multiHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().duration).toBe(0);
  });
});

describe("POST /api/collect/[id]", () => {
  let event;

  beforeAll(async () => {
    event = await prisma.event.create({
      data: {
        type: "pageview",
        element: "/",
        referrer: null,
        device: "desktop",
        locale: null,
        website_id: "testid",
      },
    });
  });

  it("should update the duration", async () => {
    const { req, res } = createMocks({
      method: "POST",
      params: { id: event.id },
      body: {
        duration: 100,
      },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().duration).toBe(100);
  });

  it("should return 400 if duration is not a number", async () => {
    const { req, res } = createMocks({
      method: "POST",
      params: { id: event.id },
      body: {
        duration: "string",
      },
    });

    await singleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
  });
});
