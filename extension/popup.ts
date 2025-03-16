import type * as extension from "./dom.ts";

const crank_meter = document.getElementById("crank");
const humidity_meter = document.getElementById("humidity")! as HTMLMeterElement;
const distance_meter = document.getElementById("distance")! as HTMLMeterElement;

chrome.runtime.onMessage.addListener((data) => {
	const message = JSON.parse(data) as extension.Message;
	console.log(message)

	// Crank
	if (message.type === "crank") {
		document.getElementById("crank").value = message.value / 2000;
	}

	// Humidity
	if (message.type === "humidity") {
		document.getElementById("humidity").value = message.value;
	}

	// Distance
	if (message.type === "distance") {
		document.getElementById("distance").value = message.value;
	}
});
