require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const CONNECTION_URL = process.env.MONGODB_URI;

mongoose.connect(CONNECTION_URL);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})