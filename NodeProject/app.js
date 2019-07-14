var express = require("express");
var mysql = require("mysql");

var app = express();

var db = require('./db');

app.get('/createdb', function(req, res){

    let sql = 'CREATE DATABASE testNode';

    db.query(sql, function(err,results,fields) {
        if(err) throw err;
        res.send('New Database is created.');
    });
})

app.get('/createtable', function(req, res){

    let sql = 'CREATE TABLE sample(id int primary key, name varchar(20), phone varchar(20))';

    db.query(sql, function(err,results,fields) {
        if(err) throw err;
        res.send('New Table is created.');
    });
})

app.get('/insertintotable', function(req, res){

    let sql = 'INSERT INTO sample VALUES(1, "RAJESH", "0444 444 444")';

    db.query(sql, function(err,results,fields) {
        if(err) throw err;
        res.send('Sample data inserted.');
    });
})


app.get('/', function(req,res){
    res.send("Damn this is working and I love it");
});

app.listen('5000', function(err){
    if(err) throw err;
    console.log("Server started at port 5000");
});