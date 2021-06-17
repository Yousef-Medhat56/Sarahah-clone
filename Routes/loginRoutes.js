const router = require("express").Router()

//import controllers
const { login_get } = require("../Controller/login controllers")

router.get('/', login_get)


module.exports = router