// Work nav filters
let filterTransition = false;
function toggleWorkFilter(filter) {
	if (filterTransition == true) {
		return
	}
	filterTransition = true;
	
	const workFilters = document.querySelector('.work-filters');
	workFilters.dataset.transition = 1;

	// Scroll to top
	const work = document.querySelector('.work');
	work.scrollIntoView();

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

	for (let workItem of document.querySelectorAll('.work-item')) {

		// Transition out
		workItem.dataset.transition = 1;

		setTimeout(() => {
			const workItemContent = workItem.querySelector('.work-item-content');
			const workItemMedia = workItem.querySelector('.work-item-media');
			const workItemInfo = workItem.querySelector('.work-item-info');
			const workItemCursor = workItem.querySelector('.work-item-cursor');

			// Reset all states
			workItemContent.dataset.transition = 0;
			workItemMedia.dataset.active = 0;
			workItemInfo.dataset.active = 0;
			workItemContent.style.transition = 'unset';
			workItemCursor.style.transition = 'unset';

			// Reposition in preparation for transition in
			setTimeout(() => {
				workItemContent.style.transform = `translate(${Math.random() < .5 ? -200 : 200}vw, ${Math.random()*200-100}vh)`;
				workItemCursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)`;
				workItem.dataset.transition = 0;
			}, 25)
		}, 200)

		// Transition in visible elements
		setTimeout(() => {
			if (workItem.getBoundingClientRect().top < window.innerHeight) {
				transitionIn(workItem);
			}

			// Filter out elements
			if (parseInt(workItem.dataset.filtered) == 1) {
				workItem.dataset.active = 1;
			} else {
				workItem.dataset.active = 0;
			}
		}, 300)
	}
	
	setTimeout(() => {
		workFilters.dataset.transition = 0;
		filterTransition = false;
	}, 500)
}
for (let navFilter of document.querySelectorAll('.work-filters-toggle')) {
	navFilter.addEventListener('click', () => {toggleWorkFilter(navFilter.dataset.filter)});
}

let animationQueue = [];

// Lazy videos observer
const callback = new IntersectionObserver((entries, observer) => {

	// Deactivate lazy loading during transitions (from transition.js)
	if (transitionActive) {
		return
	}
	
	// Loop the entries
	entries.forEach(entry => {

		// Check if the element is intersecting with the viewport
		if (entry.isIntersecting) {

			if (!filterTransition) {
				transitionIn(entry.target);
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
	});
}, {
	root: null, // Use the viewport as the root
	rootMargin: '200px 0px', // Add offset to the top and bottom
	threshold: 0, // Trigger when % of the element is visible
});

// Observe work items
const colors = ['pink', 'blue', 'yellow', 'green'];
for (let workItem of document.querySelectorAll('.work-item')) {
	const workItemContent = workItem.querySelector('.work-item-content');
	const workItemMedia = workItem.querySelector('.work-item-media');
	// workItemMedia.style.setProperty('--primary', `var(--${colors[Math.floor(Math.random()*colors.length)]})`);
	workItemContent.style.transform = `translate(${Math.random() < .5 ? -200 : 200}vw, ${Math.random()*200-100}vh)`;
	workItemContent.dataset.transition = 0;
	callback.observe(workItem);
}

// Transition and lazy load videos
function transitionIn(elmnt) {
	elmnt.dataset.initialized = 1; // prevents cursor flash
	const workItemContent = elmnt.querySelector('.work-item-content');
	const workItemMedia = elmnt.querySelector('.work-item-media');
	const workItemInfo = elmnt.querySelector('.work-item-info');
	const workItemCursor = elmnt.querySelector('.work-item-cursor');
	const videoSource = elmnt.querySelector('source');
	if (parseInt(workItemContent.dataset.transition) == 0) {
		workItemContent.dataset.transition = 1;
		let transitionLength = Math.random()*.5+.5;
		animationQueue.push(setTimeout(() => {
			workItemContent.style.transition = `transform ${transitionLength}s`;
			workItemContent.style.transform = 'scale(0.8)';
			animationQueue.push(setTimeout(() => {
				workItemContent.style.transition = `transform .3s`;
				workItemContent.style.transform = 'scale(1)';
				workItemCursor.style.transition = `transform ${transitionLength+.25}s cubic-bezier(0.76, 0, 0.24, 1)`;
				workItemMedia.dataset.active = 1;
				if (videoSource != undefined) {
					videoSource.src = videoSource.dataset.src;
					elmnt.querySelector('video').load();
				}
			}, transitionLength*1000))
			animationQueue.push(setTimeout(() => {
				workItemCursor.style.transform = `translate(${Math.random() < .5 ? -200 : 200}vw, ${Math.random()*200-100}vh)`;
				workItemInfo.dataset.active = 1;
			}, transitionLength*1000+200))
		}, Math.random()*100+50))
	} else {
		if (videoSource != undefined) {
			videoSource.src = videoSource.dataset.src;
			elmnt.querySelector('video').load();
		}
	}
}

// Add elastic parameters
for (let elasticElement of document.querySelectorAll('.work-item-elastic')) {
	elasticElement.dataset.elasticScaler = Math.round(Math.random()*30+20);
	elasticElement.dataset.elasticFriction = Math.round(Math.random()*5+10);
	elasticElement.classList.add('elastic');
}
for (let elasticElement of document.querySelectorAll('.work-item-media-elastic')) {
	elasticElement.dataset.elasticScaler = Math.round(Math.random()*5+5);
	elasticElement.dataset.elasticFriction = Math.round(Math.random()*5+10);
	elasticElement.classList.add('elastic');
}