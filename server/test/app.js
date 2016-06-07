var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
require('./test.js')(app);
app.use(express.static(__dirname + 'public'));
server.listen(3000,function(){
	console.log('hihi');
});
