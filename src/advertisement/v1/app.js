//Global Req
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//Local Req
const { AdvertisementRoutes, ApplicationRoutes } = require("./routes");
// App
const app = express();

//MiddleWare
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

app.use("/Advertisement", AdvertisementRoutes);
app.use("/applications", ApplicationRoutes);
app.get("/Advertisement/isAlive", (req, res) => {
  console.log("Alive :>> ");
});

const APP_PORT = process.env.APP_PORT || 3010;
app.listen(APP_PORT, () => {
  axios({
    method: "POST",
    url: "http://localhost:3001/apiRegister",
    headers: { "Content-Type": "application/json" },
    data: {
      apiName: "AdvertisementServices",
      protocol: "http",
      host: "localhost",
      port: APP_PORT,
    },
  }).then((result) => {
    console.log(result.data);
  });
});
