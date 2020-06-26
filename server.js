const express = require("express")
const path = require("path")
const connectDB = require("./config/db")

const app = express()

// Connecting the database 
connectDB()

//  Init middleware
app.use(express.json( { extended: false } ))

//  Defining routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/users", require("./routes/users"))

//  set a static folder for the client app
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.get("/", (req, res)=>{
    res.send("server route")
})




const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log("Server is listening to port " + PORT) )
