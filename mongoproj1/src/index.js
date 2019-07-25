console.log("Hello Moto!")

var express = require('express');

var app = express();

var personRoute = require('./routes/person');

app.use(personRoute);
app.use(express.static('public'));

app.use('/', function(req,res){
    res.send("walla Express is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info('server is running on port ' + PORT));