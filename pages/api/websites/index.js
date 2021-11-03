import Joi from "joi";
import db from "../../../lib/db";
import { withAuth } from "../../../lib/middleware/withAuth";
import { formatWebsite } from "../../../utils/responses";

const schema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  is_public: Joi.boolean().required(),
});

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db.getAllWebsites();
    const websites = data.map((website) => formatWebsite(website));

    return res.status(200).json(websites);
  }

  if (req.method === "POST") {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { name, url, is_public } = value;
    const website = await db.createWebsite({
      name,
      url,
      is_public,
      user_id: req.user.id,
    });

    return res.status(201).json(formatWebsite(website));
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default withAuth(handler);
