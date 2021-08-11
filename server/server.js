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
const io = require('socket.io')(server)

let counter = 0;
io.on('connection', (socket) => {
  counter++;
  console.log(counter+' someone connected');
});

server.listen(port, ()=>{
  console.log("server running on "+port);

})