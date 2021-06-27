const UserModel = require("../Model/user schema")

const profilePage_get = async(req, res, next) => {

    try {
        //get the user data to show in his profile
        const user = await UserModel.findById(req.params.id)

        //check if who opens the profile page is authenticated
        const authenticatedUser = req.userId && req.userId

        //if who opens the profile page is authenticated owns the profile too, send to him ('account-owner-view') file
        if (authenticatedUser === req.params.id) {

            res.render('account-owner-view', { title: `Sarahah clone | ${user.username}`, username: user.username, userId: user._id, userImage: user.image })
        }
        //if who opens the profile page isn't his owner
        else res.render('account-visitor-view', { title: `Sarahah clone | ${user.username}`, username: user.username, userImage: user.image })

    } catch (err) {
        next()
    }

}

module.exports = { profilePage_get }