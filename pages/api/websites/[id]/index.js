import Joi from "joi";
import db from "../../../../lib/db";
import { withAuth } from "../../../../lib/middleware/withAuth";
import { formatWebsite } from "../../../../utils/responses";

// TODO: Move to utils
const schema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  description: Joi.string().allow(""), // TODO: Add tests for this
  is_public: Joi.boolean().required(),
});

// TODO: CHANGE PARAMS TO QUERY
const handler = async (req, res) => {
  const data = await db.getUserWebsite(req.user.id, req.query.id);

  if (!data) {
    return res.status(404).json({ message: "Website not found" });
  }

  if (req.method === "GET") {
    return res.status(200).json(formatWebsite(data));
  }

  if (req.method === "PUT") {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { name, url, is_public } = value;
    const website = await db.updateWebsite(req.query.id, {
      name,
      url,
      is_public,
    });

    return res.status(200).json(formatWebsite(website));
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default withAuth(handler);
