require("dotenv").config();
const moongose = require('mongoose');

moongose.connect(process.env.DB_CONNECTION,
    {
      useCreateIndex: true,
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