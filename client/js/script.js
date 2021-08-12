// Make connection
let socket = io.connect();

// Query DOM
let btnMe = document.querySelector(".sendToMe");
btnAll = document.querySelector(".sendToAll");
nickname = document.getElementById("nickname");
input = document.getElementById("input");
output = document.querySelector(".output");

// Timestamp
var d = new Date();
var timestamp = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
d.getHours() + ":" + d.getMinutes();

// Emit events
btnAll.addEventListener("click", function () {
  message = document.getElementById("input").value;
  socket.emit("sendToAll", message);
});

btnMe.addEventListener("click", function () {
  message = document.getElementById("input").value;
  socket.emit("sendToMe", message);
});

// Message from server
// Listen for events
socket.on('displayMessage', (message) => {
    console.log(message);
    outputMessage(message);

    output.scrollTop = output.scrollHeight;
});

// And output it to the DOM 
function outputMessage(message) {
    div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML += `
    <p class=timestamp>${timestamp}</p>
    <p>${message}</p>
    `;
    output.appendChild(div);
  };

/* socket.on("displayMessage", (message) => {
  output = document.getElementById("output");
  output.innerText += message;
  output.innerHTML += "<br>";
}); */
