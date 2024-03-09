let express = require("express");
let cors = require("cors");
let app = express();
let mongoose = require("mongoose");
let corsConfig = require("./cors/corsConfig");
let chatRouter = require("./routes/chat");
let autRouter = require("./routes/auth");

require("dotenv").config();
mongoose
  .connect(process.env.MONGO)
  .then((p) => {
    console.log("Successfully connected to the database :D");
  })
  .catch((e) => {
    console.log(e);
    console.log("Error connecting to the database :(");
  });
app.listen(process.env.PORT, () => {
  console.log("Server is running :)");
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log(`${req.url}`);
//   next();
// });

// only for development ☝️
// router
app.use("/api/chat/", chatRouter);
app.use("/api/auth/", autRouter);
// router
app.get("/", (req, res) => {
  res.send("Boss Up and Running :)");
});
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});
