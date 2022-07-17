require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const CONNECTION_URL = process.env.MONGODB_URI;
const routes = require("./routes/routes");

mongoose.connect(CONNECTION_URL);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(express.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("common", { stream: accessLogStream }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});

app.use("/", routes);