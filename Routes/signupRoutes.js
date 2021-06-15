const router = require("express").Router()


router.get('/', (req, res) => {

    //send the sign up page
    res.render('register')
})


module.exports = router