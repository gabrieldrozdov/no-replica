// Transition in element
function initializeTransition(elmnt) {
	// Create passthru container
	let elmntContainer = document.createElement('div');
	elmntContainer.classList.add('transition-parent');
	elmnt.parentNode.replaceChild(elmntContainer, elmnt);
	elmntContainer.appendChild(elmnt);

	// Position element
	elmnt.style.transition = 'unset';
	elmnt.style.transform = `translate(${Math.random() < .5 ? -200 : 200}vw, ${Math.random()*200-100}vh)`;

	// Create cursor
	let elmntCursor = document.createElement('div');
	elmntCursor.classList.add('transition-cursor');
	elmntCursor.style.transform = `translate(${Math.random()*50-25}%, ${Math.random()*50-25}%)`;
	elmntCursor.innerHTML = `
		<svg viewBox="0 0 100 100">
			<polygon points="26.379 10 26.379 90 49.236 63.326 84.316 65.166 26.379 10"/>
		</svg>
	`;
	elmnt.appendChild(elmntCursor);
}
function transitionIn(elmnt) {
	const elmntCursor = elmnt.querySelector('.transition-cursor');

	// Create overlay
	const colors = ['pink', 'blue', 'green', 'yellow'];
	let elmntOverlay = document.createElement('div');
	elmntOverlay.classList.add('transition-overlay');
	elmntOverlay.style.backgroundColor = `var(--${colors[Math.floor(Math.random()*colors.length)]})`;
	elmnt.appendChild(elmntOverlay);

	// Move element in
	let transitionLength = Math.random()*.5+.5;
	elmnt.dataset.transitionLength = transitionLength;
	setTimeout(() => {
		elmnt.style.transition = `transform ${transitionLength}s cubic-bezier(0.25, 1, 0.5, 1)`;
	}, 100)
	setTimeout(() => {
		elmnt.style.transform = 'scale(0.9)';

		setTimeout(() => {
			elmnt.style.transition = `transform .2s`;
			elmntOverlay.remove();
			elmnt.style.transform = '';
			elmntCursor.style.transition = `transform ${transitionLength+.25}s cubic-bezier(0.76, 0, 0.24, 1)`;
		}, transitionLength*1000)

		// Move cursor out
		setTimeout(() => {
			elmnt.style.transition = '';
			elmntCursor.style.transform = `translate(${Math.random() < .5 ? -200 : 200}vw, ${Math.random()*200-100}vh)`;

			// Delete cursor
			setTimeout(() => {
				elmntCursor.remove();
			}, (transitionLength+.25)*1000)
		}, transitionLength*1000+200)
	}, Math.random()*250+100)
}