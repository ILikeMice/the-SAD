const websocket = new WebSocket("ws://localhost:8000");

websocket.addEventListener("message", (event) => {
	// @ts-ignore shut up
	browser.runtime.sendMessage(event.data);
});
