const router = require("express").Router()

const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get, profilePage_logout } = require("../Controller/profilePage controller")

//show about page
router.get("/about", (req, res) => {
    res.render("about", { title: "Sarahah clone | About" })
})

//logout the user
router.delete("/logout", profilePage_logout)

//profile page 
router.get("/:id", verifyRefreshToken, verifyAccessToken, profilePage_get)


module.exports = router