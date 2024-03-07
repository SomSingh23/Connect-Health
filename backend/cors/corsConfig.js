var corsOptions = {
  // origin: "http://localhost:5173", // development
  origin: "https://alpine-frontend-hackiniiitp.vercel.app", // production
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
module.exports = corsOptions;
