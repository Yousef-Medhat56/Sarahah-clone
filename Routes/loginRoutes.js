const router = require("express").Router()

//import controllers
const { login_get, login_post } = require("../Controller/login controllers")

router.get('/', login_get)

router.post('/', login_post)


module.exports = router