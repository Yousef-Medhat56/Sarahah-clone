const jwt = require("jsonwebtoken")
require("dotenv").config()

// create tokens
const createToken = (userId, secret, lifetime) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId }, secret, { expiresIn: lifetime }, function(err, payload) {
            if (!err) resolve(payload) //return the user id
        })
    })
}

//verify access token
const verifyAccessToken = (req, res, next) => {
    //check that the access token is valid 
    jwt.verify(req.cookies.accessToken, process.env.access_token_secret, function(err, userId) {

        //if access token is invalid  
        if (err) {
            //allow the user to go to the signup page
            if (req.originalUrl.includes("signup")) {
                next()
            }
            //allow the user to go to the signup page
            if (req.originalUrl.includes("login")) {
                next()
            }

            //redirect the user to the login page
            else {
                res.redirect("/login")
            }

            // if access token is valid   
        } else {

            //prevent the user from going to the signup or the login page
            if (req.originalUrl.includes("signup") || req.originalUrl.includes("login")) {

                res.redirect("/welcome")
            } else {

                req.user = userId //pass the user ID to the request object
                next()
            }
        }
    })

}


//verify refresh token
const verifyRefreshToken = async(req, res, next) => {
    //check that the refresh token is valid 
    jwt.verify(req.cookies.refreshToken, process.env.refresh_token_secret, async function(err, userId) {

        //if the refresh token is invalid, continue to the next middleware that will redirect the user to the login page 
        if (err) {
            next()
        } else {
            //create new refresh and access tokens
            const accessToken = await createToken(userId.userId, process.env.access_token_secret, "7d")
            const refreshToken = await createToken(userId.userId, process.env.refresh_token_secret, "365d")
            res.cookie("accessToken", accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000 })
            res.cookie("refreshToken", refreshToken, { maxAge: 365 * 24 * 60 * 60 * 1000 })
            next()
        }
    })
}
module.exports = { createToken, verifyAccessToken, verifyRefreshToken }