const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");
const OpenAI = require("openai");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).json({
      bot: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.listen(4000, () => console.log("Server started at localhost:4000"));
