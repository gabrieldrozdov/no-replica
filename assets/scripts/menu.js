// Open and close mobile menu
function openMenu() {
	const navLinks = document.querySelector('.nav-links');
	navLinks.dataset.active = 1;
}
function closeMenu() {
	const navLinks = document.querySelector('.nav-links');
	navLinks.dataset.active = 0;
}