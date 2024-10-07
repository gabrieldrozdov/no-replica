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

function generatePages() {
	let workItems = '';

	for (let key of Object.keys(data)) {
		let entry = data[key];
		let folder = "/work/" + key;

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

		// Add to HTML string
		workItems += `
			<a href="/work/${key}/" class="work-item" data-project="${key}" data-tags="${metaTags}">
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
				<div class="project" data-state="2">
					<div class="project-info">
						<div class="project-nav">
							<a class="project-nav-logo" href="/">No Replica</a>
							<div class="project-nav-links">
								<a href="/">Work</a>
								<a href="/about/">About</a>
								<a href="mailto:gabriel@noreplica.com">Contact</a>
							</div>
						</div>
						<h1 class="project-title">${entry['name']}</h1>
						<p class="project-tagline">${entry['caption']}</p>
						<div class="project-desc">
							${entry['desc']}
						</div>
						${projectLinks}
					</div>

					<div class="project-media">
						${projectMedia}
					</div>
				</div>
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
		<body>

			<h1 class="logo">No Replica</h1>

			<header class="home-header">
				<div class="home-header-intro">
					<p class="home-header-desc">
						No Replica is a new design and development studio with a mission to craft really, really special visual identities, websites, and custom tools. We do that by bridging the gaps between multiple disciplines. We write our own code (and teach it to others).<sup>1</sup> We design our own fonts.<sup>2</sup> We compose our own music.<sup>3</sup> But most of all, we love what we do, we have fun doing it, and we try not to take ourselves too seriously.
					</p>
					<div class="home-header-links">
						<a href="/about/" class="home-header-cta home-header-cta-alt">
							<div class="home-header-cta-bubble"></div>
							<span class="home-header-cta-text">About the studio</span>
						</a>
						<a href="mailto:gabriel@noreplica.com" class="home-header-cta">
							<div class="home-header-cta-bubble"></div>
							<span class="home-header-cta-text">Get in touch</span>
						</a>
					</div>
				</div>
				<div class="home-header-references">
					<div class="home-header-reference">
						<div class="home-header-reference-number">1</div>
						<p class="home-header-reference-text">
							<strong>GD with GD</strong> is our teaching hub, hosting playful tools and resources for teaching and learning design and code.<br>
							<a href="https://gdwithgd.com/" target="_blank">Learn how to design!</a>
						</p>
					</div>
					<div class="home-header-reference">
						<div class="home-header-reference-number">2</div>
						<p class="home-header-reference-text">
							<strong>Too Much Type</strong> is our experimental open-source type foundry, prototyping new font technologies through digital type specimens.<br>
							<a href="https://toomuchtype.com/" target="_blank">Test out some fonts!</a>
						</p>
					</div>
					<div class="home-header-reference">
						<div class="home-header-reference-number">3</div>
						<p class="home-header-reference-text">
							<strong>Barco Loudly</strong> is our musical alias, releasing custom instruments and original songs.<br>
							<a href="https://barcoloudly.com/" target="_blank">Play some music!</a>
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
						<div class="work-nav-toggle" data-filter="Branding">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Branding</div>
						</div>
						<div class="work-nav-toggle" data-filter="Web">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Web</div>
						</div>
						<div class="work-nav-toggle" data-filter="Generative">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Generative</div>
						</div>
						<div class="work-nav-toggle" data-filter="Interactive">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Interactive</div>
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
		
					<a href="" class="work-nav-cta">
						<div class="work-nav-cta-bubble"></div>
						<span class="work-nav-cta-text">Questions? Reach out!</span>
					</a>
				</div>
		
				<div class="work-items">
					${workItems}
				</div>
			</main>

			<div class="project" data-state="0">
			</div>

			<script src="/script.js"></script>
			<script src="/lazy.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`work/index.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
// generatePages();

function generatePagesAlt() {
	let workItems = '';

	for (let key of Object.keys(data)) {
		let entry = data[key];
		let folder = "/work/" + key;

		// ————————————————————————————————————
		// HOMEPAGE WORK ITEMS
		// ————————————————————————————————————

		// Tags
		let tags = '';
		let metaTags = '';
		for (let tag of entry['tags']) {
			tags += `<li>${tag}</li>`;
			metaTags += `${tag},`;
		}

		// Add to HTML string
		workItems += `
			<a href="/work/${key}/" class="work-item" data-project="${key}" data-tags="${metaTags}">
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
			</a>
		`;
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
		<body>

			<h1 class="logo">No Replica</h1>

			<header class="home-header">
				<div class="home-header-intro">
					<p class="home-header-desc">
						No Replica is a new design and development studio with a mission to craft really, really special visual identities, websites, and custom tools. We do that by bridging the gaps between multiple disciplines. We write our own code (and teach it to others).<sup>1</sup> We design our own fonts.<sup>2</sup> We compose our own music.<sup>3</sup> But most of all, we love what we do, we have fun doing it, and we try not to take ourselves too seriously.
					</p>
					<div class="home-header-links">
						<a href="/about/" class="home-header-cta home-header-cta-alt">
							<div class="home-header-cta-bubble"></div>
							<span class="home-header-cta-text">About the studio</span>
						</a>
						<a href="mailto:gabriel@noreplica.com" class="home-header-cta">
							<div class="home-header-cta-bubble"></div>
							<span class="home-header-cta-text">Get in touch</span>
						</a>
					</div>
				</div>
				<div class="home-header-references">
					<div class="home-header-reference">
						<div class="home-header-reference-number">1</div>
						<p class="home-header-reference-text">
							<strong>GD with GD</strong> is our teaching hub, hosting playful tools and resources for teaching and learning design and code.<br>
							<a href="https://gdwithgd.com/" target="_blank">Learn how to design!</a>
						</p>
					</div>
					<div class="home-header-reference">
						<div class="home-header-reference-number">2</div>
						<p class="home-header-reference-text">
							<strong>Too Much Type</strong> is our experimental open-source type foundry, prototyping new font technologies through digital type specimens.<br>
							<a href="https://toomuchtype.com/" target="_blank">Test out some fonts!</a>
						</p>
					</div>
					<div class="home-header-reference">
						<div class="home-header-reference-number">3</div>
						<p class="home-header-reference-text">
							<strong>Barco Loudly</strong> is our musical alias, releasing custom instruments and original songs.<br>
							<a href="https://barcoloudly.com/" target="_blank">Play some music!</a>
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
						<div class="work-nav-toggle" data-filter="Branding">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Branding</div>
						</div>
						<div class="work-nav-toggle" data-filter="Web">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Web</div>
						</div>
						<div class="work-nav-toggle" data-filter="Generative">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Generative</div>
						</div>
						<div class="work-nav-toggle" data-filter="Interactive">
							<div class="work-nav-toggle-bubble"></div>
							<div class="work-nav-toggle-text">Interactive</div>
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
		
					<a href="" class="work-nav-cta">
						<div class="work-nav-cta-bubble"></div>
						<span class="work-nav-cta-text">Questions? Reach out!</span>
					</a>
				</div>
		
				<div class="work-items">
					${workItems}
				</div>
			</main>

			<div class="project" data-state="0">
			</div>

			<script src="/script.js"></script>
			<script src="/lazy.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`work/index.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
// generatePagesAlt();