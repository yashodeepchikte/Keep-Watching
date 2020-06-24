const express = require ("express")
const mongoose = require("mongoose")

const keys = require("./passport-config")

const app =  express()
const db = mongoose.connect(keys.mongoDB.mongo_URI,
                                    {
                                        useNewUrlParser: true,
                                        useUnifiedTopology: true
                                    })
                                    .then(console.log("Database connected"))
                                    .catch(err => console.error(err.message))

const PORT = process.env.PORT || 5000
//  Spining up the passport app
const passport = require("./passport")
//  Routing middleware
app.use("/auth", require("./routes/auth-routes"))


//  home route
app.get("/", (req, res) => {
    res.send("HOME ROUTE")
})

app.listen(PORT, () => {
    console.log("app listening to port " + PORT)
})