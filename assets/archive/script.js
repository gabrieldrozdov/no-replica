// Logo animation
const colors = ['blue', 'yellow', 'green'];
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
			<span class="logo-letter" style="transform: translate(${origin[0]}vw, ${origin[1]}vh) scale(.8); transition: transform ${trans}s cubic-bezier(0.25, 1, 0.5, 1); ${kerning}; --primary: var(--${colors[Math.floor(Math.random()*colors.length)]});" data-trans="${trans}" data-out="0">
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