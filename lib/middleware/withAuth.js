import jwt from "jsonwebtoken";
import { parse } from "cookie";
import db from "../db";
import { AUTH_COOKIE } from "../../utils/constants";

const verifyJwt = (accessToken) => {
  try {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

const withAuth = (fn) => async (req, res) => {
  if (Object.keys(req.cookies).length === 0) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const allCookies = req.cookies;

  if (!allCookies.hasOwnProperty(AUTH_COOKIE)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = allCookies[AUTH_COOKIE];
  const userBody = verifyJwt(accessToken);

  if (!userBody) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await db.getUserById(userBody.data.id);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const enhancedReq = { ...req, user: userBody.data };

  return fn(enhancedReq, res);
};

module.exports = { withAuth };
