import "./annoyances/scams.ts";
import { element } from "./element.ts";

export interface CrankMessage {
	type: "crank";
	value: number;
}

export type Message = CrankMessage;

import("./imports.ts");

const websocket = new WebSocket("ws://localhost:8000");

const overlay = element("div", { class: "overlay" });

document.body.append(overlay);

let crank = 0;
let humidity = 0;
let distance = null;
let maxfontsize = 800;

websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as Message;

	console.log(message);

	if (message.type === "crank") {
		overlay.style.opacity = `${message.value}`;
		crank += Number(message.value.toFixed(1));

		if (crank >= 1) {
			crank = 1;
			console.log("sets");
		}
		globalThis.localStorage.setItem("crank", crank.toString());
		overlay.style.opacity = crank.toString();
		console.log(crank);
		browser.runtime.sendMessage(
			{ type: "crank", value: crank },
			function (response) {
				console.log(response.farewell);
			},
		);
	} else if (message.type === "humidity") {
		console.log("humidity");
		humidity += Number(message.value.toFixed(1));
		if (humidity >= 1) {
			humidity = 1;
		}
		console.log(humidity);
		chrome.runtime.sendMessage(
			{ type: "crank", value: humidity },
			function (response) {
				console.log(response.farewell);
			},
		);
	} else if (message.type === "distance") {
		console.log("distance");
		distance = message.value;
		document.body.style.fontSize = `${maxfontsize - (1000 - distance * 10)}px`;
		console.log(distance);
	}
});
