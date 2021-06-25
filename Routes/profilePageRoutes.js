const router = require("express").Router()

//import multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

//import middlewares
const { verifyAccessToken, verifyRefreshToken } = require("../Controller/handlers/control jwt")
const { profilePage_get, profilePage_logout, profilePage_delAccount, profilePage_updateImg } = require("../Controller/profilePage controller")

//POST requests
//change profile image
router.post("/image/:id", upload.single("image"), profilePage_updateImg)

//DELETE requests
//logout the user
router.delete("/logout", profilePage_logout)

//delete the user account
router.delete("/delete-account/:id", profilePage_delAccount)

//GET requests
//about page
router.get("/about", (req, res) => {
    res.render("about", { title: "Sarahah clone | About" })
})

//profile page 
router.get("/:id", verifyRefreshToken, verifyAccessToken, profilePage_get)


module.exports = router