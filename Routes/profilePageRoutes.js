const router = require("express").Router()
require("dotenv").config()

//import middlewares
const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get, profilePage_patch } = require("../Controller/profilePage controller")





//GET requests

//GET welcome page
router.get("/", verifyRefreshToken, verifyAccessToken, (req, res) => {
    /*if the user is authenticated redirect him to his profile page,
    else :send welcome page*/
    req.userId ? res.redirect(`/${req.userId}`) : res.render('welcome', { title: "Sarahah clone | Welcome" })
})

//GET about page
router.get("/about", (req, res) => {
    res.render("about", { title: "Sarahah clone | About" })
})


//GET profile page 
router.get("/:id", verifyRefreshToken, verifyAccessToken, profilePage_get)

//PATCH
//store message in the database
router.patch('/sendMessage/:id', profilePage_patch)

module.exports = router