//import user model
const UserModel = require("../Model/user schema")

//jwt
const { createTokens } = require("./handlers/control jwt")

//handle sign up errors
const handleErrors = require("./handlers/authentication errors")

//GET the signup page
const signup_get = (req, res) => {
    //send the sign up page
    res.render('register', { title: "Sarahah clone | Sign Up" })

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

        //create new access and refresh tokens
        await createTokens(user._id)

        // set refresh token into cookie
        res.cookie("refreshToken", refreshToken, { maxAge: year_in_milisec })


        //redirect the user to the welcome page
        res.status(200).end()
    } catch (err) { //if the user input invalid data 

        //send (bad request status and invoke (handleErrors) function) 
        res.status(400).json(handleErrors(err.errors, errMessagesObj, err.code))
    }
}

module.exports = { signup_get, signup_post }