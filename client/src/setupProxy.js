const proxy=require("http-proxy-middleware")
module.exports=function(app){
    app.use(proxy(['/api/auth/google'],{target:"http://localhost:5000/api/auth/google"}))}