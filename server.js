const express = require("express")
const path = require("path")
const connectDB = require("./config/db")
const cors = require("cors");


const app = express()

// Connecting the database 
connectDB()

//  Init middleware
app.use(express.json( { extended: false } ))


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

//  Defining routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/users", require("./routes/users"))
app.use("/api/reviews", require("./routes/reviews"))
app.use("/api/similarMovies", require("./routes/similarMovies"))
//  set a static folder for the client app
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

// app.get("/", (req, res)=>{
//     res.send("server route")
// })


//  serving the static files if we are in production
if (process.env.NODE_ENV === "production"){
    //   set a static folder
    app.use(express.static("client/build"))

    //  this path will be hit if no other path above is hit and app is in production
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server is listening to port " + PORT) )
