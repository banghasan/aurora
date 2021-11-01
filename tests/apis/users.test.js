import { createMocks } from "node-mocks-http";

import handler from "../../pages/api/users";

describe("/api/users", () => {
  it("should return a list of users", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(Array.isArray(res._getJSONData())).toEqual(true);
  });
});
