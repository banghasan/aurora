import Joi from "joi";
import db from "../../../../lib/db";
import { withAuth } from "../../../../lib/middleware/withAuth";
import { formatUser } from "../../../../utils/responses";

const schema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
    .external(async (value, { prefs }) => {
      const id = prefs.context.id;
      const user = await db.getUserByEmail(value);

      if (user && user.id !== id) {
        throw new Error("Email already taken");
      }
    }),
  password: Joi.string().min(8), // TODO: add password validation
  confirmPassword: Joi.string().valid(Joi.ref("password")),
});

const handler = async (req, res) => {
  const uid = req.params.id;
  const data = await db.getUserById(uid);

  if (!data) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (req.method === "GET") {
    return res.status(200).json(formatUser(data));
  }

  if (req.method === "PUT") {
    let value;

    try {
      value = await schema.validateAsync(req.body, {
        abortEarly: false,
        context: { id: uid },
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    const { firstname, lastname, email, password } = value;
    const user = await db.updateUser(
      uid,
      { firstname, lastname, email },
      password
    );

    return res.status(200).json(formatUser(user));
  }

  return res.status(422).json({ message: "Method not allowed" });
};

export default withAuth(handler);
