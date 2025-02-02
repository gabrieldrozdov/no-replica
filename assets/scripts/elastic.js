let lastScrollY = window.scrollY;
let lastTimestamp = Date.now();
let scrollVelocity = 0;
let velocitySmoothness = 0.1; // Smoothness factor for velocity calculation
let velocityDecay = 0.9; // Factor to reduce velocity after each frame to simulate friction

// Function to calculate scroll velocity
const getScrollVelocity = () => {
    const currentScrollY = window.scrollY;
    const currentTimestamp = Date.now();

    // Calculate the time difference (in milliseconds)
    const timeDiff = currentTimestamp - lastTimestamp;
    if (timeDiff === 0) return; // Prevent division by zero in case of very rapid events

    // Calculate the change in scroll position (in pixels)
    const delta = currentScrollY - lastScrollY;

    // Calculate the velocity (in pixels per millisecond)
    const velocity = delta / timeDiff;

    // Apply smoothness and decay to the velocity for a smoother, more stable value
    scrollVelocity = scrollVelocity * (1 - velocitySmoothness) + velocity * velocitySmoothness;

    // Apply friction/decay to simulate gradual stopping
    scrollVelocity *= velocityDecay;

    // Update the previous scroll position and timestamp for the next calculation
    lastScrollY = currentScrollY;
    lastTimestamp = currentTimestamp;

    // If the velocity is near zero, reset it to zero
    if (Math.abs(scrollVelocity) < 0.001) {
        scrollVelocity = 0;
    }
};

// Listen for the scroll event
window.addEventListener('scroll', () => {
    getScrollVelocity();
});

// Scroll friction
function scrollFriction() {
	scrollVelocity *= 0.9;
	// If the velocity is near zero, reset it to zero
    if (Math.abs(scrollVelocity) < 0.001) {
        scrollVelocity = 0;
    }
	requestAnimationFrame(scrollFriction)
}
scrollFriction();

// Initialize elastic scroll elements
for (let elasticElement of document.querySelectorAll('.elastic')) {
	elasticElement.dataset.elasticTarget = 0;
	elasticElement.dataset.elasticPos = 0;
	if (!elasticElement.hasAttribute('data-elastic-scaler')) {
		elasticElement.dataset.elasticScaler = 10+Math.random()*5;
	}
	if (!elasticElement.hasAttribute('data-elastic-friction')) {
		elasticElement.dataset.elasticFriction = 10+Math.random()*5;
	}
}

// Animate elastic scroll elements
function elasticScroll() {
	for (let elasticElement of document.querySelectorAll('.elastic')) {
		const scaler = parseInt(elasticElement.dataset.elasticScaler);
		const friction = parseInt(elasticElement.dataset.elasticFriction);
		const currentPos = parseFloat(elasticElement.dataset.elasticPos);
		elasticElement.dataset.elasticTarget = scrollVelocity*scaler;
		elasticElement.dataset.elasticPos = currentPos - (currentPos + scrollVelocity*scaler)/friction;
		if (Math.abs(elasticElement.dataset.elasticPos) < 0.5) {
			elasticElement.dataset.elasticPos = 0;
		}
		elasticElement.style.transform = `translateY(${elasticElement.dataset.elasticPos}px)`;
	}
	requestAnimationFrame(elasticScroll)
}
if (window.innerWidth >= 600) {
	elasticScroll();
}