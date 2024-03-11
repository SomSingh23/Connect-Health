const express = require("express");
let jwt = require("jsonwebtoken");
let User = require("../database/user");
let { v4: uuid } = require("uuid");
const router = express.Router();
require("dotenv").config();
let wait5Second = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 5000);
  });
};
router.get("/", (req, res) => {
  res.send("Auth api up and running :)");
});
router.post("/verify", async (req, res) => {
  try {
    let data = jwt.verify(req.body.token, process.env.JWT_SECRET);
    return res.status(200).json({
      role: data.role,
    });
  } catch (e) {
    return res.status(200).json({
      role: "noRole",
    });
  }
});

router.post("/generateTokenP", async (req, res) => {
  let data = jwt.decode(req.body.token);
  // db calls for first time user and few async tasks
  let token = jwt.sign(
    {
      role: "patient",
      email: data.email,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12 hours  testing phase
    },
    process.env.JWT_SECRET
  );

  let checkPatient = await User.findOne({ email: data.email });
  if (checkPatient === null) {
    console.log("new Patient user");
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let newUser = new User({
      role: "patient",
      email: data.email,
      uuid: uuid(),
      picture: data.picture,
      ip: clientIP,
    });
    await newUser.save();
    return res.status(200).json({ token });
  }
  if (checkPatient.role === "patient") {
    console.log("old user Patient");
    return res.status(200).json({ token });
  }
  return res.status(200).json({
    token: "tokenNotGranted",
  });
});

router.post("/generateTokenD", async (req, res) => {
  let data = jwt.decode(req.body.token);
  let token = jwt.sign(
    {
      role: "doctor",
      email: data.email,
      exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12 hours  testing phase
    },
    process.env.JWT_SECRET
  );
  let checkDoctor = await User.findOne({ email: data.email });
  if (checkDoctor === null) {
    console.log("new Doctor user");
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    let newUser = new User({
      role: "doctor",
      email: data.email,
      uuid: uuid(),
      picture: data.picture,
      ip: clientIP,
    });
    await newUser.save();
    return res.status(200).json({ token });
  }
  if (checkDoctor.role === "doctor") {
    console.log("old user Doctor");
    return res.status(200).json({ token });
  }
  return res.status(200).json({
    token: "tokenNotGranted",
  });
});
module.exports = router;
