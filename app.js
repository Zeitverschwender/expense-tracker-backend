require("dotenv").config();
const express = require("express");
require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json())

//Routes
const expenseRoute = require("./API/expense/expense.routes");

app.use("/expense", expenseRoute);

app.listen(port, async () => {
  console.log(`running on port: ${port}`);
});
