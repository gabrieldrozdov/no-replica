// Logo animation
function initializeLogo() {
	const logo = document.querySelector('.logo');

	// Build logo and cursors
	let temp = "";
	for (let character of logo.innerText) {
		// Fix space characters
		if (character == " ") {
			character = "&nbsp;";
		}

		// Determine origin and transition speed
		let origin = [Math.random()*200-100, -100];
		let trans = Math.random()*.5+.5;
		
		temp += `
			<span class="logo-letter" style="transform: translate(${origin[0]}vw, ${origin[1]}vh); transition: transform ${trans}s cubic-bezier(0.25, 1, 0.5, 1);" data-trans="${trans}">
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

		let trans = parseFloat(span.dataset.trans)*1000; 
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
			}, trans+Math.random()*200)
		}, Math.random()*400+250)
	}
}
initializeLogo();

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
	const project = document.querySelector('.project');
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
		if (mediaItem["embed"] != "") {
			// TODO

		} else if (mediaItem['video'] != "") {
			projectMedia += `
				<figure class="project-media-item">
					<div class="project-media-item-content">
						<video autoplay muted loop playsinline disableRemotePlayback poster="${mediaItem['image']}" title="${mediaItem['desc']}">
							<source data-src="${mediaItem['video']}">
						</video>
					</div>
					<figcaption class="project-media-item-caption">
						<div class="project-media-item-caption-number">${projectMediaNumber}</div>
						<p>${mediaItem['desc']}</p>
					</figcaption>
				</figure>
			`;

		} else {
			projectMedia += `
				<figure class="project-media-item">
					<div class="project-media-item-content">
						<img alt="${mediaItem['desc']}" src="${mediaItem['image']}">
					</div>
					<figcaption class="project-media-item-caption">
						<div class="project-media-item-caption-number">${projectMediaNumber}</div>
						<p>${mediaItem['desc']}</p>
					</figcaption>
				</figure>
			`;
		}

		projectMediaNumber++;
	}

	// Put it all together
	let projectContent = `
		<div class="project-info">
			<div class="project-nav">
				<button class="project-nav-logo" onclick="closeProject();">&larr;&nbsp;&nbsp;View all projects</button>
			</div>
			<h3 class="project-title">${entry['name']}</h3>
			<p class="project-tagline">${entry['caption']}</p>
			<div class="project-desc">
				${entry['desc']}
			</div>
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
	}, 50)

	// Update URL
	window.history.pushState({}, "", `/work/${projectKey}/`);
}
function closeProject() {
	const project = document.querySelector('.project');
	project.dataset.state = 0;

	// Update URL
	window.history.pushState({}, "", `/`);
}

// Hijack URL clicks
// for (let workItem of document.querySelectorAll('.work-item')) {
// 	workItem.addEventListener('click', (e) => {
// 		e.preventDefault();
// 		openProject(workItem.dataset.project);
// 	})
// }

// Handle when user navigates back/forward URL change
// window.addEventListener("popstate", (event) => {readURL();});
// function readURL() {
// 	const url = new URL(window.location.href);
// 	const project = url.pathname.split('/')[2];
// 	if (project != undefined) {
// 		openProject(project);
// 	} else {
// 		closeProject();
// 	}
// }