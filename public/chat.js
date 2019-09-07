//Make connection
var socket = io.connect('process.env.PORT' || 'http://localhost:8080')

//query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events
button.addEventListener('click', function(){
    //setting up an object that grabs the val of the user input in th chat
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})
// Here we set up an event listener to call on when there is a key pressed on
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

//Listen for events
socket.on('chat', function(data){
    //we output the data to the DOM
    //remember that this event happens once we click 'send', upon clicking send we want to get rid of the 'is typing' bradcast
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':<strong> ' + data.message + "</p>"
})

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing...' + '<em></p>'
})