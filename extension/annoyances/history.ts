addEventListener("popstate", (event) => {
	console.log(event);
	history.forward();
	// event.preventDefault();
});
