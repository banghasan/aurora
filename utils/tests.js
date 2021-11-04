import { createMocks } from "node-mocks-http";
import { parse, serialize } from "cookie";
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
    const serializedCookie = serialize(AUTH_COOKIE, accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      maxAge: 60,
    });

    // Workaround for pass cookie as an object.
    const cookie = parse(serializedCookie);

    return { ...user, cookie };
  }
}
