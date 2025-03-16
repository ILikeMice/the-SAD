const websocket = new WebSocket("ws://localhost:8000");

websocket.addEventListener("message", (event) => {
	// @ts-ignore shut up
	console.log(event);
	chrome.runtime.sendMessage(event.data);
});
