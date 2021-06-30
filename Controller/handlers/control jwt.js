const jwt = require("jsonwebtoken")
require("dotenv").config()

//tokens secret
const accessTokenSec = process.env.access_token_secret //acsess token secret
const refreshTokenSec = process.env.refresh_token_secret //refresh token secret

// sign new tokens
const signToken = (username, secret, lifetime) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ username }, secret, { expiresIn: lifetime }, function(err, payload) {
            if (!err) resolve(payload) //return the user id
        })
    })
}

//create both of access and refresh tokens and refresh token lifetime
const createTokens = async(username) => {
    accessToken = await signToken(username, accessTokenSec, "7d"), //create access token
        refreshToken = await signToken(username, refreshTokenSec, "365d"), //create refresh token
        year_in_milisec = 365 * 24 * 60 * 60 * 1000 //year in milliseconds (refresh token lifetime)

}

//verify access token
const verifyAccessToken = (req, res, next) => {

    //check that the access token is valid 
    jwt.verify(accessToken, accessTokenSec, function(err, payload) {

        //if access token is invalid  
        if (err) next()

        // if access token is valid   
        else {

            //prevent the user from going to the signup or the login page
            if (req.originalUrl.includes("signup") || req.originalUrl.includes("login")) {

                //redirect the user to his profile page
                res.redirect(`/${payload.username}`)
            } else {


                req.username = payload.username //pass the user name to the request object
                next()
            }
        }
    })

}


//verify refresh token
const verifyRefreshToken = async(req, res, next) => {
    //check that the refresh token is valid 
    jwt.verify(req.cookies.refreshToken, refreshTokenSec, async function(err, payload) {

        //if the refresh token is invalid, continue to the next middleware that will redirect the user to the login page 
        if (err) {
            accessToken = null
            next()
        } else {

            //create new access and refresh tokens
            await createTokens(payload.username)

            // set refresh token into cookie
            res.cookie("refreshToken", refreshToken, { maxAge: year_in_milisec })
            next()
        }
    })
}

//if the user is not authenticated, he will be redirected to the login page
const redirectNonAuth = (req, res, next) => {
    if (!req.username) {
        res.redirect("/")
        return
    } else next()

}
module.exports = { verifyAccessToken, verifyRefreshToken, createTokens, redirectNonAuth }