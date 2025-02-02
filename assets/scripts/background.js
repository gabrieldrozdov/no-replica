function startParallax() {
	let scrollPosition = 0;
	let parallaxOffset = 0;

	const body = document.querySelector('body');
	const easeFactor = 0.5; // The lower the value, the smoother the effect

	function smoothParallax() {
		// Get the current scroll position
		scrollPosition = window.scrollY;

		// Gradually ease to the target position
		parallaxOffset += (scrollPosition - parallaxOffset) * easeFactor;

		// Apply the background position
		body.style.backgroundPositionY = -(parallaxOffset * 0.5) + 'px';

		// Continue the animation
		requestAnimationFrame(smoothParallax);
	}

	// Start the animation
	smoothParallax();
}
startParallax();