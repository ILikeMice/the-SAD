export function distance(distance: number) {
	const size = Math.min(Math.max(distance, 2), 75) / 75;
	console.log("Using size:", size, "from distance:", distance);
	// document.body.style.fontSize = `${size}em`;
}
