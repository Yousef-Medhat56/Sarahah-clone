const UserModel = require("../Model/user schema")
const { compare } = require("bcryptjs")
const handleErrors = require("../Controller/handlers/authentication errors")
const { createTokens } = require("../Controller/handlers/control jwt")

//get the edit profile page
const settings_getProfSett = async(req, res) => {

    const user = await UserModel.findOne({ username: req.username })
    res.render("settings-profile", { title: "Sarahah clone | Edit profile", username: user.username, userImage: user.image })

}

//get the (password settings) page
const settings_getPassSett = async(req, res) => {
    res.render('settings-password', { title: "Sarahah clone | change your password" })
}

//get the (account settings) page
const settings_getAccSett = async(req, res) => {
    res.render('settings-account', { title: "Sarahah clone | Account settings" })
}

//change the username
const settings_updateUsername = async(req, res) => {

    //check the username validation
    try {
        const { username } = req.body
        const user = await UserModel.findOneAndUpdate({ username: req.username }, { username }, { new: true, runValidators: true })

        //create new access and refresh tokens
        await createTokens(user.username)

        // set refresh token into cookie
        res.cookie("refreshToken", refreshToken, { maxAge: year_in_milisec })
        res.status(200).send()
    } catch (err) {

        const errMessagesObj = {
            username: ""
        }

        //send bad request status to the user and show him his errors
        res.status(400).json(handleErrors(err, errMessagesObj))
    }
}

//update the user image
const settings_updateImg = async(req, res) => {
    await UserModel.findOneAndUpdate({ username: req.username }, { image: req.file.buffer.toString("base64") })
    res.end()
}

//update the user password
const settings_updatePass = async(req, res) => {
    //destructing the request body
    const { oldPassword, password, confirmPassword } = req.body

    /* simulate the error object created by the validation middleware
    ,in order to handle the errors of both sign u and login by the same (handleErrors) function */
    const errObj = { errors: {} }



    try {

        //if the old password field is empty
        if (!oldPassword) {
            errObj.errors.password = { properties: { path: "oldPassword", message: `Please enter your old password` } }
            throw errObj
        } else {
            //get the account details from the database
            const account = await UserModel.findOne({ username: req.username })
            console.log(account)

            //check that the old password is true
            const passIsTrue = await compare(oldPassword, account.password)

            if (!passIsTrue) { //if the old password is false
                errObj.errors.password = { properties: { path: "oldPassword", message: `Your password is incorrect` } }
                throw errObj
            } else {

                //update the account password
                account.password = password
                account.confirmPassword = confirmPassword
                await account.save()

                res.status(200).end()
            }
        }
    } catch (err) {
        /*errMessagesObj = {
                key : the error location (for example : the username field)
                value : the error message
            } */
        const errMessagesObj = {
            oldPassword: "",
            password: "",
            confirmPassword: ""
        }
        console.log(err)
            //send the errors to the user
        res.status(400).json(handleErrors(err, errMessagesObj))
    }

}

const profilePage_logout = (req, res) => {

    res.cookie("refreshToken", '', { maxAge: 1 })
    res.end()
}

const profilePage_delAccount = async(req, res) => {

    await UserModel.findOneAndDelete({ username: req.username })
    profilePage_logout(req, res)
}
module.exports = {
    settings_getProfSett,
    settings_getPassSett,
    settings_getAccSett,
    settings_updateImg,
    settings_updateUsername,
    settings_updatePass,
    profilePage_logout,
    profilePage_delAccount
}