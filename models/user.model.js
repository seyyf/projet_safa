const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema  = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    role: {
        type: String
    },
    postal: {
        type: String
    },
    address: {
        type: String
    },
    address_o: {
        type: String
    }
})

module.exports = mongoose.model('User' , UserSchema, 'users')
