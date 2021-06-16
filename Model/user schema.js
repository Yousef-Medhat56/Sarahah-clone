const mongoose = require("mongoose")

//create user schema
const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        maxlength: [50, 'The username must be 50 characters at maximum']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'The password must be 8 characters at minimum'],
        maxlength: [20, 'The password must be 20 characters at maximum']
    },
    gender: {
        type: String,
        required: [true, 'Please choose your gender']
    }
})


const UserModel = mongoose.model('user', userScema)

module.exports = UserModel