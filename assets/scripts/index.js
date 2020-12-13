const chat = document.getElementById('chat');
const messageButton = document.getElementById('messageButton');
const messageInput = document.getElementById('messageInput');
const messagesQueue = [];
const phrases = ['Hi Justin! We just wanted to welcome you to our team.',
				'We are all excited to have you, we loved the work that you showed us during your interview and you fit well with everyone on our team and company. If you have any questions feel free to ask and someone on the team will help you out.',
				'Since you were already working within the company for another position, it won’t long until you have access to all of our files.',
				'Hey Justin, I’m looking forward to working with you on some of the upcoming projects! But to answer your questions, yes we do have a separate group chat. I’m sure you’ll be added soon!'];
const arrId = ['Robert', 'Angella', 'Terry'];

function createMessage(text, status, id) { //заменить на объект
	const elem = document.createElement('div');
	elem.classList.add(`chat__message--${status}`, 'chat__message');
	elem.innerText = text;
	const shouldShowName1 = status === 'friend' && messagesQueue.length === 0; //Попробовать переработать
	const shouldShowName2 = status === 'friend' && messagesQueue.length !== 0 && messagesQueue[messagesQueue.length - 1].id !== id; //Попробовать переработать 
	if (shouldShowName1 ||  shouldShowName2) {
		elem.innerText = id + ' ' + elem.innerText;
	}
	return elem;
}

function createAndSendMessage(text, status, id) { //заменить на объект
	if (chat) {
		chat.append(createMessage(text, status, id));
	} else {
		console.warn('Нету переменной chat');
	}
}


messageButton.addEventListener('click', () => {
	prepareAndSendMessage(messageInput.value);
})

messageInput.addEventListener('keydown', (e) => {
	if (e.key === "Enter") {
		prepareAndSendMessage(messageInput.value);
	}
})

function sendFriendMessage() {

	let meassage = phrases[genRandom(phrases.length)]; 
	let id = arrId[genRandom(arrId.length)]; 
	createAndSendMessage(meassage, 'friend', id);
	messagesQueue.push({
		id,
		meassage,
	})
	
}

function prepareAndSendMessage(text) {
		if (!text.trim()) {
			messageInput.value = "";
			return;
		}

		createAndSendMessage(text, 'my', 'me');
		messagesQueue.push({
			id: 'me',
			message: text,
		});
		sendFriendMessage();
		sendFriendMessage();
		messageInput.value = "";
}


function genRandom(num) {
	return Math.floor(Math.random() * num);
}


