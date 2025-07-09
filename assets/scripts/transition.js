let body = document.querySelector('body');
setTimeout(() => {
	body.dataset.transition = 0;
}, 50)
function transitionOutPage(destination) {
	body.dataset.transition = 1;

	setTimeout(() => {
		window.location.href = destination;
	}, 500)
}

// Add listeners to all internal links
function addTransitionListeners(elmnt) {
	elmnt.addEventListener('click', (e) => {
		e.preventDefault();
		transitionOutPage(elmnt.href);
	})
}
for (let transitionLink of document.querySelectorAll('.transition-link')) {
	addTransitionListeners(transitionLink);
}

// Reset page state when navigating back
window.addEventListener('pageshow', (event) => {
	// `event.persisted` is true if the page is loaded from the bfcache (back/forward cache)
	if (event.persisted || performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
		body.dataset.transition = 0;
	}
});