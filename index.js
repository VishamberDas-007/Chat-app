const express = require("express");
const expressApp = express();
require("dotenv").config();
const http = require("http").createServer(expressApp);

const PORT = process.env.PORT;

http.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});

expressApp.use(express.static(__dirname + "/public"));

expressApp.get("/", (req, res) => {
	return res.sendFile(__dirname + "/index.html");
});

// Socket

const socket = require("socket.io")(http);

socket.on("connection", (socket) => {
	console.log("Connected...");

	socket.on("message", (msg) => {
		socket.broadcast.emit("message", msg);
	});
});
