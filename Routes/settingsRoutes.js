const router = require("express").Router()

//import middlewares
const { verifyAccessToken, verifyRefreshToken, redirectNonAuth } = require("../Controller/handlers/control jwt")

//import settings controllers
const { settings_getProfile, settings_updateImg, settings_updateUsername } = require("../Controller/settings controller")

//import multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

//GET requests

//get (edit profile) page
router.get("/profile", verifyRefreshToken, verifyAccessToken, redirectNonAuth, settings_getProfile)

//POST requests
//change profile image
router.post("/profile/image", upload.single("image"), verifyRefreshToken, verifyAccessToken, settings_updateImg)

//change the username
router.post("/profile/username", verifyRefreshToken, verifyAccessToken, settings_updateUsername)


module.exports = router