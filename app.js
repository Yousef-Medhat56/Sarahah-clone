const express = require("express")

const app = express()

app.listen(7777, () => {
    console.log(`we are lisening on http://localhost:7777/`)
})

app.get("/", (req, res) => {
    res.send("set up sarahah-clone project")
})