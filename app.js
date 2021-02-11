const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/auth");

require("dotenv").config();
require("./db/connect");



const app = express();
const port = process.env.PORT || 3000;


//Bodyparser
app.use(express.json());

//CORS
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
  })
);

//Cookie-Parser
app.use(cookieParser());

//Routes
const expenseRoute = require("./API/expense/expense.routes");
const categoryRoute = require("./API/category/category.routes");
const authRoute = require("./API/authentication/auth.routes");

app.use("/expenses", authMiddleware.authenticateToken, expenseRoute);
app.use("/categories", categoryRoute);
app.use("/auth", authRoute);

app.get("/loggedin", async (req, res) => {
  res.send("Logged In Successfully.")
})
app.use(errorHandler);
app.listen(port, async () => {
  console.log(`running on port: ${port}`);
});
