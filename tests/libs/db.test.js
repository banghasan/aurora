import { PrismaClient } from "@prisma/client";

import db from "../../lib/db";
import { verify } from "../../utils/hash";

const prisma = new PrismaClient();

afterEach(async () => {
  await prisma.user.deleteMany();
  await prisma.website.deleteMany();
  await prisma.event.deleteMany();
});

describe.skip("getAllUser", () => {
  const data = {
    firstname: "Renato",
    lastname: "Pozzi",
    email: "info@renatopozzi.me",
  };

  beforeEach(async () => {
    await db.createUser(data, "password");
  });

  it("should obtain correctly the users", async () => {
    const users = await db.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(1);

    users.forEach((user) => {
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

describe("createUser", () => {
  const data = {
    firstname: "Renato",
    lastname: "Pozzi",
    email: "info@renatopozzi.me",
  };

  afterEach(async () => prisma.user.deleteMany());

  it("should create correctly an user", async () => {
    const user = await db.createUser(data, "password");
    expect(typeof user).toBe("object");
    expect(user).toMatchObject(data);
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
    expect(verify("password", user.password)).toBe(true);
  });

  it("should throw an exception cuz firstname is required", async () => {
    const { firstname, ...rest } = data;
    await expect(db.createUser(rest, "password")).rejects.toThrow();
  });

  it("should throw an exception cuz lastname is required", async () => {
    const { lastname, ...rest } = data;
    await expect(db.createUser(rest, "password")).rejects.toThrow();
  });

  it("should throw an exception cuz email is required", async () => {
    const { email, ...rest } = data;
    await expect(db.createUser(rest, "password")).rejects.toThrow();
  });
});

describe("getUserByEmail", () => {
  const data = {
    firstname: "Renato",
    lastname: "Pozzi",
    email: "info@renatopozzi.me",
  };

  beforeEach(async () => db.createUser(data, "password"));
  afterEach(async () => prisma.user.deleteMany());

  it("should return corrently an user", async () => {
    const user = await db.getUserByEmail("info@renatopozzi.me");
    expect(typeof user).toBe("object");
    expect(user).toMatchObject({
      firstname: "Renato",
      lastname: "Pozzi",
      email: "info@renatopozzi.me",
    });
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
    expect(verify("password", user.password)).toBe(true);
  });
});

describe("getUserById", () => {
  let user;

  const data = {
    firstname: "Renato",
    lastname: "Pozzi",
    email: "info@renatopozzi.me",
  };

  beforeEach(async () => {
    user = await db.createUser(data, "password");
  });

  afterEach(async () => prisma.user.deleteMany());

  it("should return corrently an user", async () => {
    const obtainedUser = await db.getUserById(user.id);
    expect(typeof obtainedUser).toBe("object");
    expect(obtainedUser).toMatchObject({
      firstname: "Renato",
      lastname: "Pozzi",
      email: "info@renatopozzi.me",
    });
    expect(obtainedUser).toHaveProperty("created_at");
    expect(obtainedUser).toHaveProperty("updated_at");
    expect(verify("password", obtainedUser.password)).toBe(true);
  });
});

describe("updateUser", () => {
  let user;

  const data = {
    firstname: "Renato",
    lastname: "Pozzi",
    email: "info@renatopozzi.me",
  };

  beforeEach(async () => {
    user = await db.createUser(data, "password");
  });

  afterEach(async () => prisma.user.deleteMany());

  it("should update correctly an user", async () => {
    const dataToUpdate = { firstname: "Giovanni", lastname: "Bona" };
    const updatedUser = await db.updateUser(user.id, dataToUpdate);
    expect(typeof updatedUser).toBe("object");
    expect(updatedUser).toMatchObject(dataToUpdate);
    expect(updatedUser).toHaveProperty("created_at");
    expect(updatedUser).toHaveProperty("updated_at");
    expect(verify("password", updatedUser.password)).toBe(true);
  });

  it("should update only the password", async () => {
    const updatedUser = await db.updateUser(user.id, {}, "freschissimo");
    expect(updatedUser).toMatchObject(data);
    expect(verify("freschissimo", updatedUser.password)).toBe(true);
  });
});

describe("createWebsite", () => {
  const data = {
    name: "Photospace",
    url: "www.photospace.com",
    is_public: false,
    user_id: 1,
  };

  it("should create correctly a website", async () => {
    const website = await db.createWebsite(data);
    expect(typeof website).toBe("object");
    expect(website).toMatchObject(data);
    expect(website).toHaveProperty("created_at");
    expect(website).toHaveProperty("updated_at");
  });

  it("should set is_public to false by default", async () => {
    const { is_public, ...rest } = data;
    const website = await db.createWebsite(rest);
    expect(website.is_public).toBe(false);
  });

  it("should throw an exception cuz name is required", async () => {
    const { name, ...rest } = data;
    await expect(db.createWebsite(rest)).rejects.toThrow();
  });

  it("should throw an exception cuz url is required", async () => {
    const { url, ...rest } = data;
    await expect(db.createWebsite(rest)).rejects.toThrow();
  });

  it("should throw an exception cuz user_id is required", async () => {
    const { user_id, ...rest } = data;
    await expect(db.createWebsite(rest)).rejects.toThrow();
  });
});

describe("getWebsiteById", () => {
  let website;
  const data = {
    name: "Photospace",
    url: "www.photospace.com",
    is_public: false,
    user_id: 1,
  };

  beforeEach(async () => {
    website = await db.createWebsite(data);
  });

  it("should obtain correctly a website", async () => {
    const obtainedWebsite = await db.getWebsiteById(website.id);
    expect(typeof obtainedWebsite).toBe("object");
    expect(obtainedWebsite).toMatchObject(data);
    expect(obtainedWebsite).toHaveProperty("created_at");
    expect(obtainedWebsite).toHaveProperty("updated_at");
  });
});

describe("createEvent", () => {
  let website;

  beforeEach(async () => {
    website = await db.createWebsite({
      name: "UseAurora",
      url: "www.useaurora.app",
      is_public: true,
      user_id: 1,
    });
  });

  const data = {
    type: "click",
    element: "/",
    referrer: "https://scoops.github.io/",
    duration: 12.3,
    device: "desktop",
    locale: "en-GB",
  };

  it("should create correctly an event", async () => {
    const event = await db.createEvent({ ...data, website_id: website.id });
    expect(typeof event).toBe("object");
    expect(event).toMatchObject(data);
    expect(event).toHaveProperty("created_at");
    expect(event).toHaveProperty("updated_at");
  });

  it("should set type to pageview by default", async () => {
    const { type, ...rest } = data;
    const event = await db.createEvent({ ...rest, website_id: website.id });
    expect(event.type).toBe("pageview");
  });

  it("should set duration to zero by default", async () => {
    const { duration, ...rest } = data;
    const event = await db.createEvent({ ...rest, website_id: website.id });
    expect(event.duration).toBeCloseTo(0.0);
  });

  it("should set referrer to null by default", async () => {
    const { referrer, ...rest } = data;
    const event = await db.createEvent({ ...rest, website_id: website.id });
    expect(event.referrer).toBe(null);
  });

  it("should throw an exception cuz element is required", async () => {
    const { element, ...rest } = data;
    await expect(db.createEvent(rest)).rejects.toThrow();
  });

  it("should throw an exception cuz device is required", async () => {
    const { device, ...rest } = data;
    await expect(db.createEvent(rest)).rejects.toThrow();
  });

  it("should throw an exception cuz locale is required", async () => {
    const { locale, ...rest } = data;
    await expect(db.createEvent(rest)).rejects.toThrow();
  });
});

describe("getUserWebsites", () => {
  beforeEach(async () => {
    await prisma.website.createMany({
      data: [
        {
          name: "UseAurora",
          url: "www.useaurora.app",
          is_public: true,
          user_id: 1,
        },
        {
          name: "Renato Pozzi",
          url: "www.renatopozzi.me",
          is_public: true,
          user_id: 1,
        },
        {
          name: "Google",
          url: "www.google.com",
          is_public: true,
          user_id: 2,
        },
      ],
    });
  });

  it("should obtain correctly the user websites", async () => {
    const userWebsites = await db.getUserWebsites(1);
    expect(Array.isArray(userWebsites)).toBe(true);
    expect(userWebsites.length).toBe(2);
    expect(userWebsites).toMatchObject(
      userWebsites.filter((el) => el.user_id === 1)
    );
  });
});

describe("getUserWebsite", () => {
  let website;

  beforeEach(async () => {
    website = await db.createWebsite({
      name: "UseAurora",
      url: "www.useaurora.app",
      is_public: true,
      user_id: 1,
    });
  });

  it("should obtain correctly the user website", async () => {
    const userWebsite = await db.getUserWebsite(1, website.id);
    expect(typeof userWebsite).toBe("object");
  });

  it("should return null cuz is now owned by this user", async () => {
    const userWebsite = await db.getUserWebsite(2, website.id);
    expect(userWebsite).toBe(null);
  });
});
