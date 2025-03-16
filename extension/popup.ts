import type * as extension from "./dom.ts";

const crank_meter = document.getElementById("crank")! as HTMLMeterElement;
const humidity_meter = document.getElementById("humidity")! as HTMLMeterElement;
const distance_meter = document.getElementById("distance")! as HTMLMeterElement;

const websocket = new WebSocket("ws://localhost:8000");

websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as extension.Message;

	// Crank
	if (message.type === "crank") {
		crank_meter.value = 100 - message.value * 100;
	}

	// Humidity
	if (message.type === "humidity") {
		humidity_meter.value = message.value;
	}

	// Distance
	if (message.type === "distance") {
		distance_meter.value = message.value / 10;
	}
});
