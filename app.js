//import modules

const express = require("express")
const app = express()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require('dotenv').config()

//import routers
const signupRoute = require("./Routes/signupRoutes.js") //import sign up routes 
const loginRoute = require("./Routes/loginRoutes.js") //import login routes 
const profilePageRoute = require("./Routes/profilePageRoutes") //import profile page routes
const settingsRoute = require("./Routes/settingsRoutes") //import profile page routes

const PORT = process.env.PORT || 7777


app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())

//connect database
mongoose.connect(process.env.db_url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, () => {

    app.listen(PORT, () => {
        console.log(`we are building http://localhost:7777/Login`)
        console.log('database connected')
    })

})

//sign up routes
app.use('/Signup', signupRoute)

//login routes
app.use('/Login', loginRoute)

//settings routes
app.use('/settings', settingsRoute)

//profile page 
app.use("/", profilePageRoute)


//if the user entered wrong url
app.use("*", (req, res) => {
    //send 404 page
    res.status(404).render('404', { title: 'Sarahah clone | Page not found' })
})