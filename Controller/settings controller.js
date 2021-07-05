const UserModel = require("../Model/user schema")
const { compare } = require("bcryptjs")
const handleErrors = require("../Controller/handlers/authentication errors")

//get the edit profile page
const settings_getProfSett = async(req, res) => {

    const user = await UserModel.findById(req.userId)
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
        await UserModel.findByIdAndUpdate(req.userId, { username }, { runValidators: true })
        res.status(200).json({ username, message: "Username updated successfully" })
    } catch (err) {

        const errMessagesObj = {
            username: ""
        }

        //send bad request status to the user and show him his errors
        res.status(400).json(handleErrors(err.errors, errMessagesObj))
    }
}


//update the user image
const settings_updateImg = async(req, res) => {
    const imageType = require('image-type');
    if (imageType(req.file.buffer)) { //check that the image file isn't empty
        const user = await UserModel.findByIdAndUpdate(req.userId, { image: req.file.buffer.toString("base64") }, { new: true })
        res.json({ image: user.image, message: 'Profile image updated successfully' })
    } else {
        res.status(400).end()
    }
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
            const account = await UserModel.findById(req.userId)

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

                res.status(200).json({ message: "Password updated successfully" })
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

        //send the errors to the user
        res.status(400).json(handleErrors(err.errors, errMessagesObj))
    }

}

//delete message
const settings_delMsg = async(req, res) => {
    const { msgIndex } = req.body //the message index
    const user = await UserModel.findById(req.userId)
    user.messages.splice(msgIndex, 1) //delete the message
    user.confirmPassword = user.password //to avoid validation errors
    await user.save()

    res.json({ messages: user.messages })
}

//logout
const profilePage_logout = (req, res) => {
    //logout the user by expire his authentication cookie
    res.cookie("refreshToken", '', {
        maxAge: 1,
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
    })
    res.end()
}

//delete the user account
const profilePage_delAccount = async(req, res) => {
    await UserModel.findByIdAndDelete(req.userId)

    //logout the user after deleting his account
    profilePage_logout(req, res)
}
module.exports = {
    settings_getProfSett,
    settings_getPassSett,
    settings_getAccSett,
    settings_updateImg,

    settings_updateUsername,
    settings_updatePass,
    settings_delMsg,
    profilePage_logout,
    profilePage_delAccount
}