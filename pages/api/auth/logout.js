import { serialize } from "cookie";
import { AUTH_COOKIE } from "../../../utils/constants";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cookie = serialize(AUTH_COOKIE, null, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      maxAge: -1,
    });

    res.setHeader("Set-Cookie", [cookie]);

    return res.status(200).json({
      message: "Logged out successfully",
    });
  }

  return res.status(422).json({ message: "Method not allowed" });
}
