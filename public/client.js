const socket = io();

let userName;
const textArea = document.querySelector("#text-area");
const messageArea = document.querySelector(".message-area");

do {
	userName = prompt("Enter your name");
} while (!userName);

textArea.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		sendMessage(e.target.value);
		// console.log(e.target.value);
	}
});

function sendMessage(msg) {
	let message = {
		name: userName,
		message: msg.trim(),
	};

	// append on the client side
	appendMessage(message, "outgoing-message");

	// scrolling to bottom of outgoing message
	scrollToBottom();

	// emptying the textarea value
	textArea.value = "";

	// now sending the message to server
	socket.emit("message", message);
}

function appendMessage(msg, type) {
	const div = document.createElement("div");
	const span = document.createElement("span");
	div.classList.add(type);

	const messageContent = `
    <h4>${msg.name}</h4>
    <p>${msg.message}</p>
    `;

	span.classList.add("span");
	span.innerHTML = messageContent;
	div.appendChild(span);
	messageArea.appendChild(div);
}

// receive the message from server

socket.on("message", (msg) => {
	appendMessage(msg, "incoming-message");

	// scrolling to bottom after any incoming message
	scrollToBottom();
});

function scrollToBottom() {
	messageArea.scrollTop = messageArea.scrollHeight;
}
