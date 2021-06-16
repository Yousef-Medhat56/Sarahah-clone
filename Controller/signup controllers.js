//import user model
const UserModel = require("../Model/user schema")

//GET the signup page
const signup_get = (req, res) => {
    //send the sign up page
    res.render('register')
}

//POST to the signup page
const signup_post = async(req, res) => {
    try {

        const user = await UserModel.create(req.body)
        res.send(user)
    } catch (err) {

        res.send(err)
    }
}

module.exports = { signup_get, signup_post }