const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dateRegister: {
        type: Date,
        default: Date.now()
    },
    photo: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('user', userSchema)