//import user model
const UserModel = require("../Model/user schema")


//handle user errors
const handleErrors = (errorsObj, errorCode) => {

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

    //check if the email is already registered (not unique)
    if (errorCode) errMessagesObj["email"] = "This email is already registered"

    //if the email is registered but there are other errors
    else if (errorsObj) {
        // convert the errors object to array
        const errorsArr = Object.values(errorsObj)
        errorsArr.forEach(({ properties }) => { //destructing the properties object 

            /*assign the error message to the error location
            for example:
            errMessagesObj[email] = "This email is already registered"*/
            errMessagesObj[properties.path] = properties.message
        })
    }

    return errMessagesObj
}

//GET the signup page
const signup_get = (req, res) => {
    //send the sign up page
    res.render('register', { title: "Sign Up" })
}

//POST to the signup page
const signup_post = async(req, res) => {
    try {
        //create new accout if the form data is valid
        const user = await UserModel.create(req.body)
        res.send(user)
    } catch (err) { //if the user input invalid data 

        //send (bad request status and invoke (handleErrors) function) 
        res.status(400).json(handleErrors(err.errors, err.code))
    }
}

module.exports = { signup_get, signup_post }