const router = require("express").Router()
require("dotenv").config()

//import middlewares
const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get, profilePage_patch } = require("../Controller/profilePage controller")





//GET requests
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