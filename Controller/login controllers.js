const { compare } = require("bcryptjs")

const UserModel = require("../Model/user schema")
const handleErrors = require("./handlers/authentication errors")

//jwt
const { createTokens } = require("./handlers/control jwt")

//GET the login page
const login_get = (req, res) => {

    //send the login page
    res.render('login', { title: "Sarahah clone | Log in" })
}

//POST the login page
const login_post = async(req, res) => {
    const { email, password } = req.body

    /* simulate the error object created by the validation middleware
    ,in order to handle the errors of both sign u and login by the same (handleErrors) function */
    const errObj = { errors: {} }

    /*errMessagesObj = {
        key : the error location (for example : the username field)
        value : the error message
    } */
    const errMessagesObj = {
        email: "",
        password: "",
    }
    try {

        // check that the user input each of the email and the password
        if (email && password) {

            //check the existence of the email in the database
            const account = await UserModel.findOne({ email })
            if (account) { //if the email is registered

                //check the password validation after comparing it with the hahed password in the database
                const passIsTrue = await compare(password, account.password)

                //if the password is true
                if (passIsTrue) {



                    //create new access and refresh tokens
                    await createTokens(account._id)

                    // set refresh token into cookie
                    res.cookie("refreshToken", refreshToken, { maxAge: year_in_milisec })

                    //redirect the user to the welcome page
                    res.status(200).end()
                }

                // if the password is invalid
                else {

                    //throw error  
                    errObj.errors.password = { properties: { path: "password", message: `Your password is incorrect` } }
                    throw errObj
                }
            }
            //if the email doesn't exist in the database
            else {

                //throw error 
                errObj.errors.email = { properties: { path: "email", message: `Your email is not registered` } }
                throw errObj
            }

        }
        //if the user let the email or the password field empty
        else {
            // create array from the keys of the request body object [email,password]
            const keysArr = Object.keys(req.body)
            keysArr.forEach((key) => {
                //check which field is empty then ask the user to enter it
                if (!req.body[key]) {
                    errObj.errors[key] = { properties: { path: key, message: `Please enter your ${key}` } }
                }
            })

            //throw error
            throw errObj
        }
    } catch (err) {

        //send (bad request status and invoke (handleErrors) function) 
        res.status(400).json(handleErrors(err.errors, errMessagesObj))
    }
}

module.exports = { login_get, login_post }