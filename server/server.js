const express = require("express");
const http = require("http");

// To define our application
const app = express();
// To give the path to our client
const clientPath = `${__dirname}/../client`;
// To use express to host the client
app.use(express.static(clientPath));
// To use http to serve the app that express provides
const server = http.createServer(app);
// http://localhost:3000
const port = 3000;

// The io variable is now the entry point of all the sockets connected to the server
const io = require("socket.io")(server);
const format = require('../client/js/format');

const botName = "Bot";

let counter = 0;

io.on("connection", function (socket) {
  counter++;
  console.log(counter + " someone connected");

  // Handle chat events

  // Welcome message for a user
  socket.emit("displayMessage", format(botName, "Welcome to the chat!"));

  // Socket.IO makes it easy to send events to all the connected clients.
  // Please note that broadcasting is a server-only feature.
  socket.broadcast.emit("displayMessage", format(botName, "A user has joined the chat"));

  // Handling disconnect event
  socket.on("disconnect", function () {
    io.emit('displayMessage', format(botName,'A user has left the chat'));
  });

  socket.on("sendToAll", (message) => {
    io.emit("displayMessage", format('User',message));
  });

  socket.on("sendToMe", (message) => {
    socket.emit("displayMessage", format('User',message));
  });
});

server.listen(port, () => {
  console.log("server running on " + port);
});
