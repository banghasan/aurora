import db from "../../../lib/db";

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
    const data = await db.getWebsiteViewsByMetadata(
      req.query.wid,
      req.query.type
    );

    const unique = (el) => el.is_new_visitor;

    const mapped = data.map((el) => {
      return {
        element: el.value,
        views: el.events.length,
        unique: el.events.filter(unique).length,
      };
    });

    return res.status(200).json(mapped);
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default handler;
