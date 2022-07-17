require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const CONNECTION_URL = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URL);
const database = mongoose.connection

const app = express();
app.use(express.json());

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3000, () => {
    console.log(`Server Started at ${5000}`)
})