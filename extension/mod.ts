import type { Message } from "../messages.ts";
import "./annoyances/scams.ts";

const websocket = new WebSocket("ws://localhost:8000");
const element = document.createElement("div");
// import type { Message } from "../messages.ts";
import("./imports.ts");
// const element = document.createElement("div");

element.style.backgroundColor = "black";
element.style.position = "fixed";
element.style.inset = "0px";
element.style.zIndex = "1000"
element.style.pointerEvents = "none";

let crank = 0;
let humidity = 0;
let distance = null;
let maxfontsize = 800;

document.body.append(element);

console.log(element);

websocket.addEventListener("message", (event) => {
	const message = JSON.parse(event.data) as Message;
    console.log(message)

	if (message.type === "crank-message") {
		crank += Number(message.value.toFixed(1));
        
        if (crank >= 1) {
            crank = 1;
            console.log("sets")
        }
        globalThis.localStorage.setItem("crank", crank.toString());
        element.style.opacity = crank.toString();
        console.log(crank)
        chrome.runtime.sendMessage({ type: "crank", value: crank }, function(response) {
            console.log(response.farewell);
        });
	}

    if (message.type === "humidity-message") {
        console.log("humidity");
        humidity += Number(message.value.toFixed(1));
        if (humidity >= 1) {
            humidity = 1;
        }
        console.log(humidity)
        chrome.runtime.sendMessage({ type: "crank", value: humidity }, function(response) {
            console.log(response.farewell);
        });
    }

    if (message.type === "distance-message") {
        console.log("distance");
        distance = message.value;
        document.body.style.fontSize = `${maxfontsize - (1000-distance*10)}px`;
        console.log(distance);
    }
});