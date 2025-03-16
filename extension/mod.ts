const websocket = new WebSocket("ws://localhost:8000");

websocket.addEventListener("message", (event) => {
	// Send message to all tabs
	chrome.tabs.query({}, (tabs) => {
		for (const tab of tabs) {
			if (tab.id) {
				chrome.tabs.sendMessage(tab.id, event.data).catch((err) => {
					// Ignore errors from tabs that don't have our content script
					console.debug("Could not send message to tab:", tab.id, err);
				});
			}
		}
	});
});

// Also keep this for the popup
chrome.runtime.onMessage.addListener((message) => {
	console.log("Background script received message:", message);
});
