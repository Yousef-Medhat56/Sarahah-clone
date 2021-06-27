const router = require("express").Router()

//import middlewares
const { verifyAccessToken, verifyRefreshToken, redirectNonAuth } = require("../Controller/handlers/control jwt")

//import settings controllers
const {
    settings_getProfSett,
    settings_getPassSett,
    settings_getAccSett,
    settings_updateImg,
    settings_updateUsername
} = require("../Controller/settings controller")

//import multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

//GET requests

//Get (edit profile) page
router.get("/profile", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getProfSett)

//Get the (change password) page
router.get("/changePassword", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getPassSett)


//Get the (account settings) page
router.get("/account", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getAccSett)

//POST requests
//change profile image
router.post("/profile/image", upload.single("image"), verifyRefreshToken, verifyAccessToken, settings_updateImg)

//change the username
router.post("/profile/username", verifyRefreshToken, verifyAccessToken, settings_updateUsername)

//get the (change password) page
module.exports = router