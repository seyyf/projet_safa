var express = require("express");
var router = express.Router();
const Category = require("../models/category.model");
require('dotenv').config();


router.get("/", async function (req, res, next) {
  try {
    const categorys = await Category.find();
    res.json(categorys);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:category_id", async function (req, res, next) {
  try {
    const category = await Category.findById(req.params.category_id);
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name } = req.body
    const category = new Category({
      name: name,
    });

    const createdCategory = await category.save();
    res.json(createdCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:category_id", async function (req, res, next) {
  try {
    const { name } = req.body
  
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.category_id },
      { $set: { name : name } },
      { new: true, useFindAndModify: false});

    res.json(updatedCategory);

  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:category_id", async function (req, res, next) {
  try {

    const removedCategory = await Category.remove({_id: req.params.category_id});
    res.json(removedCategory);

  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
