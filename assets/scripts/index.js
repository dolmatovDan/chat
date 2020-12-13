const chat = document.getElementById('chat');
const messageButton = document.getElementById('messageButton');
const messageInput = document.getElementById('messageInput');
const messagesQueue = [];
const phrases = ['Hi Justin! We just wanted to welcome you to our team.',
				'We are all excited to have you, we loved the work that you showed us during your interview and you fit well with everyone on our team and company. If you have any questions feel free to ask and someone on the team will help you out.',
				'Since you were already working within the company for another position, it won’t long until you have access to all of our files.',
				'Hey Justin, I’m looking forward to working with you on some of the upcoming projects! But to answer your questions, yes we do have a separate group chat. I’m sure you’ll be added soon!'];
const senders = [{
	id: 'Victor',
	icon: 'assets/img/Victor.png',
},
{
	id: 'Angela',
	icon: 'assets/img/Angela.png',
},
{
	id: 'Terry',
	icon: 'assets/img/Terry.png',
}];


function createMessage(text, status, id, logo) { //заменить на объект
	const container = createElement('div', 'message-holder');
	const senderInfo = createSenderInfo(id, logo);

	const elem = createElement('div', [`message--${status}`, 'message']);
	elem.innerText = text;
	const shouldShowName1 = status === 'friend' && messagesQueue.length === 0; //Попробовать переработать
	const shouldShowName2 = status === 'friend' && messagesQueue.length !== 0 && messagesQueue[messagesQueue.length - 1].id !== id; //Попробовать переработать 
	if (shouldShowName1 ||  shouldShowName2) {
		container.prepend(senderInfo);
	}
	container.append(elem);
	return container;
}

function createSenderInfo(surName, logo) {
	const container = createElement('div', 'message-container');
	const containerSender = createElement('div', 'message__sender');
	const icon = createElement('div', 'message__icon');
	const name = createElement('div', 'message__name');
	const time = createElement('span', 'message__time');

	time.innerText = createDate();

	name.innerText = surName;
	icon.style.backgroundImage = `url(${logo})`;
	containerSender.append(icon, name);
	container.append(containerSender, time);
	return container;
}

function createAndSendMessage(text, status, id, logo) { //заменить на объект
	if (chat) {
		chat.append(createMessage(text, status, id, logo));
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

	const message = phrases[genRandom(phrases.length)]; 
	const {id, icon} = senders[genRandom(senders.length)]; 
	createAndSendMessage(message, 'friend', id, icon);
	messagesQueue.push({
		id,
		message,
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


