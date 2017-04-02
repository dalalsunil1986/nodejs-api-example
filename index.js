var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.user(bodyParser.json());
app.user(bodyParser.urlencoded({ extended: true }));
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
const sqliteJson = require('sqlite-json');
const exporter = sqliteJson(db);
const prefix = "/test-nodejs-api";

app.get(prefix + '/listUsers', function(req, res) {
	exporter.json('select * from users', function(err, json) {
		console.log(json);
		res.end(json);
	});
});

app.post(prefix + '/addUser', function(req, res) {
	// receive post parameters 
});

var server = app.listen(9601, '127.0.0.1', function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});
