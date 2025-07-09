// Add controls to all videos
function initializeVideos() {
	for (let mediaItem of document.querySelectorAll('.project-media-item-content')) {
		if (mediaItem.querySelector('video') != undefined) {
			let mediaVideo = mediaItem.querySelector('video');
			let videoControls = document.createElement('div');
			videoControls.classList.add('video-controls');

			// Detect if video has audio
			let videoAudio = '';
			let videoHasAudio = mediaVideo.mozHasAudio || Boolean(mediaVideo.webkitAudioDecodedByteCount) || Boolean(mediaVideo.audioTracks && mediaVideo.audioTracks.length);
			// videoHasAudio = true; // for testing purposes
			if (videoHasAudio) {
				videoAudio = `
					<button class="video-controls-volume" data-muted="true">
						<div class="video-controls-volume-mute">
							<svg viewBox="0 0 40 40"><path d="M27.6,13.9v17.1l-8.7-5.5v-.9l8.7-10.8ZM30.9,7.3l-1.7-1.4-3.8,4.6-6.6,4.1v4l-2.2,2.7v-6.7h-4.4v10.9h.9l-4.2,5.2,1.7,1.4L30.9,7.3Z"/></svg>
						</div>
						<div class="video-controls-volume-unmute">
							<svg viewBox="0 0 40 40"><path d="M13.6,14.6l8.7-5.5v21.9l-8.7-5.5v-10.9ZM7,25.6h4.4v-10.9h-4.4v10.9ZM29.2,11.1l-1.6,1.6c2,1.9,3.3,4.5,3.3,7.4s-1.2,5.4-3.3,7.4l1.6,1.6c2.5-2.4,4.1-5.5,4.1-9s-1.6-6.7-4.1-9ZM28.6,20.1c0-2.3-1-4.3-2.6-5.9l-1.6,1.6c1.1,1.1,1.8,2.6,1.8,4.2s-.7,3.1-1.8,4.3l1.6,1.6c1.6-1.6,2.6-3.6,2.6-5.9Z"/></svg>
						</div>
					</button>
				`;
			}

			// Build video controls and add to DOM
			videoControls.innerHTML = `
				<button class="video-controls-toggle" data-playing="true">
					<div class="video-controls-toggle-play">
						<svg viewBox="0 0 40 40"><polygon points="10.2 6.2 10.2 33.8 31.6 20 10.2 6.2"/></svg>
					</div>
					<div class="video-controls-toggle-pause">
						<svg viewBox="0 0 40 40"><rect x="10.2" y="7.2" width="7.1" height="25.5"/><rect x="22.7" y="7.2" width="7.1" height="25.5"/> </svg>
					</div>
				</button>
				<input type="range" min="0" max="${mediaVideo.duration*1000}" value="0" class="video-controls-progress">
				${videoAudio}
			`;
			mediaItem.appendChild(videoControls);
			
			// Toggle playing listeners
			const videoControlsToggle = mediaItem.querySelector('.video-controls-toggle');
			let videoPlaying = true;
			videoControlsToggle.addEventListener('click', () => {
				videoPlaying = !videoPlaying;
				videoControlsToggle.dataset.playing = videoPlaying;
				if (videoPlaying) {
					mediaVideo.play();
				} else {
					mediaVideo.pause();
				}
			})
			mediaVideo.addEventListener('click', () => {
				videoPlaying = !videoPlaying;
				videoControlsToggle.dataset.playing = videoPlaying;
				if (videoPlaying) {
					mediaVideo.play();
				} else {
					mediaVideo.pause();
				}
			})

			// Progress controls
			const videoControlsProgress = mediaItem.querySelector('.video-controls-progress');
			mediaVideo.addEventListener('timeupdate', () => {
				videoControlsProgress.max = mediaVideo.duration*1000
				videoControlsProgress.value = mediaVideo.currentTime*1000;
			})
			videoControlsProgress.addEventListener('input', () => {
				mediaVideo.currentTime = videoControlsProgress.value/1000;
			})
			videoControlsProgress.addEventListener('mousedown', () => { mediaVideo.pause(); });
			videoControlsProgress.addEventListener('mouseup', () => { mediaVideo.play(); });

			// Audio controls
			const videoControlsVolume = mediaItem.querySelector('.video-controls-volume');
			let videoMuted = true;
			if (videoHasAudio) {
				videoControlsVolume.addEventListener('click', () => {
					videoMuted = !videoMuted;
					videoControlsVolume.dataset.muted = videoMuted;
					mediaVideo.muted = videoMuted;
				})
			}
		}
	}
}
initializeVideos();

// Lazy videos observer
const lazyObserver = new IntersectionObserver((entries, lazyObserver) => {
	// Loop the entries
	entries.forEach(entry => {

		// Check if the element is intersecting with the viewport
		const elmnt = entry.target;

		if (entry.isIntersecting) {

			if (elmnt.classList.contains('project-list-link') && window.innerWidth < 600) {
				// Dont load quicklinks on mobile
			} else {
				// Lazy load video
				let videoSource = elmnt.querySelector('source');
				if (videoSource != undefined) {
					videoSource.src = videoSource.dataset.src;
					elmnt.querySelector('video').load();
				}
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

// Lazy video observe project media
for (let projectMediaItemContent of document.querySelectorAll('.project-media-item-content')) {
	lazyObserver.observe(projectMediaItemContent);
}

// Lazy video observe project list items
for (let projectListItem of document.querySelectorAll('.project-list-link')) {
	lazyObserver.observe(projectListItem);
}

// Random order for project list items
for (let projectListBlocks of document.querySelectorAll('.project-list-blocks')) {
	let children = projectListBlocks.querySelectorAll('.project-list-block');
	let links1 = children[0].querySelectorAll('.project-list-link-container');
	let links2 = children[1].querySelectorAll('.project-list-link-container');
	for (let i=0; i<links1.length; i++) {
		let ord = Math.round(Math.random()*10000);
		links1[i].style.order = ord;
		links2[i].style.order = ord;
	}
}