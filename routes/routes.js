const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = "SeCrEtKeY";
module.exports = router;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

router.get("/", (req, res) => {
    res.status(200).send("Welcome to Ticket API");
});

router.post("/users/new", (req, res) => {
  username = req.body.username;
  role = req.body.role;
  if (role !== "admin" && role !== "employee") {
    res.status(200).json({ message: "Invalid Role" });
  }
  reg_collection.find({ username: username }).toArray(function (err, result) {
    if (err) res.status(500).json({ message: err });
    if (result.length > 0) {
      res
        .status(500)
        .json({ message: "Duplicate user exists, Create New One" });
    } else {
      jwt.sign({ username, role }, secretKey, (err, token) => {
        if (err) {
          res.status(400).json({ message: err.message });
        }
        const data = {
          username: username,
          role: role,
          auth: token,
        };
        reg_collection.insertOne(data, (err, result) => {
          if (err) {
            res.status(500).json({ message: err });
          }
          console.log(result.acknowledged);
          console.log("Document inserted successfully");
        });
        res.status(200).json({ Auth_Token: token });
      });
    }
  });
});

router.post("/tickets/new", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      return res.status(401).send({ message: "Invalid Token" });
    } else {
      if (authData.role === "admin") {
        reg_collection
          .find({ role: "employee" })
          .toArray(function (err, result) {
            if (err) return res.status(500).json({ message: err });
            user = result[Math.floor(Math.random() * result.length)].username;
            id = getRndInteger(0, 1000);
            const data = {
              id: id,
              title: req.body.title,
              status: "open",
              assignedTo: user,
              createdAt: new Date().toLocaleString(),
            };
            ticket_collection.insertOne(data, (err, result) => {
              if (err) {
                return res.status(500).json({ message: err });
              }
              console.log(result.acknowledged);
              console.log("Ticket raised was inserted successfully");
            });
            res.status(200).json({ Id: id });
          });
      } else {
        res.json({ message: "Invalid Access" });
      }
    }
  });
});

router.post("/tickets/markAsClosed", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      ticket_collection
        .find({ id: req.body.ticketID })
        .toArray(function (err, result) {
          if (err) res.status(500).json({ message: err });
          if (result.length !== 0) {
            if (
              authData.role === "admin" ||
              authData.username === result[0].username
            ) {
              ticket_collection.updateOne(
                { id: req.body.ticketID },
                { $set: { status: "close" } },
                function (err, result) {
                  if (err) {
                    res.status(500).json({ message: err });
                  }
                  console.log(result);
                  if (result.deletedCount !== 0) {
                    console.log("document deleted");
                    res.status(200).json({ message: "Ticket Deleted" });
                  }
                }
              );
            } else {
              res.json({ message: "Invalid Access" });
            }
          } else {
            res.status(200).json({ message: "Invalid TicketID" });
          }
        });
    }
  });
});

router.post("/tickets/delete", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      if (authData.role === "admin") {
        ticket_collection.deleteOne(
          { id: req.body.ticketID },
          (err, result) => {
            if (err) {
              res.status(500).json({ message: err });
            }
            if (result.deletedCount !== 0) {
              console.log(result);
              console.log("document deleted");
              res.status(200).json({ message: "Ticket Deleted" });
            } else {
              res.status(200).json({ message: "Invalid TicketID" });
            }
          }
        );
      } else {
        res.json({ message: "Invalid Access" });
      }
    }
  });
});

//Get by ID Method
router.get("/tickets/:param", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      if (req.params.param === "all") {
        ticket_collection.find({}).toArray((err, result) => {
          if (err) {
            return res.status(500).json({ message: err });
          }
          console.log("All collection data sent");
          res.status(200).json(result);
        });
      } else {
        res.status(500).json({ message: "Invalid URL" });
      }
    }
  });
});

router.get("/tickets/", vertifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      if (req.query.status) {
        ticket_collection
          .find({ status: req.query.status })
          .toArray(function (err, result) {
            if (err) {
              return res.status(500).json({ message: err });
            }
            console.log("All status collection data sent");
            res.status(200).json(result);
          });
      } else if (req.query.title) {
        ticket_collection
          .find({ title: req.query.title })
          .toArray(function (err, result) {
            if (err) {
              return res.status(500).json({ message: err });
            }
            console.log("All status collection data sent");
            res.status(200).json(result);
          });
      }
    }
  });
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
}
