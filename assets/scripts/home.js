// Shuffle array helper function
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Generation variables
let projectIndex = 0;
let keyIndex = 0;
let positions = [];
let totalItems = 20;
let maxPosX = 130; // range of x coordinates
let maxPosY = 30; // range of y coordinates
let posYOffset = 10;
if (window.innerWidth < 600) { // mobile
	totalItems = 15;
	maxPosX = 100; // range of x coordinates
	maxPosY = 45; // range of y coordinates
	posYOffset = 13;
}

// Fetch data and build page
let projects;
let keys;
fetch('/data.json')
	.then((response) => response.json())
	.then((data) => {
		projects = data;
		keys = Object.keys(projects);
		shuffleArray(keys);
		setTimeout(generateMultipleItems, 150);
})
async function generateMultipleItems() {
	await waitForFocus();
	if (window.innerWidth < 600) { // mobile
		totalItems = 15;
		maxPosX = 100; // range of x coordinates
		maxPosY = 45; // range of y coordinates
		posYOffset = 13;
	} else { // desktop
		totalItems = 20;
		maxPosX = 130; // range of x coordinates
		maxPosY = 30; // range of y coordinates
		posYOffset = 10;
	}
	positions = [];
	for (let i=0; i<totalItems; i++) {
		setTimeout(generateHeaderItem, i*50);
	}
	setTimeout(generateMultipleItems, 12000);
}

// Generate header background
function generateHeaderItem() {

	// Grab media item key and project (avoid inactive projects)
	let currentKey = keys[keyIndex];
	let currentProject = projects[currentKey];
	while (currentProject['active'] == false) {
		keyIndex++;
		if (keyIndex >= keys.length) {
			keyIndex = 0;
		}
		currentKey = keys[keyIndex];
		currentProject = projects[currentKey];
	}
	const path = `/work/${currentKey}/`;

	// Iterate keyIndex for next item
	keyIndex++;
	if (keyIndex >= keys.length) {
		keyIndex = 0;
	}

	// Create element
	const elmnt = document.createElement('a');
	elmnt.classList.add('home-item');
	const elmntWidth = 18;
	elmnt.style.width = `max(${elmntWidth}vw, 160px)`;
	elmnt.classList.add('transition-link');
	elmnt.href = path;
	elmnt.dataset.state = 0;
	elmnt.style.zIndex = projectIndex;

	// Create media
	if (currentProject['thumbnail']['video'] != "") {
		elmnt.innerHTML = `
			<div class="home-item-media" style="animation-delay: ${Math.random()*-2}s; animation-duration: ${Math.random()*2+1.5}s">
				<video autoplay muted loop playsinline disableRemotePlayback poster="${path}/${currentProject['thumbnail']['image']}" title="${currentProject['name']}" class="home-item-media-content">
					<source data-src="${path}/${currentProject['thumbnail']['video']}">
				</video>
			</div>
		`;
	} else {
		elmnt.innerHTML = `
			<div class="home-item-media" style="transform: rotate(${Math.random()*20-10}deg);">
				<img src="${path}/${currentProject['thumbnail']['image']}" alt="${currentProject['name']}" class="home-item-media-content">
			</div>
		`;
	}

	// Add cursor
	elmnt.innerHTML += `
		<div class="home-item-cursor" style="transform: translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)">
			<svg viewBox="-10 -10 110 110"><path d="M100,39.52c-.05,2-1.32,3.69-3.22,4.3l-39.94,13.02-13.02,39.95c-.62,1.9-2.3,3.16-4.29,3.21h-.11c-1.96,0-3.66-1.17-4.36-2.99L.32,6.33C-.35,4.58.06,2.67,1.38,1.36,2.69.06,4.58-.35,6.31.31l90.7,34.74c1.87.72,3.04,2.47,2.99,4.46h0Z"/></svg>
		</div>
	`;
	let cursor = elmnt.querySelector('.home-item-cursor');

	// Set origin
	let diceRoll = Math.random();
	let origin = [Math.random()*200-100, -Math.random()*50-100];
	elmnt.style.transform = `translateX(calc(${origin[0]}vw - 50%)) translateY(calc(${origin[1]-posYOffset}vh - 50%)) translateZ(0) scale(0.8)`;

	// Set destination
	let destination = calculateDestination();

	// Set cursor out destination
	let cursorDestination = [Math.random()*200-100, -Math.random()*50-100];

	// Set item out destination
	let outDestination = [Math.random()*200-100, -Math.random()*50-100];

	// Add to DOM and animate in
	const home = document.querySelector('.home');
	home.appendChild(elmnt);
	let elmntMedia = elmnt.querySelector('.home-item-media');
	addTransitionListeners(elmnt);
	setTimeout(() => {
		elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) translateZ(0) scale(0.5)`;
		setTimeout(() => {
			elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) translateZ(0) scale(1)`;

			// Animate cursor out
			cursor.style.transform = `translateX(calc(${cursorDestination[0]}vw - 50%)) translateY(calc(${cursorDestination[1]-posYOffset}vh - 50%)) translateZ(0) scale(0.5)`;

			setTimeout(() => {
				elmnt.dataset.state = 1;
				let video = elmnt.querySelector('video');
				if (video != undefined) {
					let source = elmnt.querySelector('source');
					source.src = source.dataset.src;
					video.load();
				}
			}, 500)
		}, 500)
	}, 50)

	// Transition out
	setTimeout(() => {
		// Animate cursor in
		cursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)`;
		elmnt.style.transition = "transform .5s";

		setTimeout(() => {
			elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) translateZ(0) scale(.5)`;

			setTimeout(() => {
				elmnt.style.transition = `transform 2s cubic-bezier(0.76, 0, 0.24, 1)`;
			}, 50)

			setTimeout(() => {
				elmnt.style.pointerEvents = 'none';
				elmnt.style.transform = `translateX(calc(${outDestination[0]}vw - 50%)) translateY(calc(${outDestination[1]-posYOffset}vh - 50%)) translateZ(0) scale(.5)`;

				// Remove element
				setTimeout(() => {
					elmnt.remove();
				}, 3000)

			}, 500)
		}, 2000)
	}, 8000)

	// Iterate
	projectIndex++;
}

