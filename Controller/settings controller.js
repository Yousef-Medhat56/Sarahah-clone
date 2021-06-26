const UserModel = require("../Model/user schema")

const handleErrors = require("../Controller/handlers/authentication errors")

//get the edit profile page
const settings_getProfile = async(req, res) => {

    const user = await UserModel.findById(req.userId)
    res.render("settings-profile", { title: "Sarahah clone | Edit profile", username: user.username, userImage: user.image })

}

//change the username
const settings_updateUsername = async(req, res) => {

    //check the username validation
    try {
        const { username } = req.body
        await UserModel.findByIdAndUpdate(req.userId, { username }, { runValidators: true })
        res.send({ redirect: `/${req.userId}` })
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
    await UserModel.findByIdAndUpdate(req.userId, { image: req.file.buffer.toString("base64") })
    res.end()
}



module.exports = { settings_getProfile, settings_updateImg, settings_updateUsername }