const router = require("express").Router()

const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get } = require("../Controller/profilePage controller")

//profile page 
router.get("/:id", verifyRefreshToken, verifyAccessToken, profilePage_get)

module.exports = router