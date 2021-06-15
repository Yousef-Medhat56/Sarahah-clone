//import modules

const express = require("express")
const app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
require('dotenv').config()

const signupRoute = require("./Routes/signupRoutes.js") //import sign up routes 

const PORT = process.env.PORT || 7777


app.set('view engine', 'ejs')

//connect database
mongoose.connect(process.env.db_url, { useUnifiedTopology: true, useNewUrlParser: true }, () => {

    app.listen(PORT, () => {
        console.log(`we are building http://localhost:7777/signup`)
        console.log('database connected')
    })

})

//sign up routes
app.use('/signup', signupRoute)