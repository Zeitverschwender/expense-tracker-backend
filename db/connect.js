require("dotenv").config();
const moongose = require('mongoose');
console.log(process.env.DB_CONNECTION)
moongose.connect(process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(`Failed to Connect to MongoDB. Error: ${err}`);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );