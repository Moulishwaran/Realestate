const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");
const propertyController = require("./controllers/propertyController");
const uploadController = require("./controllers/UploadController");
const app = express();

// mongodb Connect
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch(() => {
    console.log("Mongodb Connection Failed");
  });

app.use("/images", express.static("public/images"));

// routes & middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authController);
app.use("/property", propertyController);
app.use("/upload", uploadController);

//starting server
app.listen(process.env.PORT, () =>
  console.log("Server is started Successfully")
);
