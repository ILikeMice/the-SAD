const websocket = new WebSocket("ws://localhost:8000");

websocket.addEventListener("message", (event) => {
	console.log(event);
	// @ts-ignore shut up
	browser.runtime.sendMessage(event.data);
});
