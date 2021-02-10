require("dotenv").config();

const cors = require("cors");

const express = require("express");
require("./db/connect");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//CORS
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
  })
);

//Routes
const expenseRoute = require("./API/expense/expense.routes");
const categoryRoute = require("./API/category/category.routes");
app.use("/expense", expenseRoute);
app.use("/category", categoryRoute);

app.use(errorHandler);
app.listen(port, async () => {
  console.log(`running on port: ${port}`);
});
