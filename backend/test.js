// require("dotenv").config();
// let jwt = require("jsonwebtoken");
// let token = jwt.sign({ role: "doctor" }, process.env.JWT_SECRET);
// console.log(token);
let chatApi = require("./chatAI/chat_api.js");

let testChatApi = async (i) => {
  let result = await chatApi(`Hello my name is ${i} repeat my name`);
  return result;
};
for (let i = 0; i < 100; i++) {
  console.log(i);
  testChatApi().then((r) => {
    console.log(r);
  });
}
