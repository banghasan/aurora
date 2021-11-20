const prisma = require("./dbInstance");
const { hash } = require("../utils/hash");

export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function getAllWebsites() {
  const websites = await prisma.website.findMany();

  return websites;
}

export async function createUser(data, pw) {
  const hashedPw = hash(pw);
  const user = await prisma.user.create({
    data: { ...data, password: hashedPw },
  });

  return user;
}

export async function getUserById(uid) {
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  return user;
}

export async function getWebsiteById(wid) {
  const website = await prisma.website.findUnique({
    where: {
      id: wid,
    },
  });

  return website;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function updateUser(uid, data = {}, newPw = null) {
  const user = await prisma.user.update({
    where: { id: uid },
    data: {
      ...data,
      ...(newPw && { password: hash(newPw) }),
    },
  });

  return user;
}

export async function createWebsite(data) {
  const website = await prisma.website.create({
    data: { ...data },
  });

  return website;
}

export async function getUserWebsites(uid) {
  const websites = await prisma.website.findMany({
    where: {
      user_id: uid,
    },
  });

  return websites;
}

export async function getUserWebsite(uid, wid) {
  const website = await prisma.website.findFirst({
    where: {
      id: wid,
      user_id: uid,
    },
  });

  return website;
}

export async function updateWebsite(wid, data) {
  const website = await prisma.website.update({
    where: { id: wid },
    data: { ...data },
  });

  return website;
}

export async function deleteWebsite(wid) {
  const website = await prisma.website.delete({
    where: { id: wid },
  });

  // Also website events deleted.
  const events = await prisma.event.deleteMany({
    where: { website_id: wid },
  });

  return website;
}