// Helper function to determine landing positions
function calculateDestination() {
	// Reformat coordinates as array
	let coordinates = [];
	for (let pos of positions) {
		coordinates.push({x: pos[0], y: pos[1]});
	}

	// Get random coordinate (try to keep in oval region)
	const getRandomCoordinate = () => {
		const angle = Math.random() * 2 * Math.PI; // Random angle
		const r = Math.sqrt(Math.random()); // Random radius (sqrt ensures uniform distribution)
		return {
		  x: r * maxPosX/2 * Math.cos(angle),
		  y: r * maxPosY/2 * Math.sin(angle),
		};
	};

	const distance = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

	let bestCoordinate = null;
	let maxMinDistance = -Infinity;

	for (let i = 0; i < 50; i++) { // Number of attempts
		const candidate = getRandomCoordinate();
		const minDistance = coordinates.reduce((minDist, coord) => {
			return Math.min(minDist, distance(candidate, coord));
		}, Infinity);

		if (minDistance > maxMinDistance) {
			maxMinDistance = minDistance;
			bestCoordinate = candidate;
		}
	}

	positions.push([bestCoordinate['x'], bestCoordinate['y']]);
	return [bestCoordinate['x'], bestCoordinate['y']];
}

// Handle glitches when user navigates away from the page
let inFocus = true;
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "hidden") {
		inFocus = false;
	} else {
		inFocus = true;
	}
});
function waitForFocus() {
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (inFocus) {
				clearInterval(interval);
				resolve();
			}
		}, 100); // check every 100ms
	});
}