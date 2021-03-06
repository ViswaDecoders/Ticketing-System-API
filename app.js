require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const MongoClient = require("mongodb").MongoClient; // database
const CONNECTION_URL = process.env.MONGODB_URI;
const DATABASE_NAME = "ticketingDB";

const routes = require("./routes/routes");

const app = express();
app.use(express.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("common", { stream: accessLogStream }));

app.locals.database, app.locals.reg_collection, app.locals.ticket_collection;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        console.log("message: ",err);
      }
      database = client.db(DATABASE_NAME);
      reg_collection = database.collection("registration");
      ticket_collection = database.collection("tickets");
      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});

app.use("/", routes);
