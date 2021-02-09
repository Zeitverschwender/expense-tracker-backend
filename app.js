require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`running on port: ${port}`);
});
