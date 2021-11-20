const prisma = require("./dbInstance");
const users = require("../mocks/users.json");
const websites = require("../mocks/websites.json");

async function resetDB() {
  console.log("Truncating tables...");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "websites" RESTART IDENTITY`);
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "events" RESTART IDENTITY CASCADE`
  );
  console.log("Truncating tables... done");
}

(async () => {
  await resetDB();

  console.log("Seeding database...");
  await prisma.user.createMany({ data: users });
  await prisma.website.createMany({ data: websites });
  console.log("Seeing database... done");
})();
