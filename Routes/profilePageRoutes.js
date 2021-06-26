const router = require("express").Router()
require("dotenv").config()


//attention XXX
const UserModel = require("../Model/user schema")
const handleErrors = require("../Controller/handlers/authentication errors")
const jwt = require("jsonwebtoken")
    //import multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

//import middlewares
const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get, profilePage_logout, profilePage_delAccount, profilePage_updateImg } = require("../Controller/profilePage controller")

//POST requests
//change profile image
router.post("/image/:id", upload.single("image"), profilePage_updateImg)

router.post("/settings/profile", verifyRefreshToken, verifyAccessToken, async(req, res) => {
    try {
        const { username } = req.body
        await UserModel.findByIdAndUpdate(req.userId, { username }, { runValidators: true })
        res.send({ redirect: `/${req.userId}` })


    } catch (err) {

        const errMessagesObj = {
            username: ""
        }
        res.status(400).json(handleErrors(err.errors, errMessagesObj))
    }
})

//DELETE requests
//logout the user
router.delete("/logout", profilePage_logout)

//delete the user account
router.delete("/delete-account/:id", profilePage_delAccount)

//GET requests
//about page
router.get("/about", (req, res) => {
    res.render("about", { title: "Sarahah clone | About" })
})

router.get("/settings/profile", verifyRefreshToken, verifyAccessToken, async(req, res) => {
        const user = await UserModel.findById(req.userId)
        res.render("settings-profile", { title: "Sarahah clone | Edit profile", username: user.username, userImage: user.image })
    })
    //profile page 
router.get("/:id", verifyRefreshToken, verifyAccessToken, profilePage_get)


module.exports = router