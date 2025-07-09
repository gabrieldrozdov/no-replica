// Queue to stop in-progress animations when toggling a filter
let animationQueue = [];

// Work nav filters
let filterTransition = false;
function toggleWorkFilter(filter) {

	// Don’t animate over another filter being activated
	if (filterTransition == true) {
		return
	}
	filterTransition = true;
	const workFilters = document.querySelector('.work-filters');
	workFilters.dataset.transition = 1;

	// Deselect all filters visually
	for (let navFilter of document.querySelectorAll('.work-filters-toggle')) {
		navFilter.dataset.active = 0;
	}

	// Activate current filter
	const activeFilterToggle = document.querySelector(`.work-filters-toggle[data-filter="${filter}"]`);
	activeFilterToggle.dataset.active = 1;

	// Tag items for filters
	if (filter != "All") {
		for (let workItem of document.querySelectorAll('.work-item')) {
			workItem.dataset.filtered = 0;
			let tags = workItem.dataset.tags.split(',');
			for (let tag of tags) {
				if (tag == filter) {
					workItem.dataset.filtered = 1;
				}
			}
		}
	} else {
		for (let workItem of document.querySelectorAll('.work-item')) {
			workItem.dataset.filtered = 1;
		}
	}

	// Clear all in-progress or existing animations
	for (let animation of animationQueue) {
		clearTimeout(animation);
	}
	animationQueue = [];

	// Bring in transition screen
	body.dataset.transition = 2;

	// Scroll to top
	setTimeout(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
	}, 500)

	for (let workItem of document.querySelectorAll('.work-item')) {

		// Unload all videos
		const videoSource = workItem.querySelector('source');
		if (videoSource != undefined) {
			videoSource.src = "";
		}

		// Filter out elements
		setTimeout(() => {
			if (parseInt(workItem.dataset.filtered) == 1) {
				workItem.dataset.hidden = 0;
			} else {
				workItem.dataset.hidden = 1;
			}
		}, 550)

		// Transition in visible elements
		setTimeout(() => {
			workItem.dataset.transition = 0
			if (workItem.getBoundingClientRect().top < window.innerHeight) {
				transitionIn(workItem);
			}
		}, 600)
	}
	
	setTimeout(() => {
		workFilters.dataset.transition = 0;
		body.dataset.transition = 0;
		filterTransition = false;
	}, 575)
}
for (let navFilter of document.querySelectorAll('.work-filters-toggle')) {
	navFilter.addEventListener('click', () => {toggleWorkFilter(navFilter.dataset.filter)});
}

// Lazy videos observer
const callback = new IntersectionObserver((entries, observer) => {
	
	// Loop the entries
	let delay = 0;
	entries.forEach(entry => {

		// Check if the element is intersecting with the viewport
		if (entry.isIntersecting) {

			if (!filterTransition) {
				transitionIn(entry.target, delay);
			}

			// Stop observing element (unused)
			// callback.unobserve(entry.target);
			
		} else {
			// Unload video (for better performance)
			let videoSource = entry.target.querySelector('source');
			if (videoSource != undefined) {
				videoSource.removeAttribute('src');
				entry.target.querySelector('video').pause();
				entry.target.querySelector('video').load();
			}
		}

		delay++;
	});
}, {
	root: null, // Use the viewport as the root
});

// Transition and lazy load videos
let colors = ['pink', 'blue', 'yellow', 'green'];
function transitionIn(workItem, delay) {
	workItem.dataset.initialized = 1;
	// Target elements
	const workItemMedia = workItem.querySelector('.work-item-media');
	const workItemInfo = workItem.querySelector('.work-item-info');

	// Animate in
	if (parseInt(workItem.dataset.transition) == 0) {
		animationQueue.push(setTimeout(() => {
			workItemMedia.dataset.active = 1;
		}, 200+delay*100))
		animationQueue.push(setTimeout(() => {
			workItemInfo.dataset.active = 1;
		}, 500+delay*100))

		// Play video
		const videoSource = workItem.querySelector('source');
		if (videoSource != undefined) {
			videoSource.src = videoSource.dataset.src;
			workItem.querySelector('video').load();
		}
	}
}

// Observe work items
for (let workItem of document.querySelectorAll('.work-item')) {
	workItem.dataset.transition = 0;
	callback.observe(workItem);
}