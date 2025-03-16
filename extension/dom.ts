import "./annoyances/scams.ts";
import { crank } from "./annoyances/crank.ts";
import { humidity } from "./annoyances/humidity.ts";
import { distance } from "./annoyances/distance.ts";

export interface CrankMessage {
	type: "crank";
	value: number;
}

export interface HumidityMessage {
	type: "humidity";
	value: number;
}

export interface DistanceMessage {
	type: "distance";
	value: number;
}

export type Message = CrankMessage | HumidityMessage | DistanceMessage;

const websocket = new WebSocket("ws://localhost:8000");

// @ts-ignore shut up
websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as Message;

	console.log("etauhoeush", message);

	// Crank
	if (message.type === "crank") {
		crank(message.value);
	}

	// Humidity
	if (message.type === "humidity") {
		humidity(message.value);
	}

	// Distance
	if (message.type === "distance") {
		distance(message.value);
	}
});
