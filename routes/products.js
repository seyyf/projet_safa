var express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const { db } = require("../models/product.model");
var router = express.Router();
const Product = require("../models/product.model");
const SubCategory = require("../models/subCategory.model");
const Commande = require("../models/commande.model");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.get("/", async function (req, res, next) {
  try {
    const products = await Product.find().populate({
      path: "subCategory",
      populate: {
        path: "category",
      },
    });
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/random", async function (req, res, next) {
  try {
    Product.aggregate(
      [{ $sample: { size: 5 } }],
      function (err, products) {
        res.json(products);
      }
    );

  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:product_id", async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.product_id).populate(
      "subCategory"
    );
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/category/:category_id", async function (req, res, next) {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "subCategorys",
        localField: "subCategory",
        foreignField: "_id",
        as: "subCategory",
      },
    },
    { $unwind: { path: "$subCategory" } },
    {
      $match: {
        "subCategory.category": mongoose.Types.ObjectId(req.params.category_id),
      },
    },
  ]);

  res.json(products);
});

router.get("/subcategory/:subcategory_id", async function (req, res, next) {
  const products = await Product.find({
    subCategory: req.params.subcategory_id,
  });
  res.json(products);
});

router.post("/", upload.single("file"), async function (req, res, next) {
  try {
    let product = JSON.parse(req.body.product);
    product.img = req.file.filename;

    product.subCategory = await SubCategory.findById(product.subCategory);

    const createdProduct = await Product.create(product);

    res.json(createdProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/", upload.single("file"), async function (req, res, next) {
  try {
    let product = JSON.parse(req.body.product);
    product.subCategory = await SubCategory.findById(product.subCategory);

    if (req.file) {
      product.img = req.file.filename;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: product._id },
      { $set: product },
      { new: true, useFindAndModify: false }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/search/:category/:q", async function (req, res, next) {
  let products;
  if (req.params.category === "ALL")
    products = await Product.find({
      name: { $regex: ".*" + req.params.q + ".*" },
    });
  else
    products = await Product.aggregate([
      {
        $lookup: {
          from: "subCategorys",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategory",
        },
      },
      { $unwind: { path: "$subCategory" } },
      {
        $match: {
          "subCategory.category": mongoose.Types.ObjectId(req.params.category),
          name: { $regex: ".*" + req.params.q + ".*" },
        },
      },
    ]);

  res.json(products);
});

router.delete("/:product_id", async function (req, res, next) {
  try {
    const removedProduct = await Product.remove({ _id: req.params.product_id });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
