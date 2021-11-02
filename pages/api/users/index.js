import Joi from "joi";
import db from "../../../lib/db";
import { withAuth } from "../../../lib/middleware/withAuth";
import { formatUser } from "../../../utils/responses";

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
    .external(async (value, helper) => {
      const user = await db.getUserByEmail(value);

      if (user) {
        throw new Error("Email already taken");
      }
    }),
  password: Joi.string().min(8).required(), // TODO: add password validation
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const handler = async (req, res) => {
  if (req.method === "GET") {
    const data = await db.getAllUsers();
    const users = data.map((user) => formatUser(user));

    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    let value;

    try {
      value = await schema.validateAsync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    const { firstname, lastname, email, password } = value;
    const user = await db.createUser({ firstname, lastname, email }, password);

    return res.status(201).json(formatUser(user));
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default withAuth(handler);
