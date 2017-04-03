var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
const sqliteJson = require('sqlite-json');
const exporter = sqliteJson(db);
const prefix = "/test-nodejs-api";

app.get(prefix + '/listUsers', function(req, res) {
	exporter.json('SELECT * FROM users', function(err, json) {
		let jsonp = JSON.parse(json);
		let retObj = jsonp;
		console.log(retObj);
		res.end(JSON.stringify({result: retObj}));
	});
});

app.post(prefix + '/addUser', function(req, res) {
	// receive post parameters
	var name = req.body.name;
	var password = req.body.password;
	var profession = req.body.profession;

	console.log("User /addUser with following params...");	
	console.log("name: " + name);
	console.log("password: " + password);
	console.log("profession: " + profession);
	console.log("---");

	if (name == null) {
		console.log("User didn't supply name in /addUser");
		res.end(JSON.stringify({result:"name cannot be null"}));
		return;
	}
	if (password == null) {
		console.log("User didn't supply password in /addUser");
		res.end(JSON.stringify({result: "password cannot be null"}));
		return;
	}
	
	// insert a new row
	db.serialize(function() {
		db.run("INSERT INTO users (name, password, profession) VALUES (?,?,?);", [name, password, profession], function(err) {
			if (err != null) {
				console.log("There is error in /addUser " + err);
				var retObj = { result: "There is error " + err };
				res.end(JSON.stringify(retObj));
			}
			else {
				console.log("Successfuly inserted a new user in /addUser");
				var retObj = { result: "Successfully inserted a new user" };
				res.end(JSON.stringify(retObj));
			}
		});
	});
});

app.get(prefix + '/:id', function(req, res) {
	// retriece get parameter
	var id = req.params.id;

	exporter.json('SELECT * FROM users WHERE id=' + id, function(err, json) {
		if (err != null) {
			console.log("There is error in /" + id + " " + err);
			var retObj = { result: "There is error " + err };
			res.end(JSON.stringify(retObj));
		}
		else {
			// parse json string to object
			let jsonp = JSON.parse(json);

			if (jsonp.length == 0) {
				console.log("/" + id + " has empty result");
				var retObj = { result: {} };
				res.end(JSON.stringify(retObj));
			}
			else {
				console.log("Successfully retrieved user id with id=" + id);
				var retObj = { result: jsonp[0] };
				res.end(JSON.stringify(retObj));	
			}
		}
	});
});

app.post(prefix + '/deleteUser', function(req, res) {
	// retrieve post parameter
	var id = req.body.id;

	if (id == null) {
		console.log("id cannot be null in /deleteUser");
		var retObj = { result: "id cannot be null" };
		res.end(JSON.stringify(retObj));
		return; 
	}

	db.run("DELETE FROM users WHERE id=" + id, function(err) {
		if (err != null) {
			console.log("There is error in /deleteUser for id=" + id);
			var retObj = { result: "There is error " + err };
			res.end(JSON.stringify(retObj));
		}
		else {
			if (this.changes <= 0) {
				console.log("Target id not found");
				var retObj = { result: "Target id=" + id + " not found" };
				res.end(JSON.stringify(retObj));
			}
			else {
				console.log("Successfully delete user with id=" + id);
				var retObj = { result: "Successfully delete user with id=" + id };
				res.end(JSON.stringify(retObj));
			}
		}
	});
});

var server = app.listen(9601, '127.0.0.1', function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Listening at http://%s:%s", host, port);
});
