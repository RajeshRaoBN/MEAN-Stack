var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
// Requires all of the modules you need
// Makes an Express app
// Creates a global array to store all your entries
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
// The first line tells Express that the views are in the views folder; the next line says the views will use the EJS engine.
//    Populates a variable called req.body if the user is submitting a form. (The extended option is required.)
// Makes this entries array available in all views
var entries = [];
app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(request, response) {
    response.render("index");
});
// When visiting the site root, renders the homepage (at views/index.ejs)
app.get("/new-entry", function(request, response) {
    response.render("new-entry");
});
app.post("/new-entry", function(request, response) {
    if (!request.body.title || !request.body.body) {
        // Renders the “new entry” page (at views/index.ejs) when GETting the URL
        response.status(400).send("Entries must have a title and a body.");
        return; }
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });
    response.redirect("/");
});
app.use(function(request, response) {
    response.status(404).render("404");
});
// Adds a new entry to the list of entries
http.createServer(app).listen(3000, function() {
    console.log("Guestbook app started on port 3000.");
});