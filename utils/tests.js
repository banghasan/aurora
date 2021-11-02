import { createMocks } from "node-mocks-http";
import { serialize } from "cookie";
import { AUTH_COOKIE } from "./constants";
import handler from "../pages/api/auth/login";

export class AuthTest {
  async getCookie(email = "firstuser@example.com", password = "password") {
    const { cookie } = await this.signIn(email, password);

    return cookie;
  }

  async signIn(email = "firstuser@example.com", password = "password") {
    const { req, res } = createMocks({
      method: "POST",
      body: { email, password },
    });

    await handler(req, res);

    const { accessToken, user } = res._getJSONData();
    const cookie = serialize(AUTH_COOKIE, accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      maxAge: 60,
    });

    return { ...user, cookie };
  }
}
