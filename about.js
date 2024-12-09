// Scrolling background image
const body = document.querySelector('body');
body.addEventListener('wheel', () => {
	body.style.backgroundPosition = `0 ${window.scrollY/-20}px`;
})