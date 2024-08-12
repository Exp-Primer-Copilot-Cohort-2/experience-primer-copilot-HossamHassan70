// Create web server

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Set up web server
server.listen(3000);
console.log('Server running on port 3000');

// Set up socket.io
io.sockets.on('connection', function(socket) {
	socket.on('send comment', function(data) {
		io.sockets.emit('new comment', data);
	});
});

// Set up express
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/public'));

// Set up comments
var comments = [];

// Set up comments API
app.get('/comments', function(req, res) {
	res.json(comments);
});
app.post('/comments', function(req, res) {
	comments.push(req.body);
	res.json(comments);
});
app.delete('/comments', function(req, res) {
	comments = [];
	res.json(comments);
});
app.get('/comments/:id', function(req, res) {
	res.json(comments[req.params.id]);
});
app.put('/comments/:id', function(req, res) {
	comments[req.params.id] = req.body;
	res.json(comments);
});
app.delete('/comments/:id', function(req, res) {
	comments.splice(req.params.id, 1);
	res.json(comments);
});

// Set up comments page
app.get('/comments.html', function(req, res) {
	res.sendFile(__dirname + '/comments.html');
});
app.get('/comments.js', function(req, res) {
	res.sendFile(__dirname + '/comments.js');
});

// Set up comments form
app.get('/comments-form.html', function(req, res) {
	res.sendFile(__dirname + '/comments-form.html');
});
app.get('/comments-form.js', function(req, res) {
	res.sendFile(__dirname + '/comments-form.js');
});
app.get('/comments-form.css', function(req, res) {
	res.sendFile(__dirname + '/comments-form.css');
});

// Set up comments list
app.get('/comments-list.html', function(req, res) {
	res.sendFile(__dirname + '/comments-list.html');
});
app.get('/comments-list.js', function(req, res) {
	res.sendFile(__dirname + '/comments-list.js');
});
app.get('/comments-list.css', function(req, res) {
	res.sendFile(__dirname + '/comments-list.css');
});