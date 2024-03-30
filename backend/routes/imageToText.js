const express = require("express");
let { v4: uuid } = require("uuid");
const run = require("../chatAI/chat_api");
require("dotenv").config();
const router = express.Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create a new Textract instance
const textract = new AWS.Textract();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: (req, file, cb) => {
    let newUUID = uuid();
    req.fileUUID = newUUID;
    // let x = `${newUUID}-${file.originalname}`;
    // console.log(x);
    // const fileExtension = path.extname(file.originalname).toLowerCase();
    // console.log(fileExtension);
    cb(null, `${newUUID}-${file.originalname}`);
  },
});
router.use(express.static(path.join(__dirname, "public")));
router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/", (req, res) => {
  res.send("Image to Text api up and running :)");
});

const fileFilter = (req, file, cb) => {
  try {
    // will add more in future :)
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG,JPG and  PNG files are allowed!"), false);
    }
  } catch (err) {
    console.log(err);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/textract", upload.single("uploaded_files"), async (req, res) => {
  console.log("Heavy lifting in progress...");

  try {
    console.log(`${req.fileUUID}-${req.file.originalname}`);
    let fullPath = `${req.fileUUID}-${req.file.originalname}`;

    // console.log(fullPath);
    const fileBuffer = fs.readFileSync(fullPath);

    const params = {
      Document: {
        Bytes: fileBuffer,
      },
    };
    const data = await textract.detectDocumentText(params).promise();

    const summaryReport = data.Blocks.filter(
      (block) => block.BlockType === "LINE"
    ).map((block) => block.Text);

    let promptValue =
      "Derive a conclusion out of these keywords and also provide a summary.";
    summaryReport.forEach((item) => {
      promptValue += item;
    });
    let summaryData = await run(promptValue);
    // console.log(summaryData);
    return res.status(200).send({
      summaryData,
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(200).send({
      summaryData:
        "Sorry, I am unable to extract text from the image. Please try again.",
    });
  }
});

module.exports = router;
