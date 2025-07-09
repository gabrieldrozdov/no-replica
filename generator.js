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
		<div class="nav-spacer"></div>
		<div class="nav-links">
			<button class="nav-menu-close" onclick="closeMenu();">&times;</button>
			<a class="nav-link transition-link" href="/work/">Work</a>
			<a class="nav-link transition-link" href="/info/">Info</a>
			<a class="nav-link" href="mailto:gabriel@noreplica.com">Contact</a>
			<div class="nav-handle nav-handle-1"></div>
			<div class="nav-handle nav-handle-2"></div>
			<div class="nav-handle nav-handle-3"></div>
			<div class="nav-handle nav-handle-4"></div>
		</div>
	</nav>
`;

// Footer code
let ctaHTML = `<a href="mailto:gabriel@noreplica.com" class="cta">Get in touch&nbsp;↗</a>`;
let footerHTML = `
	<footer class="footer">
		<div class="footer-clock-container" onclick="toggleShadow();">
			<div class="footer-clock">
				<div class="footer-clock-hand hour-hand"></div>
				<div class="footer-clock-hand min-hand"></div>
				<div class="footer-clock-hand second-hand"></div>
				<div class="footer-clock-center"></div>
			</div>
		</div>
		<div class="footer-info">
			<h2 class="footer-copyright">
				<span style="color: var(--pink);">© 2025 No Replica</span>
				<br>
				All rights reserved
			</h2>

			<div class="footer-links">
				<section>
					<h2>Pages</h2>
					<a href="/" class="transition-link">Home</a>
					<a href="/work/" class="transition-link">Projects</a>
					<a href="/info/" class="transition-link">Info</a>
				</section>

				<section>
					<h2>Sister Sites</h2>
					<a href="https://gdwithgd.com/" target="_blank">GD with GD</a>
					<a href="https://toomuchtype.com/" target="_blank">Too Much Type</a>
					<a href="https://barcoloudly.com/" target="_blank">Barco Loudly</a>
				</section>

				<section>
					<h2>Social</h2>
					<a href="https://www.instagram.com/studionoreplica/" target="_blank">Instagram</a>
					<a href="https://www.linkedin.com/company/no-replica/" target="_blank">LinkedIn</a>
					<a href="mailto:gabriel@noreplica.com">Email us</a>
				</section>
			</div>
	</footer>
