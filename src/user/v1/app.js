const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const mongoose = require("mongoose");
const { RegistryRoutes, UserRoutes } = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// * Connect to db
// TODO: MONGO için user and password ekle
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

const APP_PORT = process.env.APP_PORT || 3002;
app.use("/Registries", RegistryRoutes);
app.use("/Users", UserRoutes);

app.listen(APP_PORT, () => {
  axios({
    method: "POST",
    url: "http://localhost:3001/apiRegister",
    headers: { "Content-Type": "application/json" },
    data: {
      apiName: "UserServices",
      protocol: "http",
      host: "localhost",
      port: APP_PORT,
    },
  }).then((result) => {
    console.log(result.data);
  });
});
