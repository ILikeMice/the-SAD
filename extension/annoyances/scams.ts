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
];

let popup_used = false;

addEventListener("scroll", () => {
	if (popup_used) return;

	popup_used = true;

	const scam = SCAMS[Math.floor(Math.random() * SCAMS.length)];

	const popup = document.createElement("dialog");
	popup.open = true;
	popup.classList.add("popup");

	const width = 300 + 300 * Math.random();

	popup.style.left = `${(innerWidth - width) * Math.random()}px`;
	popup.style.width = `${width}px`;

	const image = document.createElement("img"); // @ts-ignore skibidi
	image.src = browser.runtime.getURL(`./images/${scam[0]}`); 

	const text = document.createElement("p");
	text.textContent = scam[1];

	const button = document.createElement("button");
	button.textContent = "Close forever";

	button.addEventListener("click", () => {
		popup.remove();
		popup_used = false;
	});

	popup.append(image, text, button);
	document.body.append(popup);

	requestAnimationFrame(() => {
		popup.style.top = `${(innerHeight - popup.clientHeight) * Math.random()}px`;
	});
});
