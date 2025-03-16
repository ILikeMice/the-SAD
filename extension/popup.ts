import type * as extension from "./mod.ts";

const websocket = new WebSocket("ws://localhost:8000");
const crank_meter = document.getElementById("crank")! as HTMLMeterElement;
const humidity_meter = document.getElementById("crank")! as HTMLMeterElement;
const distance_meter = document.getElementById("crank")! as HTMLMeterElement;

websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as extension.Message;

	// Crank
	if (message.type === "crank") {
		crank_meter.value = message.value / 2000;
	}

	// Humidity
	if (message.type === "humidity") {
		humidity_meter.value = message.value;
	}

	// Distance
	if (message.type === "distance") {
		distance_meter.value = message.value;
	}
});
