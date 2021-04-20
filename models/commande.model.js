const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommandeSchema  = new Schema({
   
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    lignesCommande: [{
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
    },
    paiement: {
        type: String
    }
}, {strict: false})

module.exports = mongoose.model("Commande" , CommandeSchema, "commandes")
