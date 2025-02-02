let projects;
fetch('/data.json')
  .then((response) => response.json())
  .then((data) => {
	projects = data;
	generateAll();
})

function generateAll() {
	const container = document.querySelector('.home-blocks');

	for (let key of Object.keys(projects)) {
		let entry = projects[key];

		if (!entry['active']) {
			continue
		}

		// Build element
		let elmnt = document.createElement('div');
		elmnt.classList.add('home-block');
		elmnt.style.transform = `translateX(calc(${Math.random()*50-25}vw - 50%)) translateY(calc(${Math.random()*50-25}vh - 50%)) translateZ(${Math.random()*50-25}vh)`;
		elmnt.innerHTML = `<img src="/assets/micro/${entry['thumbnail']['micro-image']}">`;

		// Add to DOM
		container.appendChild(elmnt);
	}
}


let targetRotXOffset = 0;
function rotateBlocks() {
	targetRotXOffset += 0.1
	if (targetRotXOffset >= 360) {
		targetRotXOffset = 0;
	}
	requestAnimationFrame(rotateBlocks);
}
rotateBlocks();

let elmntIndex = 0;
function moveElement() {
	let elmnts = document.querySelectorAll('.home-block');
	let elmnt = elmnts[elmntIndex];
	elmnt.style.transform = `translateX(calc(${Math.random()*50-25}vw - 50%)) translateY(calc(${Math.random()*50-25}vh - 50%)) translateZ(${Math.random()*100-50}vh) `;
	elmntIndex++;
	if (elmntIndex >= elmnts.length) {
		elmntIndex = 0;
	}
}
setInterval(moveElement, 100)

const container = document.querySelector('.home-blocks');
let targetRotX = 0;
let currentRotX = 0;
let targetRotY = 0;
let currentRotY = 0;
window.addEventListener('mousemove', (e) => {
	const posX = e.clientX/window.innerWidth;
	const posY = e.clientY/window.innerHeight;
	targetRotX = posX;
	targetRotY = posY;
})

function updateRotation() {
	currentRotX = currentRotX - (currentRotX-targetRotX)/50;
	currentRotY = currentRotY - (currentRotY-targetRotY)/50;
	container.style.transform = `rotateY(${currentRotX*180-90 + targetRotXOffset}deg) rotateX(${currentRotY*180-90}deg)`;
	for (let elmnt of document.querySelectorAll('.home-block')) {
		let img = elmnt.querySelector('img');
		img.style.transform = `rotateY(${-currentRotX*90+45 - targetRotXOffset}deg) rotateX(${currentRotY*90-45}deg)`;
	}
	requestAnimationFrame(updateRotation);
}
updateRotation();