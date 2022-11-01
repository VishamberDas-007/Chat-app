const socket = io(); // initializing the io method

let userName;
const textArea = document.querySelector("#text-area"); // getting the div with its id name
const messageArea = document.querySelector(".message-area"); // getting the div wiith its class name

// will proceed only after receiving the user name
do {
	userName = prompt("Enter your name");
} while (!userName.trim());

// add event listner accepting the message on enter key
textArea.addEventListener("keyup", (e) => {
	if (e.key === "Enter" && e.target.value.trim("Enter").length > 0) {
		sendMessage(e.target.value);
	}
});

// function to send the message for appending || wrapping up the message
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

// function to append the message into the message area
function appendMessage(msg, type) {
	const div = document.createElement("div");
	const span = document.createElement("span");
	div.classList.add(type);

	// html element is created for the message content
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

// function to scroll to the bottom of the chat
function scrollToBottom() {
	messageArea.scrollTop = messageArea.scrollHeight;
}
