const prisma = require("./dbInstance");
const { hash } = require("../utils/hash");
const { data } = require("autoprefixer");

async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}

async function getAllWebsites() {
  const websites = await prisma.website.findMany();

  return websites;
}

async function createUser(data, pw) {
  const hashedPw = hash(pw);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPw },
  });

  return user;
}

async function getUserById(uid) {
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  return user;
}

async function getWebsiteById(wid) {
  const website = await prisma.website.findUnique({
    where: {
      id: wid,
    },
  });

  return website;
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

async function updateUser(uid, data = {}, newPw = null) {
  const user = await prisma.user.update({
    where: { id: uid },
    data: {
      ...data,
      ...(newPw && { password: hash(newPw) }),
    },
  });

  return user;
}

async function createWebsite(data) {
  const website = await prisma.website.create({
    data: { ...data },
  });

  return website;
}

async function getUserWebsites(uid) {
  const websites = await prisma.website.findMany({
    where: {
      user_id: uid,
    },
  });

  return websites;
}

async function getUserWebsite(uid, wid) {
  const website = await prisma.website.findFirst({
    where: {
      id: wid,
      user_id: uid,
    },
  });

  return website;
}

async function updateWebsite(wid, data) {
  const website = await prisma.website.update({
    where: { id: wid },
    data: { ...data },
  });

  return website;
}

async function deleteWebsite(wid) {
  const website = await prisma.website.delete({
    where: { id: wid },
  });

  // Also website events deleted.
  const events = await prisma.event.deleteMany({
    where: { website_id: wid },
  });

  return website;
}

async function getUniqueWebsiteMetadata(wid, metadata) {
  const data = await prisma.metadata.findMany({
    where: {
      type: metadata,
      events: {
        some: {
          website_id: wid,
        },
      },
    },
  });

  return data;
}

async function getWebsiteViewsByMetadata(wid, metadata) {
  const data = await prisma.metadata.findMany({
    include: {
      events: {
        where: {
          website_id: wid,
        },
      },
    },
    where: {
      type: metadata,
      events: {
        some: {
          website_id: wid,
        },
      },
    },
  });

  return data;
}

async function getWebsiteStatistics(wid, filters = null) {
  if (!filters) {
    filters = {
      start: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      end: new Date(),
    };
  }

  const avgDuration = await prisma.event.aggregate({
    _avg: {
      duration: true,
    },
    where: {
      website_id: wid,
      created_at: {
        gte: filters.start,
        lt: filters.end,
      },
    },
  });

  const visits = await prisma.event.aggregate({
    _count: {
      _all: true,
    },
    where: {
      website_id: wid,
      created_at: {
        gte: filters.start,
        lt: filters.end,
      },
    },
  });

  const sessions = await prisma.event.aggregate({
    _count: {
      _all: true,
    },
    where: {
      website_id: wid,
      is_new_session: true,
      created_at: {
        gte: filters.start,
        lt: filters.end,
      },
    },
  });

  const uniqueVisits = await prisma.event.aggregate({
    _count: {
      _all: true,
    },
    where: {
      website_id: wid,
      is_new_visitor: true,
      created_at: {
        gte: filters.start,
        lt: filters.end,
      },
    },
  });

  const bounces = await prisma.event.aggregate({
    _count: {
      _all: true,
    },
    where: {
      website_id: wid,
      is_a_bounce: true,
      created_at: {
        gte: filters.start,
        lt: filters.end,
      },
    },
  });

  return {
    visits,
    bounces,
    sessions,
    avgDuration,
    uniqueVisits,
  };
}

// Useful for events
module.exports = {
  getAllUsers,
  getAllWebsites,
  createUser,
  getUserById,
  getWebsiteById,
  getUserByEmail,
  updateUser,
  createWebsite,
  getUserWebsites,
  getUserWebsite,
  updateWebsite,
  deleteWebsite,
  getUniqueWebsiteMetadata,
  getWebsiteViewsByMetadata,
  getWebsiteStatistics,
};
