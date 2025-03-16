export function element(
	name: string,
	attributes?: Record<string, string>,
	children?: (Node | string)[],
) {
	const element = document.createElement(name);

	if (attributes) {
		for (const [name, value] of Object.entries(attributes)) {
			element.setAttribute(name, value);
		}
	}

	if (children) {
		element.append(...children);
	}

	return element;
}
