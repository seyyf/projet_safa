const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema  = new Schema({
    name: {
        type: String,
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
    },
    quantite: {
        type: Number,
    },
    price: {
        type: Number,
    },
    img: {
        type: String,
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
    }
})

module.exports = mongoose.model("Product" , ProductSchema, "products")
