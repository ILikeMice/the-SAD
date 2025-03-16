import type * as extension from "./dom.ts";

const crank_meter = document.getElementById("crank")! as HTMLMeterElement;
const humidity_meter = document.getElementById("humidity")! as HTMLMeterElement;
const distance_meter = document.getElementById("distance")! as HTMLMeterElement;

chrome.runtime.onMessage.addListener((data) => {
	const message = JSON.parse(data) as extension.Message;
	console.log(message);

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
