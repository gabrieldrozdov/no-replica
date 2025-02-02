const fs = require('fs');

// Get JSON
const data = require('./data.json');

// Global elements
const meta = `
	<meta name="author" content="No Replica">
	<meta name="keywords" content="Graphic Design, Web Design, Web Development, Creative Coding, Branding, Visual Identity, Studio, Agency">
	<meta name="description" content="A new studio merging design and development to craft bespoke digital experiences.">
	<meta property="og:url" content="https://noreplica.com/">
	<meta name="og:title" property="og:title" content="No Replica">
	<meta property="og:description" content="A new studio merging design and development to craft bespoke digital experiences.">
	<meta property="og:image" content="/assets/meta/opengraph.png">
	<link rel="icon" type="png" href="/assets/meta/favicon.png"></link>
`;

// Nav code
let navHTML = `
	<nav class="nav">
		<a class="nav-logo transition-link" href="/">No Replica</a>
		<button class="nav-menu-open" onclick="openMenu();">Menu</button>
		<div class="nav-links">
			<button class="nav-menu-close" onclick="closeMenu();">&times;</button>
			<a class="nav-link transition-link" href="/work/">Work</a>
			<a class="nav-link transition-link" href="/info/">Info</a>
			<a class="nav-link" href="mailto:gabriel@noreplica.com">Contact</a>
		</div>
	</nav>
`;

// Footer code
let footerHTML = `
	<footer class="footer elastic">
		<div class="footer-clock elastic">
			<div class="footer-clock-hand hour-hand"></div>
			<div class="footer-clock-hand min-hand"></div>
			<div class="footer-clock-hand second-hand"></div>
		</div>
		<p class="footer-info">
			<strong>© 2025 No Replica. All rights reserved.</strong>
			<br>
			<a href="/work/" class="transition-link">Projects ↗&nbsp;</a> <a href="/info/" class="transition-link">Info ↗&nbsp;</a>
			<br><br>
			<strong>Colophon</strong>
			<br>
			Limkin by <a href="https://toomuchtype.com/" target="_blank">Too Much Type ↗</a>
			<br><br>
			<strong>Follow us online</strong>
			<br>
			<a href="https://www.instagram.com/studionoreplica/" target="_blank">Instagram ↗&nbsp;</a> <a href="https://www.threads.net/@studionoreplica" target="_blank">Threads ↗&nbsp;</a> <a href="https://bsky.app/profile/studionoreplica.bsky.social" target="_blank">Bluesky ↗&nbsp;</a>
			<br>
			<a href="https://www.are.na/gabriel-drozdov/index" target="_blank">Are.na ↗&nbsp;</a> <a href="https://www.linkedin.com/company/no-replica/" target="_blank">LinkedIn ↗&nbsp;</a>
			<br>
			<a href="mailto:gabriel@noreplica.com">Email us ↗&nbsp;</a>
		</p>
	</footer>
`;

