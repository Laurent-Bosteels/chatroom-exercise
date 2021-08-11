// Make connection
let socket = io.connect();

// Query DOM
let btnMe = document.querySelector(".sendToMe");
    btnAll = document.querySelector(".sendToAll");
    nickname = document.getElementById("nickname");
    message = document.getElementById("message");
    output = document.getElementById("output");
    feedback = document.getElementById("feedback");

// Emit events
btnAll.addEventListener("click", function () {
  socket.emit("public", {
    nickname: nickname.value,
    message: message.value
  });
  nickname.value = "";
  message.value = "";
});

btnMe.addEventListener("click", function () {
  socket.emit("private", {
    nickname: nickname.value,
    message: message.value
  });
  nickname.value = "";
  message.value = "";
});

// Listen for events 
socket.on("displayMessage", function (data) {
  output.innerHTML += "<p><b>" + data.nickname + "</b></p>" + data.message;
});
