var express = require('express');
var users = express.Router();

const User = require("../models/user");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/* GET users listing. */
users.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Login Users
users.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(
            {
              id: user.user_uuid
            },
            process.env.APP_SECRET,
            {
              expiresIn: 86400,
            }
          );
          res.send({ token, cuisine: user.cuisine });
        } else {
          res.status(403).json({ error: "Wrong Credentials" });
        }
      } else {
        res.status(400).json({ error: "User does not exists" });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

// Register New Users
users.post("/register", (req, res) => {
  const userData = {
    user_uuid: "",
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cuisine: req.body.cuisine
  };

  User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      //SELECT * FROM tbl_user WHERE email = req.body.email OR username = req.body.username;
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          userData.user_uuid = uuid.v4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
          User.create(userData)
            .then((user) => {
              res.json({ status: user.email + " Registered." });
            })
            .catch((err) => {
              console.log("**error")
              res.status(403).json(err);
            });
        });
      } else {
        res.status(403).json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = users;
