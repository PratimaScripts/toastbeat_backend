var express = require('express');
let users = express.Router();
const User = require("../models/user");
let uuid = require("uuid")

var user = [
  {
    email: 'abc@gmail.com', password: 'password'
  }
]
//whhy 2 ??  one i followed a tutorial.. one i did mistakenly 

/* GET home page. */
users.get('/', function(req, res, next) {
  res.send("Welcome to the backend server");
});

users.post('/login', function(req, res){
  if(user.email !== req.email){
    res.status(401).json({status: "Access Denied"})
  }
  if(user.password !== req.pass){
    res.status(401).json({status: "Access Denied"})
  }
  res.status(200).json({status: "Success", token: uuid.v4()})
  
})


// Register New Users
users.post("/register", (req, res) => {
  const userData = {
    insID: "",
    email: req.body.email,
    phone: req.body.phone,
    uname: req.body.uname,
    password: req.body.password,
  };

  User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { uname: req.body.uname }],
      //SELECT * FROM post WHERE email = req.body.email OR uname = req.body.uname;
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          userData.insID = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
          Institute.create(userData)
            .then((user) => {
              const userInfo = `
              <p>You have successfully registered to the Classroom Webstack</p>
              <h3>Registration Details</h3>
              <ul>
                  <li>Email: ${userData.email}</li>
                  <li>Institute ID: ${userData.uname}</li>    
                  <li>Phone: ${userData.phone}</li>          
              </ul>
              <h3>Message</h3>
              <p>Thanks for registering with us</p>
              `;

              // sendMail(userInfo, user.email, "Successfully Confirmed");

              res.json({ status: user.email + " Registered." });
            })
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = users;