function generatePages() {
	let workItems = '';

	// First, create more projects section at the bottom of project pages
	let moreProjects = '';
	for (let key of Object.keys(data)) {
		let entry = data[key];
		let folder = "/work/" + key;

		// Skip inactive items
		if (!entry['active']) {
			continue
		}

		// Detect if direct link
		let itemURL = `href="${folder}"`;
		if (entry['direct-url'] != "") {
			itemURL = `href="${entry['direct-url']}" target="_blank"`;
		}

		let newLinkContent = "";
		if (entry['thumbnail']['micro-video'] != "") {
			newLinkContent = `
				<video autoplay muted loop playsinline disableRemotePlayback poster="/assets/micro/${entry['thumbnail']['micro-image']}" title="${entry['name']}">
					<source data-src="/assets/micro/${entry['thumbnail']['micro-video']}">
				</video>
			`;
		} else {
			newLinkContent = `
				<img src="/assets/micro/${entry['thumbnail']['micro-image']}" alt="${entry['name']}">
			`;
		}

		moreProjects += `
			<div class="project-list-link-container">
				<a ${itemURL} class="project-list-link transition-link">
					<div class="project-list-link-elastic">
						${newLinkContent}
					</div>
				</a>
			</div>
		`;
	}

	// Create project pages and collect info
	for (let key of Object.keys(data)) {
		let entry = data[key];
		let folder = "/work/" + key;

		if (!entry['active']) {
			continue
		}

		// ————————————————————————————————————
		// HOMEPAGE WORK ITEMS
		// ————————————————————————————————————

		// Thumbnail
		let thumbnail = "";
		if (entry['thumbnail']['video'] != "") {
			thumbnail = `
				<video autoplay muted loop playsinline disableRemotePlayback poster="${folder}/${entry['thumbnail']['image']}" title="${entry['name']}" class="work-item-media-content">
					<source data-src="${folder}/${entry['thumbnail']['video']}">
				</video>
			`;
		} else {
			thumbnail = `
				<img src="${folder}/${entry['thumbnail']['image']}" alt="${entry['name']}" class="work-item-media-content">
			`;
		}

		// Tags
		let tags = '';
		let metaTags = '';
		for (let tag of entry['tags']) {
			tags += `<li>${tag}</li>`;
			metaTags += `${tag},`;
		}

		// Detect if direct link
		let workItemURL = `href="/work/${key}/"`;
		let dataDirect = 0;
		if (entry['direct-url'] != "") {
			workItemURL = `href="${entry['direct-url']}" target="_blank" data-direct="true"`;
			dataDirect = 1;
		}

		// Add to HTML string
		workItems += `
			<a class="work-item transition-link" data-project="${key}" data-tags="${metaTags}" data-transition="0" data-direct="${dataDirect}" ${workItemURL}>
				<div class="work-item-elastic">
					<div class="work-item-content">
						<div class="work-item-media">
							<div class="work-item-media-elastic">
								${thumbnail}
							</div>
							<div class="work-item-cursor" style="transform: translate(${Math.random()*50-25}%, ${Math.random()*50-25}%);">
								<svg viewBox="0 0 100 100">
									<polygon points="26.379 10 26.379 90 49.236 63.326 84.316 65.166 26.379 10"/>
								</svg>
							</div>
						</div>
						<div class="work-item-info">
							<h2>${entry['name']}</h2>
							<p>${entry['caption']}</p>
							<ul>
								${tags}
							</ul>
						</div>
					</div>
				</div>
			</a>
		`;

		// ————————————————————————————————————
		// PROJECT PAGE
		// ————————————————————————————————————

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

			// Caption
			let projectMediaCaption = "";
			if (mediaItem['desc'] != "") {
				projectMediaCaption = `
					<figcaption class="project-media-item-caption">
						<p class="project-media-item-caption-content">${mediaItem['desc']}</p>
					</figcaption>
				`;
			}

			if (mediaItem["embed"] != "") {
				projectMedia += `
					<figure class="project-media-item" data-scrolled="${projectScrolled}" data-active="0">
						<div class="project-media-item-content">
							${mediaItem["embed"]}
						</div>
						${projectMediaCaption}
					</figure>
				`;

			} else if (mediaItem['video'] != "") {
				projectMedia += `
					<figure class="project-media-item" data-scrolled="${projectScrolled}" data-active="0">
						<div class="project-media-item-content">
							<video autoplay muted loop playsinline disableRemotePlayback poster="${mediaItem['image']}" title="${mediaItem['desc']}" class="elastic">
								<source data-src="${mediaItem['video']}">
							</video>
						</div>
						${projectMediaCaption}
					</figure>
				`;

			} else {
				projectMedia += `
					<figure class="project-media-item" data-scrolled="${projectScrolled}" data-active="0">
						<div class="project-media-item-content">
							<img alt="${mediaItem['desc']}" src="${mediaItem['image']}" class="elastic">
						</div>
						${projectMediaCaption}
					</figure>
				`;
			}

			projectMediaNumber++;
		}

		let projectDesc = "";
		if (entry['desc'] != "") {
			projectDesc = `
				<div class="project-desc">
					${entry['desc']}
				</div>
			`;
		}

		let projectHTML = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>No Replica | ${entry['name']}</title>

				${meta}

				<link rel="stylesheet" href="/style.css">
			</head>
			<body class="nav-padding">
				${navHTML}

				<div class="page-content">

					<div class="project">
						<header class="project-info elastic" data-elastic-scaler="20" data-elastic-friction="5">
							<h1 class="project-title">${entry['name']}</h1>
							<p class="project-tagline">${entry['caption']}</p>
							${projectDesc}
							${projectLinks}
						</header>

						<main class="project-media">
							${projectMedia}
						</main>
					</div>

					<section class="project-list">
						<h2 class="project-list-title elastic"><a href="/work/" class="transition-link"><span class="elastic">More Projects</span></a></h2>
						<div class="project-list-content">
							${moreProjects}
						</div>
					</section>

					${footerHTML}
				</div>

				<script src="/assets/scripts/transition.js"></script>
				<script src="/assets/scripts/project.js"></script>
				<script src="/assets/scripts/background.js"></script>
				<script src="/assets/scripts/menu.js"></script>
				<script src="/assets/scripts/elastic.js"></script>
				<script src="/assets/scripts/clock.js"></script>
			</body>
			</html>
		`;

		// Check if directory already exists
		// If not, create directory
		let dir = 'work/' + key;
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}

		// Create index file in directory
		fs.writeFile(`work/${key}/index.html`, projectHTML, err => {
			if (err) {
				console.error(err);
			}
		});
	}

	// Work portfolio grid
	let homeContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>No Replica</title>

			${meta}

			<link rel="stylesheet" href="/style.css">
		</head>
		<body>
			${navHTML}

			<div class="page-content">

				<main class="work">		
					<div class="work-items">
						${workItems}
					</div>

					<div class="work-filters elastic" data-elastic-scaler="30" data-elastic-friction="5">
						<button class="work-filters-toggle" data-active="1" data-filter="All">
							<svg viewBox="0 0 100 100">
								<polygon points="73.09 88 26.91 88 5.53 45.24 14.47 40.76 33.09 78 66.91 78 85.53 40.76 94.47 45.24 73.09 88"/>
								<rect x="35" y="13" width="10" height="40"/>
								<rect x="55" y="13" width="10" height="40"/>
							</svg>
							<span>All</span>
						</button>
						<button class="work-filters-toggle" data-filter="Web">
							<svg viewBox="0 0 30 30">
								<path d="M3.85791 2.45401L6.16491 27.159L12.4229 19.911L19.0709 28.446L22.9649 25.752L16.0469 16.947L24.9419 14.97L3.85791 2.45401Z"/>
							</svg>
							<span>Web</span>
						</button>
						<button class="work-filters-toggle" data-filter="Branding">
							<svg viewBox="0 0 30 30">
								<path d="M15 4.125L0.500977 15L15 25.875L29.499 15L15 4.125ZM5.49898 15L15 7.875L24.501 15L15 22.125L5.49898 15Z"/>
								<path d="M18 12H12V18H18V12Z"/>
							</svg>
							<span>Branding</span>
						</button>
						<button class="work-filters-toggle" data-filter="Computational art">
							<svg viewBox="0 0 30 30">
								<path d="M30 13.5V16.5H22.5V20.376L28.062 25.938L27 27L25.938 28.062L20.376 22.5H16.5V30H13.5V22.5H9.624L4.062 28.062L3 27L1.938 25.938L7.5 20.376V16.5H0V13.5H7.5V9.624L1.938 4.062L3 3L4.062 1.938L9.624 7.5H13.5V0H16.5V7.5H20.376L25.938 1.938L27 3L28.062 4.062L22.5 9.624V13.5H30Z"/>
							</svg>
							<span>Computational art</span>
						</button>
						<button class="work-filters-toggle" data-filter="Motion">
							<svg viewBox="0 0 30 30">
								<path d="M1.5 1.5V28.5L15 15L1.5 1.5Z"/>
								<path d="M15 1.5V28.5L28.5 15L15 1.5Z"/>
							</svg>
							<span>Motion</span>
						</button>
						<button class="work-filters-toggle" data-filter="Type">
							<svg viewBox="0 0 30 30">
								<path d="M13.5 0H4.5V3H13.5V0Z"/>
								<path d="M25.5 0H16.5V3H25.5V0Z"/>
								<path d="M16.5 3H13.5V27H16.5V3Z"/>
								<path d="M13.5 27H4.5V30H13.5V27Z"/>
								<path d="M25.5 27H16.5V30H25.5V27Z"/>
							</svg>
							<span>Type</span>
						</button>
						<button class="work-filters-toggle" data-filter="Sound">
							<svg viewBox="0 0 30 30">
								<path d="M0 9V21H7.2L18 30V0L7.2 9H0Z"/>
								<path d="M24 9H21V21H24V9Z"/>
								<path d="M30 3H27V27H30V3Z"/>
							</svg>
							<span>Sound</span>
						</button>
						<button class="work-filters-toggle" data-filter="Data">
							<svg viewBox="0 0 30 30">
								<path d="M10.5 12H7.5V30H10.5V12Z"/>
								<path d="M4.5 18H1.5V30H4.5V18Z"/>
								<path d="M28.5 9H25.5V30H28.5V9Z"/>
								<path d="M16.5 0H13.5V30H16.5V0Z"/>
								<path d="M22.5 3H19.5V30H22.5V3Z"/>
							</svg>
							<span>Data</span>
						</button>
						<button class="work-filters-toggle" data-filter="Education">
							<svg viewBox="0 0 30 30">
								<path d="M15 19.308L30 11.808L15 4.30798L0 11.808L15 19.308Z""/>
								<path d="M15 22.3259L6 17.8259V25.6919H24V17.8259L15 22.3259Z""/>
							</svg>
							<span>Education</span>
						</button>
					</div>
				</main>

				${footerHTML}
			</div>

			<script src="/assets/scripts/transition.js"></script>
			<script src="/assets/scripts/work.js"></script>
			<script src="/assets/scripts/background.js"></script>
			<script src="/assets/scripts/menu.js"></script>
			<script src="/assets/scripts/elastic.js"></script>
			<script src="/assets/scripts/clock.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`work/index.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});
	fs.writeFile(`404.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generatePages();