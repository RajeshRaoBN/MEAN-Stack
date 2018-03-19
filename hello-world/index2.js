var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/my_db'
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model('Person', personSchema);

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

app.post('/person', function(req, res){
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

/*app.post('/person', function(req, res){
    console.log(req.body);
    res.send("recieved your request!");
});

Person.find({name: "Rajesh", age: 33},
    function(err, response){
        console.log(response);
    });

Person.find({nationality: "India"}, "name", function(err, response){
    console.log(response);
});*/

/*Person.findById("5aaf498a99594220e4fc7f48", function(err, response){
    console.log(response);
});

Person.update({age: 33}, {nationality: "American"}, function(err, response){
    console.log(response);
});

Person.findOneAndUpdate({name: "Rajesh"}, {age: 40}, function(err, response) {
    console.log(response);
});

Person.findByIdAndUpdate("5aaf498a99594220e4fc7f48", {name: "James"},
    function(err, response){
        console.log(response);
    });

Person.find(function(err, response){
        console.log(response);
    })

app.put('/people/:id', function(req, res){
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
        if(err) res.json({message: "Error in updating person with id " + req.params.id});
        res.json(response);
    });
});*/

Person.find(function(err, response){
    console.log(response);
})

app.listen(3000);