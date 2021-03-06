const router = require("express").Router()

//import controllers
const { signup_get, signup_post } = require("../Controller/signup controllers")
const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")

router.get('/', verifyRefreshToken, verifyAccessToken, signup_get)

router.post('/', signup_post)

module.exports = router