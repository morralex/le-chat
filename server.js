var express = require('express');
var socket = require('socket.io');

var app = express();

var PORT = process.argv.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// WE set up our app
var server = app.listen(PORT, function () {
    console.log("now listening on port " + PORT)
});

// we have to create static pages
app.use(express.static('public'));

//Socket Set Up

var io = socket(server);

// now socket.io is waiting for a connection to from a cliet
//we LISTEN UP for a conection
io.on('connection', function (socket) {
    console.log('made socket connection' + socket.id)
    //make connectin on the front end by establishing the socket cdn on the front and
    //src script tag at the bottom that refrences a seprerate js file with a connection to localhost

    //we want to get the data from the client 
    socket.on('chat', function (data) {
        //we want to grab the data entered by the client and send it to all the othe clients in the chat
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        // we use boradcast, to show other clients sharing the server
        socket.broadcast.emit('typing', data)
    })
});