const mongoose = require("mongoose")
const { isEmail } = require("validator")
const { genSalt, hash } = require("bcryptjs")

//create user schema
const userScema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        maxlength: [50, 'The username must be 50 characters at maximum'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'The password must be 8 characters at minimum'],
        maxlength: [20, 'The password must be 20 characters at maximum']
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: [
            function() {
                //check the passwords match together
                return this.confirmPassword === this.password
            },
            'Passwords must match together'
        ]
    },
    gender: String
})

// hash the user password after sign up before creating his account
userScema.pre("save", async function() {
    const salt = await genSalt() // generate salt
    const hashedPassword = await hash(this.password, salt) // hash password
    this.password = hashedPassword //assign the hashed password to the user password

    // delete confirmPassword key form the schema
    this.confirmPassword = undefined
})

const UserModel = mongoose.model('user', userScema)

module.exports = UserModel