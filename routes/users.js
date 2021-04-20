var express = require("express");
require('dotenv').config();

var router = express.Router();
const User = require("../models/user.model");

router.put("/:user_id", async function (req, res, next) {
  try {
    let user = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: user },
      { new: true, useFindAndModify: false }
    );

    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
