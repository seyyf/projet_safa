const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PanierSchema  = new Schema({
   
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    lignes: [{
        qte : {
            type: Number,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    }],
    total: {
        type: Number
    }
}, {strict: false})

module.exports = mongoose.model("Panier" , PanierSchema, "paniers")
