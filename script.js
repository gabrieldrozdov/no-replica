// Logo animation
const colors = ['pink', 'yellow', 'blue'];
function initializeLogo() {
	const logo = document.querySelector('.logo');

	// Build logo and cursors
	let temp = "";
	for (let character of logo.innerText) {
		// Fix space characters
		if (character == " ") {
			character = "&nbsp;";
		}

		// Fix kerning
		let kerning = "";
		if (character == "R") {
			kerning = "letter-spacing: -.11em;";
		}

		// Determine origin and transition speed
		let origin = [Math.random()*200-100, -100];
		let trans = Math.random()*.5+.5;
		
		temp += `
			<span class="logo-letter" style="transform: translate(${origin[0]}vw, ${origin[1]}vh) scale(.8); transition: transform ${trans}s cubic-bezier(0.25, 1, 0.5, 1); ${kerning};" data-trans="${trans}" data-color="0">
				${character}
				<div class="logo-cursor" style="transition: transform ${trans*2}s cubic-bezier(0.76, 0, 0.24, 1); transform: translate(${Math.random()*50-25}%, ${Math.random()*50-25}%);">
					<svg viewBox="0 0 100 100">
						<polygon points="26.379 10 26.379 90 49.236 63.326 84.316 65.166 26.379 10"/>
					</svg>
				</div>
			</span>
		`;
	}
	logo.innerHTML = temp;

	// Animate logo
	for (let span of logo.querySelectorAll('span')) {
		if (span.innerText == " ") {
			continue
		}

		let newTrans = parseFloat(span.dataset.trans)*1000;
		setTimeout(() => {
			span.style.transform = "scale(.8)";

			// Determine destination for cursor
			let destination = [Math.random()*200-100, -100];

			setTimeout(() => {
				span.dataset.out = 1;
				span.style.transition = "transform .2s";
				span.style.transform = "";
				const cursor = span.querySelector('.logo-cursor');
				cursor.style.transform = `translate(${destination[0]}vw, ${destination[1]}dvh)`;

				// Start next stage of loop
				span.addEventListener('mousemove', () => {iterateLogoLetter(span)});
			}, newTrans+Math.random()*200)
		}, Math.random()*500+250)
	}
}
initializeLogo();

