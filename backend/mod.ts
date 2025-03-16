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
let crank_dirty = false;
let crank = 1;
/** Percentage */
let humidity_dirty = false;
let humidity = 0;
/** Meters */
let distance_dirty = false;
let distance = 0;

let crank_led_dirty = false;
let crank_led = false;

const hardware_url = Deno.env.get("HARDWARE_URL")!;
const hardware_websocket = new WebSocket(hardware_url);
let extension_websocket: WebSocket;

function add_hardware_event_listener() {
	hardware_websocket.addEventListener("message", (event) => {
		const message = JSON.parse(event.data) as HardwareMessage;

		console.log({ crank });

		// Crank
		if (message.type === "crank") {
			crank -= Number(message.value / 1000);
			if (crank < 0) {
				crank = 0;
			}
		}

		// Humidity
		if (message.type === "humidity") {
			if (humidity !== message.value) {
				humidity_dirty = true;
				humidity = message.value;
			}
		}

		// Distance
		if (message.type === "distance") {
			if (distance !== message.value) {
				distance_dirty = true;
				distance = message.value;
			}
		}
	});
}

setInterval(() => {
	crank = Math.min(crank + .1, 1);

	if (crank_led !== crank >= .5) {
		crank_led_dirty = true;
		crank_led = crank >= .5;
	}
}, 1000);

function add_hardware_event_sender() {
	setInterval(() => {
		if (crank_led_dirty) {
			crank_led_dirty = false;
			hardware_websocket.send(
				JSON.stringify(
					{
						type: "crank-led",
						value: crank_led,
					} satisfies HardwareCrankLedMessage,
				),
			);
		}
	}, 1000);
}

function add_extension_event_sender() {
	setInterval(() => {
		// Crank
		if (crank_dirty) {
			crank_dirty = false;
			extension_websocket.send(JSON.stringify(
				{
					type: "crank",
					value: crank,
				} satisfies extension.CrankMessage,
			));
		}

		// Humidity
		if (humidity_dirty) {
			humidity_dirty = false;
			extension_websocket.send(JSON.stringify(
				{
					type: "humidity",
					value: humidity,
				} satisfies extension.HumidityMessage,
			));
		}

		
		// Distance
		if (distance_dirty) {
			distance_dirty = false;
			extension_websocket.send(JSON.stringify(
				{
					type: "distance",
					value: distance,
				} satisfies extension.DistanceMessage,
			));
		}
	}, 1000);
}

hardware_websocket.addEventListener("open", () => {
	console.log("Hardware websocket opened");
});

hardware_websocket.addEventListener("close", () => {
	console.log("Hardware websocket closed");
});

add_hardware_event_listener();
add_hardware_event_sender();

export default {
	fetch(request) {
		if (request.headers.get("upgrade") !== "websocket") {
			return new Response("Nope, use WebSockets");
		}

		const { socket, response } = Deno.upgradeWebSocket(request);

		extension_websocket = socket;

		extension_websocket.addEventListener("open", () => {
			console.log("Extension websocket opened");
		});

		extension_websocket.addEventListener("close", () => {
			console.log("Extension websocket closed");
		});

		add_extension_event_sender();

		return response;
	},
} satisfies Deno.ServeDefaultExport;
