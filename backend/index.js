let express = require("express");
let cors = require("cors");
let app = express();
let chatRouter = require("./routes/chat");
require("dotenv").config();
app.listen(process.env.PORT, () => {
  console.log("Server is running :)");
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// router
app.use("/api/chat", chatRouter);
// router
app.get("/", (req, res) => {
  res.send("Boss Up and Running :)");
});
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});
