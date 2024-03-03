const express = require("express");
const router = express.Router();
const User = require("../database/user");
router.get("/", (req, res) => {
  res.send("Data Route up and running :)");
});
router.get("/general", async (req, res) => {
  try {
    let patients = await User.find({ role: "patient" });
    let doctors = await User.find({ role: "doctor" });

    return res.status(200).json({
      patients: patients.length,
      doctors: doctors.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;
