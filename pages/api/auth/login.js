import Joi from "joi";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import db from "../../../lib/db";
import { AUTH_COOKIE, AUTH_COOKIE_LIFETIME } from "../../../utils/constants";
import { verify } from "../../../utils/hash";
import { formatUser } from "../../../utils/responses";

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const makeJwt = (data) => {
  return jwt.sign({ data: data }, process.env.JWT_SECRET, {
    expiresIn: AUTH_COOKIE_LIFETIME,
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { value, error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: err.message,
      });
    }

    const { email, password } = value;
    const user = await db.getUserByEmail(email);

    if (!user || !verify(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = makeJwt(formatUser(user));

    const cookie = serialize(AUTH_COOKIE, accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      maxAge: AUTH_COOKIE_LIFETIME,
    });

    res.setHeader("Set-Cookie", [cookie]);

    return res.status(200).json({
      accessToken: accessToken,
      user: formatUser(user),
    });
  }

  return res.status(422).json({ message: "Method not allowed" });
}
