var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var moment = require('moment');
const fs = require('fs');
var soundarr = [];
var sounddef;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.all('*',function(req,res,next){
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var time = new Date(utc + (3600000*9));
    fs.appendFile( __dirname + '/public/log/log.txt',time.toLocaleString() + '\t' + req.ip + '\t' +req.hostname +  req.originalUrl +'\t' + JSON.stringify(req.query) + '\n');
    next();
});
app.get('/test',function(req,res){
    res.sendFile(__dirname + '/public/pages/test.html');
});
app.get('/sounddata',function(req,res){
	console.log(req.query);
	var t = []
	t[0] = (req.query.serial) + "";
	t[1] = (req.query.value)*1;
	soundarr.push(t);
	sounddef = ( t[1]-690 )/190;
	if(sounddef<0)sounddef*=-1;
	sounddef *= 190;
	sounddef /= 12;
	console.log(sounddef);
	res.send("receiving data...");
});
app.get('/soundapp',function(req,res){
    	res.send(sounddef+"");
});
app.get('/sound',function(req,res){
    t = [];
    t.push('seq');
    t.push('value');
    soundarr[0] = t ;
    console.log(soundarr)
    res.render(__dirname + '/public/pages/weather.ejs' , {array : soundarr});
});
app.get('/xml',function(req,res){
    var request = require('request');
    var url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144063000';
    var json_parser = require('xml2json');
    request(url , function( error , response , body){
	var json = json_parser.toJson(body);
	var data = JSON.parse(json);
	var content = JSON.stringify(data.rss.channel.item.description.body.data);
	var arr = content.split("\},\{");
	var array = [];
	var category = [];
	for( i in arr){
	    if( i == 0){
		arr[i] = arr[i].replace('[{','');
		}
		else if(i == arr.length-1){
		    arr[i] = arr[i].replace('}]','');
	    }
	    arr[i] = '{' + arr[i] + '}';
	    var json = JSON.parse(arr[i]);
	    var t = [];
	    json.day*=1;
	    var day = moment().add( json.day , 'd');
	    t[0] = day.format('MM/DD') + ' ' + json.hour;
	    t[1] = json.reh;
	    t[2] = json.temp;
	    t[1] *= 1;
	    t[2] *= 1;
	    array[i] = t;
	};
	res.send(array);
    });
});
app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/pages/index.html');
});
app.get('/member',function(req,res){
    res.sendFile(__dirname + '/public/pages/member.html');
});
app.post('/log',function(req,res){
    var pattern = req.body.pattern;
    var regex = new RegExp(pattern,'i');
    var ret = "";
    var j = 0;
    if( pattern){
	fs.readFile(__dirname + '/public/log/log.txt' , function(err , data){
	    if (err) {
		throw new Error(err);
	    }
	    var array = data.toString().split("\n");
	    for( i in array){
		if( -1 != array[i].search(regex) ){
		    ret += array[i];
		    ret += '<br>';
		}
	    }
	    res.send(ret);
	})
    }
    else
	res.end();
});
app.get('/log',function(req,res){
    res.sendFile(__dirname + '/public/pages/log.html');
});
app.all('/weather',function(req,res){
    var request = require('request');
    var xml2js = require('xml2js');
    var url = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144063000';
    var json_parser = require('xml2json');
    request(url , function( error , response , body){
	var json = json_parser.toJson(body);
	var data = JSON.parse(json);
	var content = JSON.stringify(data.rss.channel.item.description.body.data);
	var mysql = require('mysql');
	var connection = mysql.createConnection({
	    host : 'localhost',
	    user : 'root',
	    password: 'ktw08037',
	    database: 'MAIN'
	});
	connection.connect(function(err) {
	    var array=[];
	    if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	    }
	    console.log('connected as id ' + connection.threadId);
	    connection.query('TRUNCATE weather');
	    var arr = content.split("\},\{");
	    for( i in arr){
		if( i == 0){
		    arr[i] = arr[i].replace('[{','');
		    }
		    else if(i == arr.length-1){
			arr[i] = arr[i].replace('}]','');
		}
		arr[i] = '{' + arr[i] + '}';
		var json = JSON.parse(arr[i]);
		var t = [];
		json.day*=1;
		var day = moment().add( json.day , 'd');
		t[0] = day.format('MM/DD') + ' ' + json.hour;
		t[1] = json.reh;
		t[2] = json.temp;
		t[1] *= 1;
		t[2] *= 1;
		array[i] = t;
		connection.query('INSERT INTO weather SET ?', json, function ( err, result){
		    if (err){
			console.log('executing query string is fail');
			throw err;
		    }
		});
	    }
	    array.unshift( ['시간','습도','기온']);
	    console.log(array)
	    res.render(__dirname + '/public/pages/weather.ejs' , {array : array});
	});
    });
});
app.listen(3000,function(){
    console.log('Running Server...');
});
