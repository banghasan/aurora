const prisma = require("./dbInstance");
const { hash } = require("../utils/hash");

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
  const { email, ...rest } = data; // currently email is not changeable.
  const user = await prisma.user.update({
    where: { id: uid },
    data: {
      ...rest,
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

async function createEvent(data) {
  const event = await prisma.event.create({
    data: { ...data },
  });

  return event;
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

//// TODO: Testing

async function updateWebsite(wid, data) {
  const website = await prisma.website.update({
    where: { id: wid },
    data: { ...data },
  });

  return website;
}

// TODO: delete also website events.
async function deleteWebsite(wid) {
  const website = await prisma.website.delete({
    where: { id: wid },
  });

  return website;
}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  getUserWebsites,
  getUserWebsite,
  getWebsiteById,
  createWebsite,
  updateWebsite,
  deleteWebsite,
  createEvent,
};

// const getWebsiteViewsByBrowser = async (seed, range) => {
//   return dbInstance
//     .knex("events")
//     .select("browsers.name as element")
//     .count("events.id as views")
//     .countDistinct("events.hash as unique")
//     .join("browsers", "events.browser_id", "browsers.id")
//     .join("websites", "events.website_id", "websites.id")
//     .whereRaw(`events.created_at >= DATE_TRUNC('${range}', now())`)
//     .where("events.type", "pageView")
//     .where("websites.seed", seed)
//     .groupBy("browsers.name")
//     .orderBy("views", "desc")
//     .limit(8);
// };

// const getWebsiteViewsByCountry = async (seed, range) => {
//   return dbInstance
//     .knex("events")
//     .select("locales.location as element")
//     .count("element as views")
//     .countDistinct("hash as unique")
//     .join("locales", "events.locale_id", "locales.id")
//     .join("websites", "events.website_id", "websites.id")
//     .whereRaw(`events.created_at >= DATE_TRUNC('${range}', now())`)
//     .where("events.type", "pageView")
//     .where("websites.seed", seed)
//     .groupBy("locales.location")
//     .orderBy("views", "desc")
//     .limit(8);
// };

// const getWebsiteViewsByOs = async (seed, range) => {
//   return dbInstance
//     .knex("events")
//     .select("oses.name as element")
//     .count("events.id as views")
//     .countDistinct("events.hash as unique")
//     .join("oses", "events.os_id", "oses.id")
//     .join("websites", "events.website_id", "websites.id")
//     .whereRaw(`events.created_at >= DATE_TRUNC('${range}', now())`)
//     .where("events.type", "pageView")
//     .where("websites.seed", seed)
//     .groupBy("oses.name")
//     .orderBy("views", "desc")
//     .limit(8);
// };

// const getWebsiteViewsByPage = async (seed, range) => {
//   return dbInstance
//     .knex("events")
//     .select("element")
//     .count("events.id as views")
//     .countDistinct("hash as unique")
//     .join("websites", "events.website_id", "websites.id")
//     .whereRaw(`events.created_at >= DATE_TRUNC('${range}', now())`)
//     .where("events.type", "pageView")
//     .where("websites.seed", seed)
//     .groupBy("element")
//     .orderBy("views", "desc")
//     .limit(8);
// };

// const getWebsiteViewsByReferrer = async (seed, range) => {
//   return dbInstance
//     .knex("events")
//     .select("referrer as element")
//     .count("events.id as views")
//     .countDistinct("hash as unique")
//     .join("websites", "events.website_id", "websites.id")
//     .whereRaw(`events.created_at >= DATE_TRUNC('${range}', now())`)
//     .where("events.type", "pageView")
//     .whereNotNull("referrer")
//     .where("websites.seed", seed)
//     .groupBy("referrer")
//     .orderBy("views", "desc")
//     .limit(8);
// };

// const getWebsiteViewsBySeries = async (seed, range, factor) => {
//   return dbInstance.knex.raw(`
//     SELECT
//       range.generate_series as range,
//       SUM(
//         COALESCE(e.views, 0)
//       ) AS views
//     FROM
//       (
//         SELECT
//           generate_series(
//             date_trunc('${range}', now()),
//             date_trunc('${range}', now()) + '1 ${range}' :: interval - '1 ${factor}' :: interval,
//             '1 ${factor}' :: interval
//           ):: timestamptz
//       ) as range
//       LEFT JOIN (
//         SELECT
//           events.created_at AS day,
//           COUNT(events.id) AS views
//         FROM
//           events
//           JOIN websites on websites.id = events.website_id
//         WHERE
//           websites.seed = '${seed}'
//         AND
//           events.type = 'pageView'
//         GROUP BY
//           day
//       ) AS e ON range.generate_series = date_trunc('${factor}', e.day)
//     GROUP BY
//       range
//     ORDER BY
//       range
//   `);
// };

// const getWebsiteRealtimeVisitors = async (seed) => {
//   return dbInstance
//     .knex("events")
//     .countDistinct("events.hash as visitors")
//     .join("websites", "events.website_id", "websites.id")
//     .whereRaw(`events.created_at >= (now() - '30 second' :: interval)`)
//     .where("events.type", "pageView")
//     .where("websites.seed", seed);
// };

// const getWebsitePerformance = async (seed, range) => {
//   return dbInstance.knex.raw(`
//     SELECT
//       COUNT(events.created_at) as cp_views,
//       COUNT(DISTINCT events.hash) as cp_unique,
//       AVG(events.duration) as cp_visit_duration,
//       (
//         select
//           COALESCE(sum(t.c), 0)
//         from
//           (
//             select
//               count(events.id) as c
//             from
//               events
//             JOIN websites ON events.website_id = websites.id
//             WHERE
//               events.created_at >= DATE_TRUNC('${range}', now())
//               AND websites.seed = '${seed}'
//               AND events.type = 'pageView'
//             group by
//               hash
//             having
//               count(events.id) = 1
//           ) as t
//       ) as cp_bounces
//     FROM
//       events
//       JOIN websites ON events.website_id = websites.id
//     WHERE
//       events.created_at >= DATE_TRUNC('${range}', now())
//       AND websites.seed = '${seed}'
//       AND events.type = 'pageView'
//   `);
// };

// module.exports = {
//   getAllBrowsers,
//   getAllUsers,
//   getAllWebsites,
//   getUserByEmail,
//   getUserWebsites,
//   getUserWebsite,
//   createUser,
//   createSetting,
//   createUserWebsite,
//   updateUser,
//   updateUserWebsite,
//   deleteUserWebsite,
//   getWebsiteBySeed,
//   getWebsiteViewsByBrowser,
//   getWebsiteViewsByCountry,
//   getWebsiteViewsByOs,
//   getWebsiteViewsByPage,
//   getWebsiteViewsByReferrer,
//   getWebsiteViewsBySeries,
//   getWebsiteRealtimeVisitors,
//   getWebsitePerformance,
// };
