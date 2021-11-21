-- AlterTable
ALTER TABLE "events" ADD COLUMN     "is_new_session" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_new_visitor" BOOLEAN NOT NULL DEFAULT false;
