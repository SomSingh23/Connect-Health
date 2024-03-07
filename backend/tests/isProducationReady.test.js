const configModule = require("../cors/corsConfig");

describe("Checking CORS for deployed fronted", () => {
  test("is cors allowed to producation backend ", () => {
    if (
      configModule.origin !== "https://alpine-frontend-hackiniiitp.vercel.app"
    ) {
      throw new Error("Production Backend Url is wrong!");
    }
  });
});
