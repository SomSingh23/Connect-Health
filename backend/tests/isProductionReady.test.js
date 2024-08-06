const corsOptions = require("../cors/corsConfig");

test("corsOptions.origin should be correctly set for production", () => {
  const expectedOrigins = [
    "https://connectihealth.vercel.app",
    "https://app.connect-health.xyz",
  ];

  expect(corsOptions.origin).toEqual(expectedOrigins);
});
