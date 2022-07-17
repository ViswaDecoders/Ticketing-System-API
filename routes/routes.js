const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "SeCrEtKeY";
module.exports = router;

//Post Method
router.post("/users/new", (req, res) => {
  username = req.body.username;
  role = req.body.role;
  if (role !== "admin" && role !== "employee") {
    res.status(200).json({ message: "Invalid Role" });
  }
  jwt.sign({ username, role }, secretKey, async (err, token) => {
    if (err) {
      res.status(400).json({ message: error.message });
    }
    const data = new Model({
      username: req.body.username,
      role: req.body.role,
      auth: token,
    });
    try {
      const dataToSave = await data.save();
      console.log(dataToSave);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    res.status(200).json({ Auth_Token: token });
  });
});

router.post("/tickets/new", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
    } else {
      if (authData.user.role === "admin") {
        res.send("Post API");
      } else {
        res.json({ message: "Invalid Access" });
      }
    }
  });
});

router.post("/tickets/markAsClosed", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
    } else {
      if (authData.user.role === "admin" || authData.user.username === "") {
        res.send(req.body.id);
      } else {
        res.json({ message: "Invalid Access" });
      }
    }
  });
});

router.post("/tickets/delete", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).send({ message: "Invalid Token" });
    } else {
      if (authData.user.role === "admin") {
        res.send(req.body.id);
      } else {
        res.json({ message: "Invalid Access" });
      }
    }
  });
});

//Get by ID Method
router.get("/tickets/:param", vertifyToken, (req, res) => {
  if (req.params.param === "all") {
    res.send("Get by all ID API");
  }
  res.send("Nothing");
});

router.get("/tickets/", vertifyToken, (req, res) => {
  if (req.query.status) {
    console.log(req.query.status);
    res.send("Get by status");
  } else if (req.query.title) {
    console.log(req.query.title);
    res.send("Get by title");
  }
  res.send("Nothing");
});

function vertifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send({ message: "Token Missing" });
  }
  res.writeHead(200);
}
