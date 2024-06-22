import { MongoClient } from "mongodb";
const express = require("express");
const body = require("body-parser");
const cors = require("cors");

const start = async () => {
  try {
    const app = express();

    // Enable CORS
    app.use(cors());

    const mongo = await MongoClient.connect(
      "mongodb://localhost:27017/CRM_API"
    );

    await mongo.connect();

    app.db = mongo.db();

    //body parser
    app.use(
      body.json({
        limit: "500kb",
      })
    );

    //routes
    app.use("/customers", require("./routes/customers"));

    //start server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