`;

// Transition code
let transitionHTML = `
	<div class="transition">
		<div class="transition-block transition-block-top" style="transition-delay: .0s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-top" style="transition-delay: .05s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-top" style="transition-delay: .1s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-top" style="transition-delay: .15s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-top" style="transition-delay: .2s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-bottom" style="transition-delay: .0s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-bottom" style="transition-delay: .05s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-bottom" style="transition-delay: .1s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-bottom" style="transition-delay: .15s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
		<div class="transition-block transition-block-bottom" style="transition-delay: .2s;">
			<div class="transition-handle transition-handle-1"></div>
			<div class="transition-handle transition-handle-2"></div>
			<div class="transition-handle transition-handle-3"></div>
			<div class="transition-handle transition-handle-4"></div>
		</div>
	</div>
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

		// Thumbnail
		let thumbnail = "";
		if (entry['thumbnail']['video'] != "") {
			thumbnail = `
				<video autoplay muted loop playsinline disableRemotePlayback poster="${folder}/${entry['thumbnail']['image']}" title="${entry['name']}">
					<source data-src="${folder}/${entry['thumbnail']['video']}">
				</video>
			`;
		} else {
			thumbnail = `
				<img src="${folder}/${entry['thumbnail']['image']}" alt="${entry['name']}">
			`;
		}

		moreProjects += `
			<a ${itemURL} class="project-list-link-container transition-link">
				<div class="project-list-link">
					${thumbnail}
				</div>
				<div class="project-list-handle project-list-handle-1"></div>
				<div class="project-list-handle project-list-handle-2"></div>
				<div class="project-list-handle project-list-handle-3"></div>
				<div class="project-list-handle project-list-handle-4"></div>
			</a>
		`;
	}
	moreProjects = `
		<div class="project-list-blocks">
			<div class="project-list-block">${moreProjects}</div>
			<div class="project-list-block">${moreProjects}</div>
		</div>
		<div class="project-list-blocks">
			<div class="project-list-block">${moreProjects}</div>
			<div class="project-list-block">${moreProjects}</div>
		</div>
	`;

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
			<a class="work-item transition-link" data-project="${key}" data-tags="${metaTags}" data-direct="${dataDirect}" ${workItemURL}>
				<div class="work-item-content">
					<div class="work-item-media">
						${thumbnail}
					</div>
					<div class="work-item-info">
						<h2>${entry['name']}</h2>
						<p>${entry['caption']}</p>
						<ul>
							${tags}
						</ul>
					</div>
				</div>
				<div class="work-item-handle work-item-handle-1"></div>
				<div class="work-item-handle work-item-handle-2"></div>
				<div class="work-item-handle work-item-handle-3"></div>
				<div class="work-item-handle work-item-handle-4"></div>
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

			// Caption and handles
			let projectMediaCaption = `
				<div class="project-handle project-handle-1"></div>
				<div class="project-handle project-handle-2"></div>
				<div class="project-handle project-handle-3"></div>
				<div class="project-handle project-handle-4"></div>
			`;
			if (mediaItem['desc'] != "") {
				projectMediaCaption += `
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
							<video autoplay muted loop playsinline disableRemotePlayback poster="${mediaItem['image']}" title="${mediaItem['desc']}">
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
							<img alt="${mediaItem['desc']}" src="${mediaItem['image']}">
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
			<body data-transition="1">
				${transitionHTML}

				${navHTML}

				<div class="project">
					<header class="project-info">
						<div class="project-info-content">
							<div class="project-heading">
								<h1 class="project-title">${entry['name']}</h1>
								<p class="project-tagline">${entry['caption']}</p>
							</div>
							${projectDesc}
							${projectLinks}
						</div>
						<div class="project-handle project-handle-1"></div>
						<div class="project-handle project-handle-2"></div>
						<div class="project-handle project-handle-3"></div>
						<div class="project-handle project-handle-4"></div>
					</header>

					<main class="project-media">
						${projectMedia}
					</main>
				</div>

				<section class="project-list">
					<a class="project-list-title transition-link" href="/work/">
						<h2 class="project-list-title-text">More projects</h2>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
						<span class="project-list-title-text">More projects</span>
					</a>
					<div class="project-list-content">
						${moreProjects}
					</div>
				</section>

				${ctaHTML}
				${footerHTML}

				<script src="/assets/scripts/transition.js"></script>
				<script src="/assets/scripts/project.js"></script>
				<script src="/assets/scripts/menu.js"></script>
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
	let workContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>No Replica</title>

			${meta}

			<link rel="stylesheet" href="/style.css">
		</head>
		<body data-transition="1">
			${transitionHTML}

			${navHTML}

			<main class="work">
				<div class="work-items">
					${workItems}
				</div>
				
				<div class="work-filters">
					<button class="work-filters-toggle" data-active="1" data-filter="All">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 100 100">
								<polygon points="73.09 88 26.91 88 5.53 45.24 14.47 40.76 33.09 78 66.91 78 85.53 40.76 94.47 45.24 73.09 88"/>
								<rect x="35" y="13" width="10" height="40"/>
								<rect x="55" y="13" width="10" height="40"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">All</span>
					</button>
					<button class="work-filters-toggle" data-filter="Web">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M3.85791 2.45401L6.16491 27.159L12.4229 19.911L19.0709 28.446L22.9649 25.752L16.0469 16.947L24.9419 14.97L3.85791 2.45401Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Web</span>
					</button>
					<button class="work-filters-toggle" data-filter="Identity">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M15 4.125L0.500977 15L15 25.875L29.499 15L15 4.125ZM5.49898 15L15 7.875L24.501 15L15 22.125L5.49898 15Z"/>
								<path d="M18 12H12V18H18V12Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Identity</span>
					</button>
					<button class="work-filters-toggle" data-filter="Computational art">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M30 13.5V16.5H22.5V20.376L28.062 25.938L27 27L25.938 28.062L20.376 22.5H16.5V30H13.5V22.5H9.624L4.062 28.062L3 27L1.938 25.938L7.5 20.376V16.5H0V13.5H7.5V9.624L1.938 4.062L3 3L4.062 1.938L9.624 7.5H13.5V0H16.5V7.5H20.376L25.938 1.938L27 3L28.062 4.062L22.5 9.624V13.5H30Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Computational art</span>
					</button>
					<button class="work-filters-toggle" data-filter="Motion">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M1.5 1.5V28.5L15 15L1.5 1.5Z"/>
								<path d="M15 1.5V28.5L28.5 15L15 1.5Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Motion</span>
					</button>
					<button class="work-filters-toggle" data-filter="Type">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M13.5 0H4.5V3H13.5V0Z"/>
								<path d="M25.5 0H16.5V3H25.5V0Z"/>
								<path d="M16.5 3H13.5V27H16.5V3Z"/>
								<path d="M13.5 27H4.5V30H13.5V27Z"/>
								<path d="M25.5 27H16.5V30H25.5V27Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Type</span>
					</button>
					<button class="work-filters-toggle" data-filter="Sound">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M0 9V21H7.2L18 30V0L7.2 9H0Z"/>
								<path d="M24 9H21V21H24V9Z"/>
								<path d="M30 3H27V27H30V3Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Sound</span>
					</button>
					<button class="work-filters-toggle" data-filter="Data">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M10.5 12H7.5V30H10.5V12Z"/>
								<path d="M4.5 18H1.5V30H4.5V18Z"/>
								<path d="M28.5 9H25.5V30H28.5V9Z"/>
								<path d="M16.5 0H13.5V30H16.5V0Z"/>
								<path d="M22.5 3H19.5V30H22.5V3Z"/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Data</span>
					</button>
					<button class="work-filters-toggle" data-filter="Education">
						<div class="work-filters-toggle-icon">
							<svg viewBox="0 0 30 30">
								<path d="M15 19.308L30 11.808L15 4.30798L0 11.808L15 19.308Z""/>
								<path d="M15 22.3259L6 17.8259V25.6919H24V17.8259L15 22.3259Z""/>
							</svg>
						</div>
						<span class="work-filters-toggle-text">Education</span>
					</button>
				</div>
			</main>

			${ctaHTML}
			${footerHTML}

			<script src="/assets/scripts/transition.js"></script>
			<script src="/assets/scripts/work.js"></script>
			<script src="/assets/scripts/menu.js"></script>
			<script src="/assets/scripts/clock.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`./work/index.html`, workContent, err => {
		if (err) {
			console.error(err);
		}
	});
	fs.writeFile(`./404.html`, workContent, err => {
		if (err) {
			console.error(err);
		}
	});

	// Create homepage
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
		<body data-transition="1">
			${transitionHTML}

			${navHTML}

			<main class="home">
				<div class="home-info">
					<h1 class="home-title">
						<span>We make the web weird, fun,</span>
						<span style="color: var(--pink);">and worth exploring.</span>
					</h1>
					<div class="home-links">
						<a href="/work/" class="transition-link">See what we’ve made ↗</a>
					</div>
				</div>

				<div class="home-handle home-handle-1"></div>
				<div class="home-handle home-handle-2"></div>
				<div class="home-handle home-handle-3"></div>
				<div class="home-handle home-handle-4"></div>
			</main>

			${footerHTML}

			<script src="/assets/scripts/menu.js"></script>
			<script src="/assets/scripts/transition.js"></script>
			<script src="/assets/scripts/home.js"></script>
			<script src="/assets/scripts/clock.js"></script>
		</body>
		</html>
	`;
	fs.writeFile(`./index.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});


	// Create info page
	let infoContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>No Replica | Info</title>

			${meta}

			<link rel="stylesheet" href="/style.css">
		</head>

		<body data-transition="1">
			${transitionHTML}

			${navHTML}

			<main class="info">
				<header class="info-intro">
					<div class="info-intro-logo">No Replica</div>

					<div class="info-intro-content">
						<h1 class="info-intro-title">
							<strong>No Replica merges design and development to craft memorable websites.</strong> Our practice embraces a multi-disciplinary approach that combines design with code, motion, sound, and data. We write our own code (and teach it to others),<sup><span>1</span></sup> publish original typefaces,<sup><span>2</span></sup> and compose music.<sup><span>3</span></sup>
						</h1>
						<div class="info-intro-references">
							<div class="info-intro-reference">
								<div class="info-intro-reference-number"><span>1</span></div>
								<div class="info-intro-reference-content">
									<a href="https://gdwithgd.com/" target="_blank">GD&nbsp;with&nbsp;GD&nbsp;↗</a> is our teaching hub, hosting playful tools and resources for teaching and learning design and code.
								</div>
							</div>
							<div class="info-intro-reference">
								<div class="info-intro-reference-number"><span>2</span></div>
								<div class="info-intro-reference-content">
									<a href="https://toomuchtype.com/" target="_blank">Too&nbsp;Much&nbsp;Type&nbsp;↗</a> is our experimental open-source type foundry, prototyping new font technologies through digital type specimens.
								</div>
							</div>
							<div class="info-intro-reference">
								<div class="info-intro-reference-number"><span>3</span></div>
								<div class="info-intro-reference-content">
									<a href="https://barcoloudly.com/" target="_blank">Barco&nbsp;Loudly&nbsp;↗</a> is our musical alias, releasing custom digital instruments and original songs.
								</div>
							</div>
						</div>
					</div>

					<div class="info-handle info-handle-1"></div>
					<div class="info-handle info-handle-2"></div>
					<div class="info-handle info-handle-3"></div>
					<div class="info-handle info-handle-4"></div>
				</header>

				<section class="info-section">
					<div class="info-section-title">
						<h2 class="info-section-title-text">What we do</h2>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
						<span class="info-section-title-text">What we do</span>
					</div>

					<div class="info-services">
						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/sounds-good/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/sounds-good/sounds-good-thumbnail.jpg" title="Sounds Good" class="info-service-media-content">
									<source src="/work/sounds-good/sounds-good-thumbnail.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: Sounds Good ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M3.85791 2.45401L6.16491 27.159L12.4229 19.911L19.0709 28.446L22.9649 25.752L16.0469 16.947L24.9419 14.97L3.85791 2.45401Z"/>
									</svg>
									<span>
										Web design and development
									</span>
								</h3>
								<p>
									We code websites from scratch to create one-of-a-kind user experiences for both mobile and desktop devices. We also work with modern CMS services like Webflow, WordPress, Squarespace, and more.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>

						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/the-24-hour-plays/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/the-24-hour-plays/24-hour-plays-logo.jpg" title="The 24 Hour Plays" class="info-service-media-content">
									<source src="/work/the-24-hour-plays/24-hour-plays-logo.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: The 24 Hour Plays ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M15 4.125L0.500977 15L15 25.875L29.499 15L15 4.125ZM5.49898 15L15 7.875L24.501 15L15 22.125L5.49898 15Z"/>
										<path d="M18 12H12V18H18V12Z"/>
									</svg>
									<span>
										Branding and visual identities
									</span>
								</h3>
								<p>
									We craft original identity systems by creating style guides, logos, print collateral, graphic templates, and more. We also specialize in revising and refining guidelines to bring new life to an existing brand identity.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>

						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/risd-grad-show-2024/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/risd-grad-show-2024/risd-grad-show-2024-interactive.jpg" title="RISD Grad Show 2024" class="info-service-media-content">
									<source src="/work/risd-grad-show-2024/risd-grad-show-2024-interactive.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: RISD Grad Show ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M30 13.5V16.5H22.5V20.376L28.062 25.938L27 27L25.938 28.062L20.376 22.5H16.5V30H13.5V22.5H9.624L4.062 28.062L3 27L1.938 25.938L7.5 20.376V16.5H0V13.5H7.5V9.624L1.938 4.062L3 3L4.062 1.938L9.624 7.5H13.5V0H16.5V7.5H20.376L25.938 1.938L27 3L28.062 4.062L22.5 9.624V13.5H30Z"/>
									</svg>
									<span>
										Generative and computational art
									</span>
								</h3>
								<p>
									We develop custom tools to generate motion and static graphics. This lets us create in-brand visuals just by tweaking several parameters in a graphic user interface. We can then embed these tools directly into websites, or use them to create both print and digital assets.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>

						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/williamstown-theatre-festival-2021-season/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/williamstown-theatre-festival-2021-season/wtf2021-keyart-outside.jpg" title="Williamstown Theatre Festival" class="info-service-media-content">
									<source src="/work/williamstown-theatre-festival-2021-season/wtf2021-keyart-outside.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: Williamstown Theatre Festival ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M1.5 1.5V28.5L15 15L1.5 1.5Z"/>
										<path d="M15 1.5V28.5L28.5 15L15 1.5Z"/>
									</svg>
									<span>
										Motion design
									</span>
								</h3>
								<p>
									We use motion design to create dynamic digital assets. This includes motion logos, sizzle reels, trailers, social media posts, and kinetic web elements.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>
						
						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/mini-mochi/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/mini-mochi/minimochi-thumbnail.jpg" title="Mini Mochi" class="info-service-media-content">
									<source src="/work/mini-mochi/minimochi-thumbnail.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: Mini Mochi ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M13.5 0H4.5V3H13.5V0Z"/>
										<path d="M25.5 0H16.5V3H25.5V0Z"/>
										<path d="M16.5 3H13.5V27H16.5V3Z"/>
										<path d="M13.5 27H4.5V30H13.5V27Z"/>
										<path d="M25.5 27H16.5V30H25.5V27Z"/>
									</svg>
									<span>
										Type design
									</span>
								</h3>
								<p>
									We design original typefaces, as well as focus on research and development for new type technologies. Our work focuses on variable fonts and finding new ways to animate typography through code. We publish our typefaces through our type foundry, <a href="https://toomuchtype.com/" target="_blank">Too&nbsp;Much&nbsp;Type&nbsp;↗</a>.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>

						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/earworm/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/earworm/earworm-demo2.jpg" title="Earworm" class="info-service-media-content">
									<source src="/work/earworm/earworm-demo2.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: Earworm ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M0 9V21H7.2L18 30V0L7.2 9H0Z"/>
										<path d="M24 9H21V21H24V9Z"/>
										<path d="M30 3H27V27H30V3Z"/>
									</svg>
									<span>
										Sound design and composition
									</span>
								</h3>
								<p>
									We compose and produce music, as well as develop web-based musical instruments. We find ways to connect sound and imagery, whether through sound design for animation or through coded digital experiences. We publish our output through our music platform, <a href="https://barcoloudly.com/" target="_blank">Barco&nbsp;Loudly&nbsp;↗</a>.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>

						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/colors-of-extinction/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/colors-of-extinction/colorsofextinction-thumbnail.jpg" title="Colors of Extinction" class="info-service-media-content">
									<source src="/work/colors-of-extinction/colorsofextinction-thumbnail.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: Colors of Extinction ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M10.5 12H7.5V30H10.5V12Z"/>
										<path d="M4.5 18H1.5V30H4.5V18Z"/>
										<path d="M28.5 9H25.5V30H28.5V9Z"/>
										<path d="M16.5 0H13.5V30H16.5V0Z"/>
										<path d="M22.5 3H19.5V30H22.5V3Z"/>
									</svg>
									<span>
										Data analysis and visualization
									</span>
								</h3>
								<p>
									We work with the R programming language to conduct data research and analysis. Our experience includes working with large datasets (>300GB) and creating interactive articles to share our findings.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>
						
						<div class="info-service">
							<a class="info-service-media transition-link" href="/work/baby-steps/">
								<video autoplay muted loop playsinline disableRemotePlayback poster="/work/baby-steps/baby-steps-thumbnail.jpg" title="Baby Steps" class="info-service-media-content">
									<source src="/work/baby-steps/baby-steps-thumbnail.mp4">
								</video>
								<p class="info-service-media-caption">Case Study: Baby Steps ↗</p>
							</a>
							<div class="info-service-content">
								<h3 class="info-service-title">
									<svg viewBox="0 0 30 30">
										<path d="M15 19.308L30 11.808L15 4.30798L0 11.808L15 19.308Z"/>
										<path d="M15 22.3259L6 17.8259V25.6919H24V17.8259L15 22.3259Z"/>
									</svg>
									<span>
										Teaching and learning
									</span>
								</h3>
								<p>
									We are passionate about design education and develop numerous materials for in-person and online learning. Our custom resources focus teaching technical skills like web programming, type design, and motion design. We publish our resources through our teaching initiative, <a href="https://gdwithgd.com/" target="_blank">GD&nbsp;with&nbsp;GD&nbsp;↗</a>.
								</p>
							</div>
							<div class="info-handle info-handle-1"></div>
							<div class="info-handle info-handle-2"></div>
							<div class="info-handle info-handle-3"></div>
							<div class="info-handle info-handle-4"></div>
						</div>
					</div>
				</section>

				<section class="info-section">
					<div class="info-section-title">
						<h2 class="info-section-title-text">Who we are</h2>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
						<span class="info-section-title-text">Who we are</span>
					</div>

					<div class="info-bio">
						<div class="info-bio-content">
							<div class="info-bio-image">
								<img class="info-bio-image-content" src="/assets/team/gabriel-drozdov.jpg">
							</div>
							<div class="info-bio-desc">
								<h3 class="info-bio-title">
									<strong>Gabriel Drozdov</strong><br>
									Founder and creative director
								</h3>
								<p>
									<a href="https://gabrieldrozdov.com/" target="_blank">Gabriel&nbsp;Drozdov&nbsp;↗</a> runs No Replica as well as its affiliated organizations <a href="https://toomuchtype.com/" target="_blank">Too&nbsp;Much&nbsp;Type&nbsp;↗</a>, <a href="https://gdwithgd.com/" target="_blank">GD&nbsp;with&nbsp;GD&nbsp;↗</a>, and <a href="https://barcoloudly.com/" target="_blank">Barco&nbsp;Loudly&nbsp;↗</a>. He holds a BA in Computer Science and Theater from Wesleyan University, and an MFA in Graphic Design from Rhode Island School of Design (RISD). He teaches web programming, type design, and motion design at RISD, and he releases his open-source teaching resources through the <a href="https://classroom.gdwithgd.com/" target="_blank">GD&nbsp;with&nbsp;GD Classroom&nbsp;↗</a>. Before No Replica, Gabriel worked in-house and as a freelancer with non-profits in the theater and performing arts spaces, including The 24 Hour Plays, Dramatists Guild, and Williamstown Theatre Festival. Gabriel is author of <a href="https://thisisforyou.gabrieldrozdov.com/" target="_blank">This&nbsp;Is&nbsp;For&nbsp;You&nbsp;↗</a>, an open-source archive of his career trajectory with the hopes of helping new designers find their own paths.
								</p>
							</div>
						</div>
						<div class="info-handle info-handle-1"></div>
						<div class="info-handle info-handle-2"></div>
						<div class="info-handle info-handle-3"></div>
						<div class="info-handle info-handle-4"></div>
					</div>
				</section>
			</main>
			
			${ctaHTML}
			${footerHTML}

			<script src="/assets/scripts/transition.js"></script>
			<script src="/assets/scripts/info.js"></script>
			<script src="/assets/scripts/menu.js"></script>
			<script src="/assets/scripts/clock.js"></script>
		</body>

		</html>
	`;
	fs.writeFile(`./info/index.html`, infoContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generatePages();