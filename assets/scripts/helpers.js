function createElement(name, classes, atributs = {}) {
	const elem = document.createElement(name);
	if (Array.isArray(classes)) {
		for (let i = 0; i < classes.length; i ++) {
			elem.classList.add(classes[i]);
		}
	} else {
		elem.classList.add(classes);
	}


	for (key in atributs) {
		elem.setAttribute(key, atributs[key]);
	}

	return elem;
}

function genRandom(num) {
	return Math.floor(Math.random() * num);
}

function createDate() {
	const date = new Date();
	let hours = date.getHours();
	const min = date.getMinutes();
	if (hours >= 12) {
		hours -= 12;
		return hours + ':' + min + ' ' + 'P.M.'
	}

	return hours + ':' + min + ' ' + 'A.M.'

}