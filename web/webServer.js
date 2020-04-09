const http = require("http");
 
const server = http
  .createServer((req, res) => {
    res.end("Hello! This is the webserver for the discord bot on " + process.env.PROJECT_DOMAIN);
  })
  .listen(3000);
 
console.log("NinjaGenHelper Database is online!");
 
setInterval(() => {
  http.get(`http://confirmed-brick.glitch.me/`);
}, 28000);
 