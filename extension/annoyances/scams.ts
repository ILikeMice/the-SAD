import { element } from "../element.ts";

const SCAMS = [
	[
		"credit-card.jpeg",
		"🥇 You ship: Just your credit card details.We promise to ship: double the money!!! Only for 3 minutes! 💡📌📌 GET yOURS NOW or else,",
	],
	[
		"orpheus-picos.jpeg",
		"🫸🫸 GET 100 free better than official ORPHEUS PICOS now now nwo!!!!!! OMG get it wee ned STUFF, not to totaly steal your 🥹🥹 MONEY..",
	],

	[
		"framework.jpeg",
		"Why would you buy something that breaks forever, when you can have something that still breaks but can fix with work and money? Really? I need to know! I'm like dying here.",
	],
	[
		"rpi.jpeg",
		"Make a terminal app in #terminal-craft and get a free Raspberry Pi! Just kidding, we'll take your money and give you nothing. But you can still make a terminal app.",
	],
	[
		"scrapyard.png",
		"Go to cloudflare (for absolutely free!!1!1!!!!), make a silly project, and get totally absolutely free prizes!! Somehow exists all around the world!!",
	],
];

let popups = 0;

addEventListener("scroll", () => {
	if (Math.random() < 0.95 || popups >= 5) return;
	popups += 1;

	const scam = SCAMS[Math.floor(Math.random() * SCAMS.length)];

	const image = element("img", {
		src: chrome.runtime.getURL(`./images/${scam[0]}`),
	});

	const text = element("p", undefined, [scam[1]]);
	const button = element("button", undefined, ["Close forever"]);

	button.addEventListener("click", () => {
		popup.remove();
		popups -= 1;
	});

	const popup = element("div", { class: "popup" }, [
		image,
		text,
		button,
	]);

	const width = 300 + 300 * Math.random();

	popup.style.left = `${(innerWidth - width) * Math.random()}px`;
	popup.style.width = `${width}px`;

	document.body.append(popup);

	requestAnimationFrame(() => {
		popup.style.top = `${(innerHeight - popup.clientHeight) * Math.random()}px`;
	});
});
