// Open and close mobile menu
function openMenu() {
	const navLinks = document.querySelector('.nav-links');
	navLinks.dataset.active = 1;
}
function closeMenu() {
	const navLinks = document.querySelector('.nav-links');
	navLinks.dataset.active = 0;
}

// Create nav spacer blocks
let slogans = [
	"We make art with code!",
	"We make toys and tools!",
	"We make weird interfaces!",
	"We make design systems!",
	"We make digital exhibitions!",
	"We make open source fonts!",
	"We make musical instruments!",
	"We make visual identities!",
	"We make teach design!",
	"We make fun experiences!",
	"We make things worth remembering!",
	"We make experiments!"
]
shuffleArray(slogans);
let navSpacer = document.querySelector('.nav-spacer');
let navSpacerBlocks = '';
for (let slogan of slogans) {
	navSpacerBlocks += `<span>${slogan}</span>`;
}
navSpacerBlocks = `
	<div class="nav-spacer-blocks">
		${navSpacerBlocks}
	</div>
`;
navSpacer.innerHTML = navSpacerBlocks + navSpacerBlocks + navSpacerBlocks + navSpacerBlocks;

// Shuffle array helper function
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
