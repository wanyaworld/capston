var express = require('express');
var app = express();
var request = require('request');
var php = require("node-php"); 
var path = require("path"); 
const fs = require('fs');
app.use("/", php.cgi(__dirname + '/T/registration.php')); 
app.listen(3000,function(){
    console.log('Running Server...');
});
