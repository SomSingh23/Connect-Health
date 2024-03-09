const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
require("dotenv").config();

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const genAI2 = new GoogleGenerativeAI(process.env.API_KEY2);
const ifFail = async (_input) => {
  try {
    console.log("Run function Failed");
    const model = genAI2.getGenerativeModel({
      model: process.env.MODEL_NAME2,
      safetySettings,
    });

    const prompt = _input;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    console.log("Run function Backup also Failed");
    console.log(err.message);
    return "Something Went Wrong :(";
  }
};
async function run(_input) {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.MODEL_NAME,
      safetySettings,
    });

    const prompt = _input;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    let final = await ifFail(_input);
    return final;
  }
}

module.exports = run;
