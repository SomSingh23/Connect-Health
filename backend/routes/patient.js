const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  console.log("Req Received Patient Route");
  res.send("Welcome to the patient route");
});

router.post("/register", async (req, res) => {
  // will be implemented later, mainly dealing with db and welcome email :)

  let token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 8 * 24 * 60 * 60, // 8 days
      role: "patient",
      email: req.body.email,
    },
    process.env.JWT_SECRET
  );
  res.status(200).json({
    token,
  });
});

router.post("/verify", (req, res) => {
  try {
    console.log(req.body.token);
    var decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    return res.status(200).json({
      role: decoded.role,
    });
  } catch (err) {
    // err
    return res.status(401).json({
      message: "Invalid token",
    });
  }
});

module.exports = router;
