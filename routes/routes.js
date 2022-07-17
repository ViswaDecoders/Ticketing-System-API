const express = require("express");
const router = express.Router();
const morgan = require("morgan");

module.exports = router;

//Post Method
router.post("/users/new", (req, res) => {
  res.send("Post API");
});

router.post("/tickets/new", (req, res) => {
  res.send("Post API");
});

router.post("/tickets/markAsClosed", (req, res) => {
  res.send("Post API");
});

router.post("/tickets/delete", (req, res) => {
  res.send("Post API");
});

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/tickets/:id", (req, res) => {
  res.send("Get by ID API");
});
