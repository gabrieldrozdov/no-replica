// Logo animation
function logoAnimation() {
	// Initialize letters
	const logo = document.querySelector('.info-intro-logo');
	let temp = "";
	for (let letter of logo.innerText) {
		if (letter == " ") {
			temp += `
				<div>&nbsp;</div>
			`;

		} else {

			let rFix = '';
			if (letter == "R") {
				rFix = ' style="margin-right: -.05em;"';
			}

			const initialPos = [Math.random()*200-100, -100];
			temp += `
				<div class="info-intro-logo-letter" style="transform: translate(${initialPos[0]}vw, ${initialPos[1]}vh)" data-state="0">
					<div class="info-intro-logo-letter-text"${rFix}>${letter}</div>
					<div class="info-intro-logo-letter-cursor" style="transform: translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)">
						<svg viewBox="-10 -10 110 110"><path d="M100,39.52c-.05,2-1.32,3.69-3.22,4.3l-39.94,13.02-13.02,39.95c-.62,1.9-2.3,3.16-4.29,3.21h-.11c-1.96,0-3.66-1.17-4.36-2.99L.32,6.33C-.35,4.58.06,2.67,1.38,1.36,2.69.06,4.58-.35,6.31.31l90.7,34.74c1.87.72,3.04,2.47,2.99,4.46h0Z"/></svg>
					</div>
				</div>
			`;
		}
	}
	logo.innerHTML = temp;
	logo.style.opacity = 1;

	// Animate in
	for (let letter of logo.querySelectorAll('.info-intro-logo-letter')) {
		const transitionLength = Math.random()*.5+.5;
		letter.style.transition = `${transitionLength}s`;
		setTimeout(() => {
			letter.style.transform = 'scale(0.8)';

			setTimeout(() => {
				letter.dataset.state = 1;
				letter.style.transition = 'transform .3s';
				letter.style.transform = 'unset';

				// Animate out
				setTimeout(() => {
					const cursor = letter.querySelector('.info-intro-logo-letter-cursor');
					cursor.style.transform = `translate(${Math.random()*200-100}vw, ${-100}vh)`;
				}, 250 + Math.random()*100)
			}, transitionLength*1000 + 200)
		}, Math.random()*500+250)
	}
}
logoAnimation();