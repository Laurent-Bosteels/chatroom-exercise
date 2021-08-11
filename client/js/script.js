// Make connection
let socket = io.connect();

// Query DOM
let btnMe = document.getElementById("sendToMe");
    btnAll = document.getElementById("sendToAll");
    message = document.getElementById("message");
    output = document.getElementById("output");
    feedback = document.getElementById('feedback');

// Emit events
btnAll.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
    });
    message.value = "";
  });

// Listen for events
socket.on('chat', function(data) {
    output.innerHTML += '<br>'+data.message;
});
