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
	totalItems = 20;
	maxPosX = 90;
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
			const elmntWidth = Math.random()*4+4;
			elmnt.style.width = `max(${elmntWidth}vw, ${elmntWidth*20}px)`;
		} else {
			const elmntWidth = Math.random()*10+7;
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
						<source data-src="/assets/micro/${currentProject['thumbnail']['micro-video']}">
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
		let side = -1;
		if (Math.random() < .5) {
			side = 1;
		}
		const initialPos = [110*side - Math.random()*50*side, Math.random()*100-50];
		elmnt.style.transform = `translate(calc(${initialPos[0]}vw - 50%), calc(${initialPos[1]}vh - 50%)) translateZ(0) scale(0.8)`;

		// Create cursor
		let elmntCursor = document.createElement('div');
		elmntCursor.classList.add('home-item-cursor');
		elmntCursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%) translateZ(0)`;
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
		}, i*Math.random()*20)

		// Iterate key index
		keyIndex++;
		if (keyIndex >= keys.length) {
			keyIndex = 0;
		}
	}

	// Load in all videos
	setTimeout(() => {
		let videos = document.querySelectorAll('.home-item-media video');
		let videoIndex = 0;
		let loadVideos = setInterval(() => {
			let currentVideo = videos[videoIndex];
			let source = currentVideo.querySelector('source');
			source.src = source.dataset.src;
			setTimeout(() => {
				currentVideo.load();
			}, 50)
			videoIndex++;
			if (videoIndex >= videos.length) {
				clearInterval(loadVideos);
			}
		}, 100)
	}, 500)
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
	const elmntMediaContent = elmnt.querySelector('.home-item-media-content');
	const elmntCursor = elmnt.querySelector('.home-item-cursor');
	elmnt.style.pointerEvents = 'none';
	setTimeout(() => {
		elmnt.style.transition = `transform ${transitionLength}s`;
	}, 50)
	setTimeout(() => {
		elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) translateZ(0) scale(0.8)`;

		setTimeout(() => {
			elmnt.style.transition = `transform .2s`;
		}, transitionLength*1000+50)

		setTimeout(() => {
			elmnt.style.transition = `transform .5s`;
			elmnt.style.transform = `translateX(calc(${destination[0]}vw - 50%)) translateY(calc(${destination[1]-posYOffset}vh - 50%)) translateZ(0) scale(1)`;
			elmntCursor.style.transition = `transform ${transitionLength}s cubic-bezier(0.32, 0, 0.67, 0)`;
		}, transitionLength*1000+100)

		// Animate media content in
		setTimeout(() => {
			elmntMediaContent.style.transform = `scale(1)`;
			elmnt.style.pointerEvents = 'unset';
		}, transitionLength*1000+400 + Math.random()*250)

		// Move cursor out
		setTimeout(() => {
			let side = -1;
			if (Math.random() < .5) {
				side = 1;
			}
			elmntCursor.style.transform = `translate(${110*side + Math.random()*50*side}vw, ${Math.random()*200-100}vh) translateZ(0)`;
		}, transitionLength*1000+300)
	}, Math.random()*200+100)
}

document.addEventListener('visibilitychange', () => {
	if (document.visibilityState === 'visible') {
		const videos = document.querySelectorAll('video');
		videos.forEach((video, i) => {
			setTimeout(() => video.play(), i * 50); // 50ms apart
		});
	}
});