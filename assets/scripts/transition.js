let transitionActive = false;
function transitionOutPage(destination) {
	transitionActive = true;
	const nav = document.querySelector('.nav');
	nav.dataset.inactive = 1;

	const root = document.querySelector('html');
	root.style.scrollBehavior = 'unset';

	const transitionLength = window.scrollY > window.innerHeight ? 750 : 250;

	smoothRamp(
		parseFloat(window.scrollY), // Start value
		0, // Target value
		transitionLength, // Duration (ms)
		(value) => {
			window.scrollTo(0, value);
		},
		() => {
			// console.log("Animation complete!");
		}
	);

	for (let elmnt of document.querySelectorAll('.page-content > *')) {
		elmnt.style.animation = "unset";
		elmnt.style.transition = `opacity ${transitionLength/1000}s`;
		setTimeout(() => {
			elmnt.style.opacity = "0";
		}, 50)
	}
	if (window.innerWidth < 395) {
		const navLinks = document.querySelector('.nav-links');
		navLinks.dataset.transition = 1;
	}
	setTimeout(() => {
		window.location.href = destination;
	}, transitionLength)
}

function smoothRamp(startValue, targetValue, duration, onUpdate, onComplete) {
	const startTime = performance.now(); // Start time
	const change = targetValue - startValue; // Difference between target and start

	function animate(currentTime) {
		const elapsedTime = currentTime - startTime; // Time elapsed since animation started
		const progress = Math.min(elapsedTime / duration, 1); // Normalize to [0, 1]

		// Interpolation (ease-in-out for smooth effect)
		const easedProgress = easeInOutCubic(progress);
		const currentValue = startValue + change * easedProgress;

		// Update callback
		onUpdate(currentValue);

		// Continue or finish animation
		if (progress < 1) {
			requestAnimationFrame(animate);
		} else if (onComplete) {
			onComplete();
		}
	}

	requestAnimationFrame(animate);
}

// Easing function
function easeInOutCubic(x) {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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
		const nav = document.querySelector('.nav');
		nav.dataset.inactive = 0;
		transitionActive = false;
		for (let elmnt of document.querySelectorAll('.page-content > *')) {
			elmnt.style.animation = "";
			elmnt.style.transition = "";
			elmnt.style.opacity = "";
		}
	}
});