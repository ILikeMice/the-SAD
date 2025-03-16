import "./annoyances/scams.ts";
import { crank } from "./annoyances/crank.ts";
import { humidity } from "./annoyances/humidity.ts";
import { distance } from "./annoyances/distance.ts";


const cspHeaderNames = ["content-security-policy", "content-security-policy-report-only"];

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

// @ts-ignore shut up
browser.runtime.onMessage.addListener((data) => {
	const message = JSON.parse(data) as Message;

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

// @ts-ignore shut up
function removeCSPHeaders(details: browser.webRequest.HttpHeaders): browser.webRequest.BlockingResponse {
	// @ts-ignore shut up
  	const filteredHeaders = details.responseHeaders?.filter(header => !cspHeaderNames.includes(header.name.toLowerCase()));
	console.log("Filtered headers:", filteredHeaders);
  	return { responseHeaders: filteredHeaders };
}

// @ts-ignore shut up
browser.webRequest.onHeadersReceived.addListener(
  	removeCSPHeaders,
  	{ urls: ["<all_urls>"] },
  	["blocking", "responseHeaders"]
);
