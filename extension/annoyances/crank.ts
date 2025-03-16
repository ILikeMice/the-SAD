import { element } from "../element.ts";

const overlay = element("div", { class: "overlay" });

document.body.append(overlay);

export function crank(opacity: number) {
	console.log(opacity);
	overlay.style.opacity = `${opacity}`;
}
