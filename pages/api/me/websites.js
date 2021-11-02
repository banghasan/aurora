import db from "../../../lib/db";
import { withAuth } from "../../../lib/middleware/withAuth";
import { formatWebsite } from "../../../utils/responses";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db.getUserWebsites(req.user.id);
    const websites = data.map((website) => formatWebsite(website));

    return res.status(200).json(websites);
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default withAuth(handler);
