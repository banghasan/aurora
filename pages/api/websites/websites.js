import Joi from "joi";
import db from "../../../lib/db";

const schema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().hostname(),
  is_public: Joi.boolean().required(),
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    //
  }

  if (req.method === "POST") {
    //
  }

  return res.status(422).json({ message: "Method not allowed" });
}
