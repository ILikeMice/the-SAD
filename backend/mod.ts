import type { CrankMessage } from "../messages.ts";

export default {
	fetch(request) {
		if (request.headers.get("upgrade") === "websocket") {
			const { socket, response } = Deno.upgradeWebSocket(request);

			setInterval(() => {
				socket.send(JSON.stringify(
					{
						type: "crank-message",
						value: Math.random(),
					} satisfies CrankMessage,
				));
			}, 1000);

			return response;
		}

		return new Response("Nope");
	},
} satisfies Deno.ServeDefaultExport;
