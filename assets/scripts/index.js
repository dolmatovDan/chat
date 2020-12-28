const chat = document.getElementById('chat');
const messageButton = document.getElementById('messageButton');
const messageInput = document.getElementById('messageInput');
const groups = document.querySelector('.dialogues__groups');
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


function createMessage({text, status, id, logo}) { //заменить на объект
	const container = createElement('div', 'message-holder');
	const senderInfo = createSenderInfo(id, logo);

	const elem = createElement('div', [`message--${status}`, 'message']);
	elem.innerText = text;
	//const shouldShowName1 = status === 'friend' && messagesQueue.length === 0; //Попробовать переработать
	const shouldShowName2 = status === 'friend' && messagesQueue[messagesQueue.length - 1].id !== id; //Попробовать переработать 
	if (shouldShowName2) {
		container.prepend(senderInfo);
	}
	container.append(elem);
	return container;
}



groups.addEventListener('click', (e) => {
	const targetElem = e.target;
	const parent = targetElem.closest('.group');
	const arrElem = document.querySelectorAll('.group');
	if (!parent) {
		return;
	}
	for(let i = 0; i < arrElem.length; i++) {
		arrElem[i].classList.remove('group--click');
	}
	if (parent) {
		
		parent.classList.add('group--click');
	}
})

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
	createAndSendMessage({
		text: message,
		status: 'friend',
		id,
		logo: icon
	});
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

		createAndSendMessage({text, status:'my', id:'me', logo:''});
		messagesQueue.push({
			id: 'me',
			message: text,
		});
		const timeout = genRandomInRange(1000, 5000);
		setTimeout(sendFriendMessage, timeout);
		setTimeout(sendFriendMessage, genRandomInRange(timeout + 1000, timeout + 3000));
		messageInput.value = "";
}


