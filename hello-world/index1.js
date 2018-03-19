/*
var express = require('Express');
var app = express();
*/

/*app.get('/hello', function (req, res) {
    res.send("Hello world!");
})

app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
});

app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route!");
});

var things = require('./things.js');

//both index1.js and things.js should be in same directory
app.use('/things', things);*/

/*var wiki = require('./wiki.js');

app.use('/wiki', wiki);*/

/*app.get('/wiki/:name/:id', function (req, res) {
   res.send('The id you specified is ' + req.params.id + ' and name '
       + req.params.name);
});

app.get('/wiki/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

//Other routes here
app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

//Simple request time logger
app.use('/wiki/things', function (req, res, next) {
    console.log("A new request received at " + Date.now());

    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware
    //function/route handler.
    next();
});

// Route handler that sends the response
app.get('/wiki/things', function(req, res){
    res.send('Things');
});

//First middleware before response is sent
app.use(function(req, res, next){
    console.log("Start");
    next();
});

//Route handler
app.get('/', function(req, res, next){
    res.send("Middle");
    next();
});

app.use('/', function(req, res){
    console.log('End');
});*/

/*app.set('view engine', 'pug');
app.set('views','./views');*/

/*app.get('/first_template', function(req, res){
    res.render('first_view');
});*/

/*app.get('/dynamic_view', function(req, res){
    /!*res.render('dynamic', {
        name: "TutorialsPoint",
        url:"http://www.tutorialspoint.com"
    });*!/
    res.render('dynamic',{
        user: {name: "Ayush", age: "20"}
    });
});*/

/*app.get('/components', function(req, res){
    res.render('content');
});*/

/*app.use(express.static('public'));

app.get('/static_file_test', function (req, res) {
    res.render('static')
})*/

//app.listen(3000);

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/person', function(req, res){
    res.render('person');
});

/*app.get('/', function(req, res){
    res.render('form');
});*/

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

/*app.post('/', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));*/

app.post('/person', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
    var personInfo = req.body; //Get the parsed information

    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
        res.render('show_message', {
            message: "Sorry, you provided worng info", type: "error"});
    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        newPerson.save(function(err, Person){
            if(err)
                res.render('show_message', {message: "Database error", type: "error"});
            else
                res.render('show_message', {
                    message: "New person added", type: "success", person: personInfo});
        });
    }
});

app.listen(3000);