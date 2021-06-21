//import modules

const express = require("express")
const app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require('dotenv').config()

const signupRoute = require("./Routes/signupRoutes.js") //import sign up routes 
const loginRoute = require("./Routes/loginRoutes.js") //import login routes 

const { verifyAccessToken, verifyRefreshToken } = require("./Controller/handlers/control jwt")

const PORT = process.env.PORT || 7777


app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())

//connect database
mongoose.connect(process.env.db_url, { useUnifiedTopology: true, useNewUrlParser: true }, () => {

    app.listen(PORT, () => {
        console.log(`we are building http://localhost:7777/Login`)
        console.log('database connected')
    })

})

//sign up routes
app.use('/Signup', signupRoute)

//login routes
app.use('/Login', loginRoute)

//welcome page 
app.get("/welcome", verifyRefreshToken, verifyAccessToken, async(req, res) => {
    const UserModel = require("./Model/user schema")
    const user = await UserModel.findById(req.user.userId)
    res.send(user)
})


//if the user entered wrong url
app.use("*", (req, res) => {
    //send 404 page
    res.status(404).render('404', { title: 'Sarahah clone | Page not found' })
})