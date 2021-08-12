// Make connection
let socket = io.connect();

// Query DOM
let btnMe = document.querySelector(".sendToMe");
btnAll = document.querySelector(".sendToAll");
nickname = document.getElementById("nickname");
message = document.getElementById("message");
output = document.getElementById("output");
feedback = document.getElementById("feedback");

// Timestamp
var d = new Date();
var timestamp = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
d.getHours() + ":" + d.getMinutes();


// Emit events
btnAll.addEventListener("click", function () {
  message = document.getElementById("message").value;
  socket.emit("sendToAll", message);
});

btnMe.addEventListener("click", function () {
  message = document.getElementById("message").value;
  socket.emit("sendToMe", message);
});

// Listen for events and output it to the DOM

// Listen for events and output to the DOM 
socket.on("displayMessage", (message) => {
    div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML += `
    <p class=timestamp>${timestamp}</p>
    <p>${message}</p>
    `;
    output.appendChild(div);
  });

/* socket.on("displayMessage", (message) => {
  output = document.getElementById("output");
  output.innerText += message;
  output.innerHTML += "<br>";
}); */
