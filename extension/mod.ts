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

websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as Message;

	console.log(message);

	if (message.type === "crank") {
		overlay.style.opacity = `${message.value}`;
	}
});
