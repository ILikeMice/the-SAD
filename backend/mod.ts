import type * as extension from "../extension/dom.ts";

interface HardwareCrankMessage {
	type: "crank";
	value: number;
}

interface HardwareHumidityMessage {
	type: "humidity";
	value: number;
}

interface HardwareDistanceMessage {
	type: "distance";
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

/** Something */
let crank = 1;
/** Percentage */
let humidity = 0;
/** Meters */
let distance = 0;

let crank_led = false;

const hardware_url = Deno.env.get("HARDWARE_URL")!;
const hardware_websocket = new WebSocket(hardware_url);

function add_hardware_event_listener() {
	hardware_websocket.addEventListener("open", () => {
		console.log("Hardware websocket opened");
	});

	hardware_websocket.addEventListener("message", (event) => {
		const message = JSON.parse(event.data) as HardwareMessage;

		// Crank
		if (message.type === "crank") {
			crank -= Number(message.value / 1000);
			if (crank < 0) {
				crank = 0;
			}
		}

		// Humidity
		if (message.type === "humidity") {
			humidity = message.value;
		}

		// Distance
		if (message.type === "distance") {
			distance = message.value;
		}
	});

	hardware_websocket.addEventListener("close", () => {
		console.log("Hardware websocket closed");
	});
}

setInterval(() => {
	crank = Math.min(crank + .1, 1);
	crank_led = crank >= .5;
}, 1000);

function add_hardware_event_sender() {
	setInterval(() => {
		hardware_websocket.send(
			JSON.stringify(
				{
					type: "crank-led",
					value: crank_led,
				} satisfies HardwareCrankLedMessage,
			),
		);
	}, 1000);
}

function add_extension_event_listeners(socket: WebSocket) {
	socket.addEventListener("open", () => {
		console.log("Extension websocket opened");
	});

	socket.addEventListener("close", () => {
		console.log("Extension websocket closed");
	});
}

function add_extension_event_sender(socket: WebSocket) {
	setInterval(() => {
		// Crank
		socket.send(JSON.stringify(
			{
				type: "crank",
				value: crank,
			} satisfies extension.CrankMessage,
		));

		// Humidity
		socket.send(JSON.stringify(
			{
				type: "humidity",
				value: humidity,
			} satisfies extension.HumidityMessage,
		));

		// Distance
		socket.send(JSON.stringify(
			{
				type: "distance",
				value: distance,
			} satisfies extension.DistanceMessage,
		));
	}, 1000);
}

add_hardware_event_listener();
add_hardware_event_sender();

export default {
	fetch(request) {
		if (request.headers.get("upgrade") !== "websocket") {
			return new Response("Nope, use WebSockets");
		}

		const { socket, response } = Deno.upgradeWebSocket(request);

		add_extension_event_listeners(socket);
		add_extension_event_sender(socket);

		return response;
	},
} satisfies Deno.ServeDefaultExport;
