require("dotenv").config();
let jwt = require("jsonwebtoken");
let token = jwt.sign({ role: "doctor" }, process.env.JWT_SECRET);
console.log(token);
