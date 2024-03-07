const express = require("express");
let run = require("../chatAI/chat_api");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("chatBot up and running :)");
});
router.post("/bot1", async (req, res) => {
  try {
    let prompt = req.body.prompt;
    let data = await run(prompt);
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      user: prompt,
      response: data,
    });
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      user: prompt,
      response: "something went wrong 😢",
    });
  }
});
module.exports = router;
