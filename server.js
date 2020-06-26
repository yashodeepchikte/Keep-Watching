const express = require("express")
const path = require("path")
const app = express()

app.use("/api", require("./routes/api_v1"))
app.use("/auth", require("./routes/auth"))


//  set a static folder for the client app
app.use(express.static("client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});




const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log("App listening to port " + PORT) )
