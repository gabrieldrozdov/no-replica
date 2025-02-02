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

			const initialPos = [-110 - Math.random()*50, Math.random()*100-50];
			temp += `
				<div class="info-intro-logo-letter" style="transform: translate(${initialPos[0]}vw, ${initialPos[1]}vh)" data-state="0">
					<div class="info-intro-logo-letter-text"${rFix}>${letter}</div>
					<div class="info-intro-logo-letter-cursor" style="transform: translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)">
						<svg viewBox="0 0 100 100">
							<polygon points="26.379 10 26.379 90 49.236 63.326 84.316 65.166 26.379 10"/>
						</svg>
					</div>
				</div>
			`;
		}
	}
	logo.innerHTML = temp;

	// Animate in
	for (let letter of logo.querySelectorAll('.info-intro-logo-letter')) {
		const transitionLength = Math.random()*.5+.5;
		letter.style.transition = `${transitionLength}s`;
		setTimeout(() => {
			letter.style.transform = 'scale(0.8)';

			setTimeout(() => {
				letter.style.transition = 'transform .3s';
				letter.style.transform = 'unset';

				// Animate out
				setTimeout(() => {
					letter.dataset.state = 1;
					const cursor = letter.querySelector('.info-intro-logo-letter-cursor');
					cursor.style.transform = `translate(${110 + Math.random()*50}vw, ${Math.random()*100-50}vh)`;
				}, 250 + Math.random()*100)
			}, transitionLength*1000 + Math.random()*100)
		}, Math.random()*100+250)
	}
}
logoAnimation();

// Services elastic
for (let infoService of document.querySelectorAll('.info-service')) {
	infoService.dataset.elasticScaler = Math.round(Math.random()*5+20);
	infoService.dataset.elasticFriction = Math.round(Math.random()*5+10);
	infoService.classList.add('elastic');

	const infoServiceMedia = infoService.querySelector('.info-service-media');
	infoServiceMedia.dataset.elasticScaler = Math.round(Math.random()*5+5);
	infoServiceMedia.dataset.elasticFriction = Math.round(Math.random()*5+10);
	infoServiceMedia.classList.add('elastic');

	const infoServiceMediaContent = infoService.querySelector('.info-service-media-content');
	infoServiceMediaContent.dataset.elasticScaler = Math.round(Math.random()*5+5);
	infoServiceMediaContent.dataset.elasticFriction = Math.round(Math.random()*5+10);
	infoServiceMediaContent.classList.add('elastic');
}

// Bios elastic
for (let infoBio of document.querySelectorAll('.info-bio')) {
	infoBio.dataset.elasticScaler = Math.round(Math.random()*5+20);
	infoBio.dataset.elasticFriction = Math.round(Math.random()*5+10);
	infoBio.classList.add('elastic');

	const infoBioImage = infoBio.querySelector('.info-bio-image');
	infoBioImage.dataset.elasticScaler = Math.round(Math.random()*5+5);
	infoBioImage.dataset.elasticFriction = Math.round(Math.random()*5+10);
	infoBioImage.classList.add('elastic');

	const infoBioImageContent = infoBioImage.querySelector('.info-bio-image-content');
	infoBioImageContent.dataset.elasticScaler = Math.round(Math.random()*5+5);
	infoBioImageContent.dataset.elasticFriction = Math.round(Math.random()*5+10);
	infoBioImageContent.classList.add('elastic');
}