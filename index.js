const express = require("express");
const expressApp = express();
require("dotenv").config();
const http = require("http").createServer(expressApp);
const PORT = process.env.PORT;
const socket = require("socket.io")(http);

// http server listening on the port
http.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});

// making the public folder accessible to the browser
expressApp.use(express.static(__dirname + "/public"));

// sending the html file
expressApp.get("/", (req, res) => {
	return res.sendFile(__dirname + "/index.html");
});

// Socket

socket.on("connection", (socket) => {
	console.log("Connected...");

	socket.on("message", (msg) => {
		// bradcasting to other clients connected to the same socket
		socket.broadcast.emit("message", msg);
	});
});
