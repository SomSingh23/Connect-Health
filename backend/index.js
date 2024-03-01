let express = require("express");
let cors = require("cors");
let app = express();
let patientRoute = require("./routes/patient");
require("dotenv").config();
app.listen(process.env.PORT, () => {
  console.log("Server is running :)");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// starting with my routes
app.use("/api/patient", patientRoute);
