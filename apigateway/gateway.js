const express = require("express");
const app = express();
const helmet = require("helmet");
const routes = require("./routes");
const cors = require("cors");
const PORT = 3001;
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/", routes);

app.listen(PORT, (req, res) => {
  console.log("Gate has open PORT: " + PORT);
});
