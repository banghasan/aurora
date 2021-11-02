import Joi from "joi";
import db from "../../lib/db";
import { formatUser } from "../../utils/responses";
import prisma from "../../lib/dbInstance";

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

const checkSetupIsNeeded = async () => {
  const count = await prisma.user.count();
  return count < 1;
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const needsSetup = await checkSetupIsNeeded();

    if (needsSetup) {
      return res.json({ message: "Setup not completed" });
    } else {
      return res.status(400).json({ message: "Setup already completed" });
    }
  }

  if (req.method === "POST") {
    const needsSetup = await checkSetupIsNeeded();

    if (!needsSetup) {
      return res.status(400).json({
        message: "There is already a user in the database",
      });
    }

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
}
