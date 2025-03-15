import type { Message } from "../messages.ts";
import "./annoyances/history.ts";

const websocket = new WebSocket("ws://localhost:8000");
const element = document.createElement("div");

element.style.backgroundColor = "black";
element.style.position = "fixed";
element.style.inset = "0px";
element.style.zIndex = "1000"
element.style.pointerEvents = "none";

let crank = 0;

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
        element.style.opacity = crank.toString();
        console.log(crank)
	}
});
