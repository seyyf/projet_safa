var express = require('express');
require('dotenv').config();

var router = express.Router();
const SubCategory = require('../models/subCategory.model');
const Category = require("../models/category.model");


router.get('/', async function(req, res, next) {
  try {
    const subcategorys = await SubCategory.find().populate('category');
    res.json(subcategorys)
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:subcategory_id', async function(req, res, next) {
  try {
    const subcategory = await SubCategory.findById(req.params.subcategory_id).populate('category');
    res.json(subcategory)
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/category/:category_id', async function(req, res, next) {
  try {
    const subcategory = await SubCategory.find({ category : req.params.category_id });
    res.json(subcategory)
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name, category } = req.body

    const subcategory = new SubCategory({
      name: name,
      category: await Category.findById(category)
    });

    const createdSubCategory = await subcategory.save();
    res.json(createdSubCategory);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:subcategory_id", async function (req, res, next) {

  const { category } = req.body

  try {
    let subcategory = req.body
    subcategory.category = await Category.findById(category)

    const updatedSubCategory = await SubCategory.findOneAndUpdate(
      { _id: req.params.subcategory_id },
      { $set: subcategory },
      { new: true, useFindAndModify: false});

    res.json(updatedSubCategory);

  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:subcategory_id", async function (req, res, next) {
  try {

    const removedSubCategory = await SubCategory.remove({_id: req.params.subcategory_id});
    res.json(removedSubCategory);

  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
