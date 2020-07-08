const proxy=require("http-proxy-middleware")
module.exports=function(app){
    app.use(proxy(['/api'],{target:"http://localhost:5000/"}))
    app.use(proxy(["/recommendations"], {target:"https://keepwatching-server.herokuapp.com/"}))
}