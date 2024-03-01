require("dotenv").config();
let jwt = require("jsonwebtoken");
let token = jwt.sign({ role: "xyz" }, process.env.JWT_SECRET);
console.log(token);
