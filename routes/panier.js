var express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

var router = express.Router();
const Panier = require("../models/panier.model");
const Commande = require("../models/commande.model");
const Product = require("../models/product.model");
const Category = require("../models/category.model");

router.get("/commande", async function (req, res, next) {
  try {
    const commandes = await Commande.find().populate("user");
    res.json(commandes);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/user/:user_id", async function (req, res, next) {
  try {
    const panier = await Panier.findOne({ user: req.params.user_id }).populate(
      "lignes.product"
    );
    res.json(panier);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:panier_id", async function (req, res, next) {
  try {
    const panier = await Panier.findById(req.params.panier_id);
    res.json(panier);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const panier = req.body;
    let updatePainer;
    if (panier._id)
      updatePainer = await Panier.findOneAndUpdate(
        { _id: panier._id },
        { $set: panier },
        { new: true, useFindAndModify: false }
      );
    else updatePainer = await Panier.create(panier);

    res.json(updatePainer);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/commande", async function (req, res, next) {
  try {
    console.log(req.body)
    const { panier, paiement, user } = req.body;
    const currentPanier = await Panier.findById(panier._id);
    let lignesCommande = [];

    currentPanier.lignes.forEach(async (ligne) => {
      lignesCommande.push(({ qte, product } = ligne));
    });

    console.log("**************************")

    const commande = {
      user,
      paiement,
      lignesCommande,
      total: currentPanier.total,
    };

    console.log(commande)


    console.log("**************************")

    const createCommande = await Commande.create(commande);

    console.log(createCommande)

    await Panier.deleteOne({ _id: currentPanier.id });

    res.json(createCommande);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:panier_id", async function (req, res, next) {
  try {
    const removedPanier = await Panier.remove({ _id: req.params.panier_id });
    res.json(removedPanier);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
