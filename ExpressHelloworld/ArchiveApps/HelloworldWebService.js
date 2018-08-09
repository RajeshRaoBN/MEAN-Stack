var http = require("http");

var count = 0;

function requestHandler(req, res) {
    if (req.url === "/") {
        res.end("Welcome to the homepage!");
    } else if (req.url === "/about") {
        res.end("Welcome to the about page!");
    } else {
        res.end("Error! File not found.");
    }
    //count++;
    //console.log("In comes a request to: " + request.url);
    //response.end("Hello, world! request count = " + count);
}

var server = http.createServer(requestHandler);

server.listen(4000);