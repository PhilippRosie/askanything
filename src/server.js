const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

// Set up the server

const app = express();

app.use(bodyParser.json());

app.use(cors());

// Set up the ChatGPT endpoint

const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2048,
  });

  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST"); // Allow GET and POST requests
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Allow specified headers

  res.send(completion.data.choices[0].text);
});

// Start the server

const port = 5555;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
