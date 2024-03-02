const express = require("express");
let jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
router.get("/", (req, res) => {
  res.send("Auth api up and running :)");
});
router.post("/verify", (req, res) => {
  res.status(200).json({ role: "xyz" });
});
module.exports = router;
