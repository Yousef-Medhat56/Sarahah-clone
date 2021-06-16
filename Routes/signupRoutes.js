const router = require("express").Router()

//import controllers
const { signup_get, signup_post } = require("../Controller/signup controllers")

router.get('/', signup_get)

router.post('/', signup_post)

module.exports = router