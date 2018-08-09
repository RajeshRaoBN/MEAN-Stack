var express = require("express");
var logger = require("morgan");
var http = require("http");
var app = express();
app.use(logger("short"));
var count = 0;
// Fun fact: logger("short") returns a function
app.use(function(request, response) {
    count++;
    // response.setHeader("header", count);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!");
});
http.createServer(app).listen(3000);