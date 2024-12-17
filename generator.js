const fs = require('fs');

// Get JSON
const data = require('./data.json');

// Global elements
const meta = `
	<meta name="author" content="No Replica">
	<meta name="keywords" content="Graphic Design, Web Design, Web Development, Creative Coding, Branding, Visual Identity, Studio, Agency">
	<meta name="description" content="A new digital design studio using code to create websites, visual identities, and custom tools.">
	<meta property="og:url" content="https://noreplica.com/">
	<meta name="og:title" property="og:title" content="No Replica">
	<meta property="og:description" content="A new digital design studio using code to create websites, visual identities, and custom tools.">
	<meta property="og:image" content="/assets/meta/opengraph.png">
	<link rel="icon" type="png" href="/assets/meta/favicon.png"></link>
`;

// Footer code
let footerHTML = `
	<footer class="footer">
		<div class="footer-clock">
			<div class="footer-clock-hand hour-hand"></div>
			<div class="footer-clock-hand min-hand"></div>
			<div class="footer-clock-hand second-hand"></div>
		</div>
		<p class="footer-info">
			© 2024 No Replica. All rights reserved.
			<br>
			<a href="/">Projects ↗&nbsp;</a> <a href="/about/">About Us ↗&nbsp;</a>
			<br><br>
			Colophon
			<br>
			Limkin by <a href="https://toomuchtype.com/" target="_blank">Too Much Type ↗</a>
			<br><br>
			Follow us online
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
			<a ${itemURL} class="project-list-link">
				${newLinkContent}
			</a>
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
				<video autoplay muted loop playsinline disableRemotePlayback poster="${folder}/${entry['thumbnail']['image']}" title="${entry['name']}">
					<source data-src="${folder}/${entry['thumbnail']['video']}">
				</video>
			`;
		} else {
			thumbnail = `
				<img src="${folder}/${entry['thumbnail']['image']}" alt="${entry['name']}">
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
			<a class="work-item" data-project="${key}" data-tags="${metaTags}" data-direct="${dataDirect}" ${workItemURL}>
				<div class="work-item-media">
					${thumbnail}
				</div>
				<div class="work-item-info">
					<div>
						<h2>${entry['name']}</h2>
						<ul>
							${tags}
						</ul>
					</div>
					<div>
						<p>${entry['caption']}</p>
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
								<source data-src="${mediaItem['video']}">
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
			<body>
				<div class="project">
					<header class="project-info">
						<nav class="project-nav">
							<a class="project-nav-logo" href="/">No Replica</a>
							<div class="project-nav-links">
								<a href="/">Work</a>
								<a href="/about/">About</a>
								<a href="mailto:gabriel@noreplica.com">Contact</a>
							</div>
						</nav>
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
					<div class="project-list-content">
						${moreProjects}
					</div>
				</section>

				${footerHTML}

				<script src="/project.js"></script>
				<script src="/clock.js"></script>
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

	// Homepage portfolio grid
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
		<body class="home">

			<h1 class="logo">No Replica</h1>

			<header class="home-header">
				<div class="home-header-intro">
					<p class="home-header-desc">
						No Replica merges design and development to craft bespoke digital experiences. We take a multi-disciplinary approach to create visual identities, websites, and custom tools. We write our own code (and teach it to others),<sup>1</sup> publish typefaces,<sup>2</sup> and compose music.<sup>3</sup>
					</p>
					<div class="home-header-links">
						<a href="/about/" class="home-header-cta home-header-cta-alt">
							<span class="home-header-cta-text">About the studio</span>
						</a>
						<a href="mailto:gabriel@noreplica.com" class="home-header-cta">
							<span class="home-header-cta-text">Get in touch</span>
						</a>
					</div>
				</div>
				<div class="home-header-references">
					<div class="home-header-reference">
						<div class="home-header-reference-number">1</div>
						<p class="home-header-reference-text">
							<a href="https://gdwithgd.com/" target="_blank">GD with GD ↗</a> is our teaching hub, hosting playful tools and resources for teaching and learning design and code.
						</p>
					</div>
					<div class="home-header-reference">
						<div class="home-header-reference-number">2</div>
						<p class="home-header-reference-text">
							<a href="https://toomuchtype.com/" target="_blank">Too Much Type ↗</a> is our experimental open-source type foundry, prototyping new font technologies through digital type specimens.
						</p>
					</div>
					<div class="home-header-reference">
						<div class="home-header-reference-number">3</div>
						<p class="home-header-reference-text">
							<a href="https://barcoloudly.com/" target="_blank">Barco Loudly ↗</a> is our musical alias, releasing custom instruments and original songs.
						</p>
					</div>
				</div>
			</header>
		
			<main class="work">
				<div class="work-nav" data-active="0">
					<div class="work-nav-filters">
						<div class="work-nav-toggle" data-active="1" data-filter="All">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">All</div>
						</div>
						<div class="work-nav-toggle" data-filter="Web">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Web</div>
						</div>
						<div class="work-nav-toggle" data-filter="Branding">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Branding</div>
						</div>
						<div class="work-nav-toggle" data-filter="Computational art">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Computational art</div>
						</div>
						<div class="work-nav-toggle" data-filter="Motion">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Motion</div>
						</div>
						<div class="work-nav-toggle" data-filter="Type">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Type</div>
						</div>
						<div class="work-nav-toggle" data-filter="Sound">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Sound</div>
						</div>
						<div class="work-nav-toggle" data-filter="Data">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Data</div>
						</div>
						<div class="work-nav-toggle" data-filter="Education">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Education</div>
						</div>
					</div>
				</div>
		
				<div class="work-items">
					${workItems}
				</div>
			</main>

			${footerHTML}

			<script src="/script.js"></script>
			<script src="/clock.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`work/index.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});
	fs.writeFile(`index.html`, homeContent, err => {
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