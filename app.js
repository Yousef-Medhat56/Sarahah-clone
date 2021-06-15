//import modules

const express = require("express")
const app = express()
const ejs = require('ejs')
const mongoose = require("mongoose")
require('dotenv').config()

const PORT = process.env.PORT || 7777

//connect database
mongoose.connect(process.env.db_url, { useUnifiedTopology: true, useNewUrlParser: true }, () => {

    app.listen(PORT, () => {
        console.log(`we are lisening on http://localhost:7777/signup`)
        console.log('database connected')
    })

})