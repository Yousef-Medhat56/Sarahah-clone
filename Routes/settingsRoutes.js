const router = require("express").Router()

//import middlewares
const { verifyAccessToken, verifyRefreshToken, redirectNonAuth } = require("../Controller/handlers/control jwt")

//import settings controllers
const {
    settings_getProfSett,
    settings_getPassSett,
    settings_getAccSett,
    settings_updateImg,
    settings_updateUsername,
    settings_updatePass
} = require("../Controller/settings controller")

//import multer to convert the uploaded image into a buffer object
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

//GET requests

//Get (edit profile) page
router.get("/profile", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getProfSett)

//Get the (change password) page
router.get("/password", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getPassSett)


//Get the (account settings) page
router.get("/account", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getAccSett)

//PATCH requests
//change profile image
router.patch("/profile/image", upload.single("image"), verifyRefreshToken, verifyAccessToken, settings_updateImg)

//change the username
router.patch("/profile/username", verifyRefreshToken, verifyAccessToken, settings_updateUsername)

//change the password
router.patch("/password", verifyRefreshToken, verifyAccessToken, settings_updatePass)

//get the (change password) page
module.exports = router