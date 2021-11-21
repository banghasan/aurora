import { dropProtocol } from "../../utils/urls";

describe("Testing Url dropProtocoling works", () => {
  it("testing with correct protocols", () => {
    expect(dropProtocol("https://google.com/")).toBe("google.com");
    expect(dropProtocol("https://www.google.com/")).toBe("google.com");
    expect(dropProtocol("www.google.com")).toBe("google.com");
    expect(dropProtocol("http://facebook.com")).toBe("facebook.com");
    expect(dropProtocol("http://www.facebook.com")).toBe("facebook.com");
    expect(dropProtocol("www.facebook.com")).toBe("facebook.com");
    expect(dropProtocol("ht://nosense.com")).toBe("nosense.com");
    expect(dropProtocol("//nosense.com")).toBe("nosense.com");
  });

  it("testing with incorrect protocols", () => {
    expect(dropProtocol("ht://nosense.com")).toBe("nosense.com");
    expect(dropProtocol("ht://www.nosense.com")).toBe("nosense.com");
    expect(dropProtocol("//nosense.com")).toBe("nosense.com");
    expect(dropProtocol("//www.nosense.com")).toBe("nosense.com");
  });

  it("testing without syntax correct protocols", () => {
    expect(dropProtocol("http:/wrong.com")).toBe("http:/wrong.com");
    expect(dropProtocol("http:nosense.com")).toBe("http:nosense.com");
  });
});
