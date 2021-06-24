const router = require("express").Router()

const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get, profilePage_logout, profilePage_delAccount } = require("../Controller/profilePage controller")

//show about page
router.get("/about", (req, res) => {
    res.render("about", { title: "Sarahah clone | About" })
})

//logout the user
router.delete("/logout", profilePage_logout)
router.delete("/delete-account/:id", profilePage_delAccount)

//profile page 
router.get("/:id", verifyRefreshToken, verifyAccessToken, profilePage_get)


module.exports = router