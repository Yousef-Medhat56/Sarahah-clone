const router = require("express").Router()

//import controllers
const { login_get, login_post } = require("../Controller/login controllers")
const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")

router.get('/', verifyRefreshToken, verifyAccessToken, login_get)

router.post('/', login_post)


module.exports = router