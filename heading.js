function initializeHeader() {
	const colors = ["pink", "blue", "yellow"];
	const colorsCropped = [];
	for (let i=0; i<3; i++) {
		colorsCropped.push(colors[Math.floor(Math.random()*colors.length)]);
	}
	const header = document.querySelector('h1');
	const headerGroups = header.querySelectorAll('span');

	// Build header and cursors
	for (let headerGroup of headerGroups) {
		let temp = "";
		for (let character of headerGroup.innerText) {
			// Fix space characters
			if (character == " ") {
				character = "&nbsp;";
			}
	
			// Determine origin and transition speed
			let origin = [Math.random()*200-100, -100];
			let trans = Math.random()*.5+.5;

			// Determine color
			let color = colorsCropped[Math.floor(Math.random()*colorsCropped.length)];
			
			temp += `
				<span class="header-letter" style="transform: translate(${origin[0]}vw, ${origin[1]}vh); transition: transform ${trans}s cubic-bezier(0.25, 1, 0.5, 1), color .5s .5s;" data-trans="${trans}" data-color="${color}">
					${character}
					<div class="header-cursor" style="transition: transform ${trans*2}s cubic-bezier(0.76, 0, 0.24, 1); transform: translate(${Math.random()*50-25}%, ${Math.random()*50-25}%);">
						<svg viewBox="0 0 100 100" style="fill: var(--${color});">
							<polygon points="26.379 10 26.379 90 49.236 63.326 84.316 65.166 26.379 10"/>
						</svg>
					</div>
				</span>
			`;
		}
		headerGroup.innerHTML = temp;

		// Animate header
		for (let span of headerGroup.querySelectorAll('span')) {
			let trans = parseFloat(span.dataset.trans)*1000; 
			setTimeout(() => {
				span.style.transform = "scale(.9)";

				// Determine destination for cursor
				let destination = [Math.random()*200-100, -100];

				setTimeout(() => {
					span.dataset.out = 1;
					span.style.transition = "transform .2s";
					span.style.transform = "";
					const cursor = span.querySelector('.header-cursor');
					cursor.style.transform = `translate(${destination[0]}vw, ${destination[1]}dvh)`;
					span.style.color = `var(--${span.dataset.color})`;
				}, trans+Math.random()*200)
			}, Math.random()*400+250)
		}
	}
}
initializeHeader();