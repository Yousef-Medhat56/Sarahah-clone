const UserModel = require("../Model/user schema")
const handleErrors = require("../Controller/handlers/authentication errors")
const moment = require("moment")

const profilePage_get = async(req, res, next) => {

    try {
        //get the user data to show in his profile

        const user = await UserModel.findOne({ username: req.params.username })
        const { username, image, messages } = user //destructing the user object
        //if who opens the profile page is authenticated owns the profile too, send to him ('account-owner-view') file
        if (req.username === user.username) {
            res.render('account-owner-view', {
                title: `Sarahah clone | ${username}`,
                username,
                image,
                messages: messages.reverse()
            })
        }
        //if who opens the profile page isn't his owner
        else res.render('account-visitor-view', {
            title: `Sarahah clone | ${username}`,
            username,
            image,
            //filter public messages from the messages array
            publicMessages: messages.reverse().filter(msgObj => msgObj.isPublic === "true")
        })

    } catch (err) {
        next()
    }

}

//store the message in the database and handle its errors
const profilePage_patch = async(req, res) => {
    try {
        const { message, isPublic } = req.body
        await UserModel.findOneAndUpdate({ username: req.params.username }, {
            $push: {
                messages: {
                    message,
                    isPublic,
                    date: moment().format(
                        "MMMM Do YYYY, h:mm a")
                }
            }
        }, { runValidators: true })

        res.end()
    } catch (err) {

        const errMessagesObj = { message: "" }
        res.status(400).json(handleErrors(err.errors.messages, errMessagesObj))
    }
}
module.exports = { profilePage_get, profilePage_patch }