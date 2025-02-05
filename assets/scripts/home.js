// Attempted fix for empty page on Safari
// const AudioContext = window.AudioContext || window.webkitAudioContext;
//     this.ambience = new AudioContext();

// Shuffle array helper function
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Helper function
let projects;
let keys;
fetch('/data.json')
	.then((response) => response.json())
	.then((data) => {
		projects = data;
		keys = Object.keys(projects);
		shuffleArray(keys);
		initializeHomepage();
})

// Initialize elements and mouse cursors
let totalItems = 30;
let maxPosX = 80; // range of x coordinates
let maxPosY = 60; // range of y coordinates
let posYOffset = 2;
if (window.innerWidth < 600) { // mobile styles
	totalItems = 15;
	maxPosX = 100;
	maxPosY = 50;
	posYOffset = 6;
}
let itemCounter = 0;
let keyIndex = 0;
const colors = ['pink', 'green', 'blue', 'yellow'];
const homeItems = document.querySelector('.home-items');
let positions = {};
function initializeHomepage() {

	for (let i=0; i<totalItems; i++) {
		// Grab media item key and project (avoid inactive projects)
		let currentKey = keys[keyIndex];
		let currentProject = projects[currentKey];
		while (currentProject['active'] == false) {
			keyIndex++;
			currentKey = keys[keyIndex];
			currentProject = projects[currentKey];
		}
		const path = `/work/${currentKey}/`;

		// Create element
		const elmnt = document.createElement('a');
		elmnt.id = i;
		elmnt.classList.add('home-item');
		if (window.innerWidth < 600) {
			const elmntWidth = Math.random()*5+4;
			elmnt.style.width = `max(${elmntWidth}vw, ${elmntWidth*20}px)`;
		} else {
			const elmntWidth = Math.random()*10+5;
			elmnt.style.width = `max(${elmntWidth}vw, ${elmntWidth*20}px)`;
		}
		elmnt.style.setProperty('--color', `var(--${colors[Math.floor(Math.random()*colors.length)]})`);
		elmnt.classList.add('transition-link');
		elmnt.href = path;
		elmnt.style.transition = 'unset';
		elmnt.style.zIndex = itemCounter;
		itemCounter++;

		// Create media
		if (currentProject['thumbnail']['video'] != "") {
			elmnt.innerHTML = `
				<div class="home-item-media">
					<video autoplay muted loop playsinline disableRemotePlayback poster="/assets/micro/${currentProject['thumbnail']['micro-image']}" title="${currentProject['name']}" class="home-item-media-content">
						<source src="/assets/micro/${currentProject['thumbnail']['micro-video']}">
					</video>
				</div>
			`;
		} else {
			elmnt.innerHTML = `
				<div class="home-item-media">
					<img src="/assets/micro/${currentProject['thumbnail']['micro-image']}" class="home-item-media-content">
				</div>
			`;
		}

		// Set initial position
		const initialPos = [-110 - Math.random()*50, Math.random()*100-50];
		elmnt.style.transform = `translate(calc(${initialPos[0]}vw - 50%), calc(${initialPos[1]}vh - 50%))`;

		// Create overlay
		// let elmntOverlay = document.createElement('div');
		// elmntOverlay.classList.add('home-item-overlay');
		// elmntOverlay.style.backgroundColor = `var(--${colors[Math.floor(Math.random()*colors.length)]})`;
		// elmnt.appendChild(elmntOverlay);

		// Create cursor
		let elmntCursor = document.createElement('div');
		elmntCursor.classList.add('home-item-cursor');
		elmntCursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)`;
		elmntCursor.innerHTML = `
			<svg viewBox="0 0 100 100">
				<polygon points="26.379 10 26.379 90 49.236 63.326 84.316 65.166 26.379 10"/>
			</svg>
		`;
		elmnt.appendChild(elmntCursor);

		// Add element to DOM
		homeItems.appendChild(elmnt);
		addTransitionListeners(elmnt);

		// Transition in
		setTimeout(() => {
			animateHomeItem(elmnt);
		}, i*Math.random()*10)

		// Iterate key index
		keyIndex++;
		if (keyIndex >= keys.length) {
			keyIndex = 0;
		}
	}
}

// Helper function to determine landing positions
function calculateDestination(elmntID) {
	// Reformat coordinates as array
	let coordinates = [];
	for (let key of Object.keys(positions)) {
		let pos = positions[key];
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

	for (let i = 0; i < 1000; i++) { // Number of attempts
		const candidate = getRandomCoordinate();
		const minDistance = coordinates.reduce((minDist, coord) => {
			return Math.min(minDist, distance(candidate, coord));
		}, Infinity);

		if (minDistance > maxMinDistance) {
			maxMinDistance = minDistance;
			bestCoordinate = candidate;
		}
	}

	positions[elmntID] = [bestCoordinate['x'], bestCoordinate['y']];
	return [bestCoordinate['x'], bestCoordinate['y']];
}

function animateHomeItem(elmnt) {
	// Move element in
	const transitionLength = Math.random()*.25+.5;
	const destination = calculateDestination(elmnt.id);
	// const elmntOverlay = elmnt.querySelector('.home-item-overlay');
	const elmntMediaContent = elmnt.querySelector('.home-item-media-content');
	const elmntCursor = elmnt.querySelector('.home-item-cursor');
	setTimeout(() => {
		elmnt.style.transition = `transform ${transitionLength}s`;
	}, 50)
	setTimeout(() => {
		elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) scale(0.8)`;

		setTimeout(() => {
			if (elmnt.querySelector('source') != undefined) {
				elmnt.querySelector('video').play();
			}
		}, transitionLength*1000+50)

		setTimeout(() => {
			elmnt.style.transition = `transform .2s`;
			// elmntOverlay.style.opacity = 0;
			elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) scale(1)`;
			elmntCursor.style.transition = `transform ${transitionLength*.8}s cubic-bezier(0.64, 0, 0.78, 0)`;
		}, transitionLength*1000+150)

		// Move cursor out
		setTimeout(() => {
			elmntMediaContent.style.animation = `fade-in .25s .25s forwards`;
			elmntCursor.style.transform = `translate(${110 + Math.random()*50}vw, ${Math.random()*100-50}vh)`;
		}, transitionLength*1000+100)
	}, Math.random()*200+100)

	// Transition out (inactive)
	return
	setTimeout(() => {
		// Move cursor in
		elmntCursor.style.transition = `transform ${transitionLength+.25}s`;
		elmntCursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)`;
		elmnt.style.transition = `transform ${transitionLength}s`;

		// Press element effect
		setTimeout(() => {
			// elmntOverlay.style.opacity = 1;
			elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) scale(0.9)`;

			// Move out
			setTimeout(() => {
				elmnt.style.transition = `transform ${transitionLength}s`;
				const outPos = [-110 - Math.random()*50, Math.random()*100-50];
				elmnt.style.transform = `translate(calc(${outPos[0]}vw - 50%), calc(${outPos[1]}vh - 50%))`;

				// Iterate content
				setTimeout(() => {
					iterateHomeItem(elmnt);
				}, transitionLength*2000)
			}, 400)
		}, (transitionLength+.25)*1000 + 100)

	}, totalItems*1500)
}

function iterateHomeItem(elmnt) {
	// Move to top of stack
	elmnt.style.zIndex = itemCounter;
	itemCounter++;

	// Grab media item key and project (avoid inactive projects)
	let currentKey = keys[keyIndex];
	let currentProject = projects[currentKey];
	while (currentProject['active'] == false) {
		keyIndex++;
		currentKey = keys[keyIndex];
		currentProject = projects[currentKey];
	}
	const path = `/work/${currentKey}/`;
	elmnt.href = path;

	// Rebuild media
	const elmntMedia = elmnt.querySelector('.home-item-media');
	if (currentProject['thumbnail']['video'] != "") {
		elmntMedia.innerHTML = `
			<video autoplay muted loop playsinline disableRemotePlayback poster="/assets/micro/${currentProject['thumbnail']['micro-image']}" title="${currentProject['name']}" class="home-item-media-content">
				<source src="/assets/micro/${currentProject['thumbnail']['micro-video']}">
			</video>
		`;
	} else {
		elmntMedia.innerHTML = `<img src="/assets/micro/${currentProject['thumbnail']['micro-image']}" class="home-item-media-content">`;
	}

	// Get new color for overlay
	// const elmntOverlay = elmnt.querySelector('.home-item-overlay');
	// elmntOverlay.style.backgroundColor = `var(--${colors[Math.floor(Math.random()*colors.length)]})`;

	// Transition back in
	animateHomeItem(elmnt);

	// Iterate key index
	keyIndex++;
	if (keyIndex >= keys.length) {
		keyIndex = 0;
	}
}