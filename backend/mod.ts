import type { CrankMessage } from "../extension/mod.ts";

interface HardwareCrankMessage {
	type: "crank";
	value: number;
}

interface HardwareDistanceMessage {
	type: "distance";
	value: number;
}

interface HardwareHumidityMessage {
	type: "humidity";
	value: number;
}

interface HardwareCrankLedMessage {
	type: "crank-led";
	value: boolean;
}

type HardwareMessage =
	| HardwareCrankMessage
	| HardwareDistanceMessage
	| HardwareHumidityMessage;

/** Meters */
let distance = 0;
/** Percentage */
let humidity = 0;
/** Something */
let crank = 0;

const hardware_url = Deno.env.get("HARDWARE_URL")!;
const hardware_websocket = new WebSocket(hardware_url);
let extension_websocket: WebSocket;

hardware_websocket.addEventListener("open", () => {
	console.log("Hardware websocket opened");
});

let previous_crank = 0;

setInterval(() => {
	crank += .1;
}, 1000);

hardware_websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as HardwareMessage;

	console.log(message);

	if (message.type === "crank") {
		if (
			Math.abs(message.value - previous_crank) < 100 &&
			message.value !== previous_crank
		) {
			console.log("here");
			crank -= .1;
		}

		crank = Math.min(Math.max(0, crank), 1);

		extension_websocket?.send(
			JSON.stringify(
				{ type: "crank", value: crank } satisfies CrankMessage,
			),
		);

		previous_crank = message.value;
	} else if (message.type === "humidity") {
		humidity = message.value;
	} else if (message.type === "distance") {
		distance = message.value;
	}
});

hardware_websocket.addEventListener("close", () => {
	console.log("Hardware websocket closed");
});

export default {
	fetch(request) {
		if (request.headers.get("upgrade") === "websocket") {
			const { socket, response } = Deno.upgradeWebSocket(request);

			extension_websocket = socket;

			extension_websocket.addEventListener("open", () => {
				console.log("Extension websocket opened");
			});

			extension_websocket.addEventListener("close", () => {
				console.log("Extension websocket closed");
			});

			return response;
		}

		return new Response("Nope");
	},
} satisfies Deno.ServeDefaultExport;

addEventListener("unload", () => {
	hardware_websocket.close();
});
