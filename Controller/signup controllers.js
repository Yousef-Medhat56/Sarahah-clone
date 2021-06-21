//import user model
const UserModel = require("../Model/user schema")

//jwt
const { createToken } = require("./handlers/control jwt")

//handle sign up errors
const handleErrors = require("./handlers/authentication errors")

//GET the signup page
const signup_get = (req, res) => {



    //send the sign up page
    res.render('register', { title: "Sign Up" })

}

//POST to the signup page
const signup_post = async(req, res) => {

    /*errMessagesObj = {
        key : the error location (for example : the username field)
        value : the error message
    } */
    const errMessagesObj = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    try {
        //create new accout if the form data is valid
        const user = await UserModel.create(req.body)
        const accessToken = await createToken(user._id, process.env.access_token_secret, "7d")
        const refreshToken = await createToken(user._id, process.env.refresh_token_secret, "1y")
        res.cookie("accessToken", accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000 })
        res.cookie("refreshToken", refreshToken, { maxAge: 365 * 24 * 60 * 60 * 1000 })

        res.send({ redirect: "/welcome/" })
    } catch (err) { //if the user input invalid data 

        //send (bad request status and invoke (handleErrors) function) 
        res.status(400).json(handleErrors(err.errors, errMessagesObj, err.code))
    }
}

module.exports = { signup_get, signup_post }