// Swap out logo letter with new colors
function iterateLogoLetter(letter) {
	// Prevent overlapping animations
	if (letter.dataset.animating == "true") {
		return
	} else {
		letter.dataset.animating = "true";
	}

	let trans = parseFloat(letter.dataset.trans);
	const cursor = letter.querySelector('.logo-cursor');
	cursor.style.transition = `transform .2s`;
	cursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)`;
	let newOrigin = [Math.random()*200-100, -100];

	// Bring cursor back in
	setTimeout(() => {
		letter.style.transform = `scale(.8)`;
		letter.dataset.out = 0;

		// Move letter out
		setTimeout(() => {
			letter.style.transition = `transform ${trans*2}s cubic-bezier(0.76, 0, 0.24, 1)`;
			letter.style.transform = `translate(${newOrigin[0]}vw, ${newOrigin[1]}vh)`;
			cursor.style.transition = `transform .5s cubic-bezier(0.5, 0, 0.75, 0)`;

			// Move letter in
			setTimeout(() => {
				// Iterate color
				let currentColor = parseInt(letter.dataset.color);
				currentColor++;
				if (currentColor > colors.length) {
					currentColor = 0;
				}
				letter.dataset.color = currentColor;

				letter.style.transform = `scale(.8)`;

				// Move cursor out
				setTimeout(() => {
					let destination = [Math.random()*200-100, -100];
					letter.dataset.out = 1;
					letter.style.transition = "transform .2s";
					letter.style.transform = "";
					cursor.style.transform = `translate(${destination[0]}vw, ${destination[1]}dvh)`;

					// Enable interaction
					setTimeout(() => {
						letter.dataset.animating = "false";
					}, 500)
				}, trans*2000)
			}, Math.random()*200+1000)
		}, 250)
	}, 200)
}

// Bring work nav in/out
document.addEventListener('scroll', detectNavState);
function detectNavState() {
	const workNav = document.querySelector('.work-nav');
	if (window.scrollY > 100) {
		workNav.dataset.active = 1;
	} else {
		workNav.dataset.active = 0;
	}
}

// Work nav filters
function toggleWorkFilter(filter) {
	const work = document.querySelector('.work');
	work.scrollIntoView();

	for (let navFilter of document.querySelectorAll('.work-nav-toggle')) {
		navFilter.dataset.active = 0;
	}

	const activeFilterToggle = document.querySelector(`.work-nav-toggle[data-filter="${filter}"]`);
	activeFilterToggle.dataset.active = 1;

	if (filter != "All") {
		for (let workItem of document.querySelectorAll('.work-item')) {
			workItem.dataset.active = 0;
			let tags = workItem.dataset.tags.split(',');
			for (let tag of tags) {
				if (tag == filter) {
					workItem.dataset.active = 1;
				}
			}
		}
	} else {
		for (let workItem of document.querySelectorAll('.work-item')) {
			workItem.dataset.active = 1;
		}
	}
}
for (let navFilter of document.querySelectorAll('.work-nav-toggle')) {
	navFilter.addEventListener('click', () => {toggleWorkFilter(navFilter.dataset.filter)});
}

// Open project page
let workData;
function openProject(projectKey) {
	// Fetch data if not already fetched
	if (workData == undefined) {
		fetch('/data.json')
			.then((response) => response.json())
			.then((json) => {
				workData = json;
				generateProjectInfo(projectKey);
			})
	} else {
		generateProjectInfo(projectKey);
	}
}
function generateProjectInfo(projectKey) {
	// Update URL
	if (!userTraversal) {
		window.history.pushState({project: projectKey}, "", `/work/${projectKey}/`);
	}

	const project = document.querySelector('.project');
	project.scrollTop = 0;
	const entry = workData[projectKey];

	// Generate links
	let projectLinks = "";
	if (entry['links'].length > 0) {
		projectLinks += `<div class="project-links">`;
		for (let projectLink of entry['links']) {
			projectLinks += `
				<a class="project-link" href="${projectLink[1]}" target="_blank">
					<span>${projectLink[0]}</span><span>&nearr;</span>
				</a>
			`;
		}
		projectLinks += `</div>`;
	}

	// Generate media
	let projectMedia = "";
	let projectMediaNumber = 1;
	for (let mediaItem of entry['media']) {
		let projectScrolled = true;
		if (projectMediaNumber > 1) {
			projectScrolled = false;
		}

		if (mediaItem["embed"] != "") {
			projectMedia += `
				<figure class="project-media-item" data-scrolled="${projectScrolled}">
					<div class="project-media-item-content">
						${mediaItem["embed"]}
					</div>
					<figcaption class="project-media-item-caption">
						<p>${mediaItem['desc']}</p>
					</figcaption>
				</figure>
			`;

		} else if (mediaItem['video'] != "") {
			projectMedia += `
				<figure class="project-media-item" data-scrolled="${projectScrolled}">
					<div class="project-media-item-content">
						<video autoplay muted loop playsinline disableRemotePlayback poster="${mediaItem['image']}" title="${mediaItem['desc']}">
							<source src="${mediaItem['video']}">
						</video>
					</div>
					<figcaption class="project-media-item-caption">
						<p>${mediaItem['desc']}</p>
					</figcaption>
				</figure>
			`;

		} else {
			projectMedia += `
				<figure class="project-media-item" data-scrolled="${projectScrolled}">
					<div class="project-media-item-content">
						<img alt="${mediaItem['desc']}" src="${mediaItem['image']}">
					</div>
					<figcaption class="project-media-item-caption">
						<p>${mediaItem['desc']}</p>
					</figcaption>
				</figure>
			`;
		}

		projectMediaNumber++;
	}

	// Format desc
	let projectDesc = "";
	if (entry['desc'] != "") {
		projectDesc = `
			<div class="project-desc">
				${entry['desc']}
			</div>
		`;
	}

	// Put it all together
	let projectContent = `
		<div class="project-info">
			<div class="project-nav">
				<button class="project-nav-logo" onclick="closeProject();">&larr;&nbsp;&nbsp;View all projects</button>
			</div>
			<h3 class="project-title">${entry['name']}</h3>
			<p class="project-tagline">${entry['caption']}</p>
			${projectDesc}
			${projectLinks}
		</div>

		<div class="project-media">
			${projectMedia}
		</div>
	`;
	project.innerHTML = projectContent;

	// Show project
	setTimeout(() => {
		project.dataset.state = 1;

		// Fix for showing first caption
		project.querySelectorAll('figure')[0].dataset.scrolled = true;
	}, 50)

	// Opacity effects for project pages
	function scrollProjectMediaItems() {
		for (let mediaItem of document.querySelectorAll('.project-media-item')) {
			if (mediaItem.getBoundingClientRect().top > window.innerHeight*.5) {
				mediaItem.dataset.scrolled = false;
			} else {
				mediaItem.dataset.scrolled = true;
			}
		}
	}
	function initializeProjectScroll() {
		const project = document.querySelector('.project');
		project.addEventListener('scroll', scrollProjectMediaItems);
	}
	initializeProjectScroll();
}
function closeProject() {
	const project = document.querySelector('.project');
	project.dataset.state = 0;

	// Update URL
	if (!userTraversal) {
		window.history.pushState({project: ""}, "", `/`);
	}
}

// Lazy videos observer
const lazyObserver = new IntersectionObserver((entries, lazyObserver) => {
	// Loop the entries
	entries.forEach(entry => {
		// Check if the element is intersecting with the viewport
		if (entry.isIntersecting) {
			// Lazy loading videos
			let videoSource = entry.target.querySelector('source');
			if (videoSource != undefined) {
				videoSource.src = videoSource.dataset.src;
				entry.target.querySelector('video').load();
			}

			// Stop observing element
			// lazyObserver.unobserve(entry.target);
		} else {
			// Unload video
			let videoSource = entry.target.querySelector('source');
			if (videoSource != undefined) {
				videoSource.removeAttribute('src');
				entry.target.querySelector('video').pause();
				entry.target.querySelector('video').load();
			}
		}
	});
});

// Observe work items
for (let workItem of document.querySelectorAll('.work-item')) {
	lazyObserver.observe(workItem);
}

// Scrolling background image
window.addEventListener('scroll', () => {
	const body = document.querySelector('body');
	body.style.backgroundPosition = `0 ${window.scrollY/-20}px`;
})