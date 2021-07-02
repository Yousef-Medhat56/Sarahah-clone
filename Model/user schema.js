const mongoose = require("mongoose")
const { isEmail } = require("validator")
const { genSalt, hash } = require("bcryptjs")
const fs = require("fs")


//validators
// check that the username doesn't include any invalid characters
const validateUsername = (username) => { return !/[^\sA-Za-z-_]|[\s]{2}/g.test(username) }

//create user schema
const userScema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please enter your username'],
        maxlength: [50, 'The username must be 50 characters at maximum'],
        minlength: [3, 'The username must be 3 characters at minimum'],

        validate: [validateUsername, 'Your username is not invalid, please try another one']

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
        minlength: [8, 'The password must be 8 characters at minimum']

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
    gender: String,
    image: {
        type: String,
        default: function() {
            if (this.gender == "male") return fs.readFileSync("./Public/assets/male.jpg", { encoding: 'base64' })
            return fs.readFileSync("./Public/assets/female.jpg", { encoding: 'base64' })

        }
    },
    messages: [{
        message: {
            type: String,
            required: [true, 'Pleae enter your message'],
            maxlength: [200, "Your message must be 200 characters at maximum"]
        },
        isPublic: String,
        date: String

    }],

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