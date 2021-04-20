var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
require('dotenv').config();


router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username, password: password });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/register", async function (req, res, next) {
  try {
    console.log(req.body)
    const user = req.body;
    const exist = await User.findOne({ username: user.username }).count();
    if (exist) {
      res.json({ message: "username already exist" });
    } else {
      user.role = "ROLE_USER"
      const userAdded = await User.create(user);
      res.json(userAdded);
    }
  
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
