import db from "../../../lib/db";
import { withAuth } from "../../../lib/middleware/withAuth";

const handler = async (req, res) => {
  const website = await db.getWebsiteById(req.query.wid);

  if (!website) {
    return res.status(404).json({
      message: "Website not found.",
    });
  }

  // TODO: Check if website is public otherwise check if user is owner
  //if (!website.is_public )

  if (req.method === "GET") {
    const filters = { start: req.query.start, end: req.query.end };
    const data = await db.getWebsiteStatistics(req.query.wid, filters);

    return res.status(200).json(data);
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default handler;
