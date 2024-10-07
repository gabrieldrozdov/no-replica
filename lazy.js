// Create an observer
const lazyObserver = new IntersectionObserver((entries, lazyObserver) => {
	// Loop the entries
	entries.forEach(entry => {
		// Check if the element is intersecting with the viewport
		if (entry.isIntersecting) {
			// Lazy loading videos
			let videoSource = entry.target.querySelector('source');
			videoSource.src = videoSource.dataset.src;
			entry.target.load();

			// Stop observing element
			lazyObserver.unobserve(entry.target);
		} else {
			// Unused else state
		}
	});
});

// Add observer for lazy load
for (let lazyItem of document.querySelectorAll('video')) {
	lazyObserver.observe(lazyItem);
}