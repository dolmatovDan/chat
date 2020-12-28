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

let dialogues = {
	'0': [],
};

class Chat {
	constructor(settings) {
		this.chat = document.getElementById(this.initializeId('chatId'));
		this.messageButton = document.getElementById(this.initializeId('messageButtonId'));
		this.messageInput = document.getElementById(this.initializeId('messageInputId'));
		this.groups = document.getElementById(this.initializeId('groupsId'));
		this.messagesQueue = settings.messages ? [...settings.messages] : [];
		this.id = settings.id;
		console.log(this.messagesQueue);

		this.addListeners();

	}

	initializeId(key) {
		const ids = {
			chatId: 'chat',
			messageButtonId: 'messageButton',
			messageInputId: 'messageInput',
			groupsId: 'groups',
		}

		return ids[key];
	}

	destroy() {
		this.messagesQueue = [];
		this.chat.innerHTML = '';
	}


	addListeners() {
		this.messageButton.addEventListener('click', () => {
			this.prepareAndSendMessage(messageInput.value);
		})

		this.messageInput.addEventListener('keydown', (e) => {
			if (e.key === "Enter") {
				this.prepareAndSendMessage(this.messageInput.value);
			}
		})

		this.groups.addEventListener('click', (e) => {
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
	}

	sendFriendMessage() {
		const message = phrases[Helpers.genRandom(phrases.length)]; 
		const {id, icon} = senders[Helpers.genRandom(senders.length)]; 
		this.createAndSendMessage({
			text: message,
			status: 'friend',
			id,
			logo: icon
		});
		this.messagesQueue = this.messagesQueue.concat({
			id,
			message,
		})
		console.log(this.messagesQueue, 'chat');
	}

	prepareAndSendMessage(text) {
		if (!text.trim()) {
			this.messageInput.value = "";
			return;
		}

		this.createAndSendMessage({text, status:'my', id:'me', logo:''});
		this.messagesQueue = this.messagesQueue.concat({
			id: 'me',
			message: text,
		});


		const timeout = Helpers.genRandomInRange(1000, 5000);
		setTimeout(() => {
			this.sendFriendMessage();
		}, timeout);
		setTimeout(() => {
			this.sendFriendMessage();
		}, Helpers.genRandomInRange(timeout + 1000, timeout + 3000));
		this.messageInput.value = "";
	}

	createAndSendMessage(obj) {
		if (this.chat) {
			this.chat.append(this.createMessage(obj));
		} else {
			console.warn('Нету переменной chat');
		}
	}

	createSenderInfo(surName, logo) {
		const container = Helpers.createElement('div', 'message-container');
		const containerSender = Helpers.createElement('div', 'message__sender');
		const icon = Helpers.createElement('div', 'message__icon');
		const name = Helpers.createElement('div', 'message__name');
		const time = Helpers.createElement('span', 'message__time');

		time.innerText = Helpers.createDate();

		name.innerText = surName;
		icon.style.backgroundImage = `url(${logo})`;
		containerSender.append(icon, name);
		container.append(containerSender, time);
		return container;
	}

	createMessage({text, status, id, logo}) { //заменить на объект
		const container = Helpers.createElement('div', 'message-holder');
		const senderInfo = this.createSenderInfo(id, logo);

		const elem = Helpers.createElement('div', [`message--${status}`, 'message']);
		elem.innerText = text;
		const shouldShowName = status === 'friend' && this.messagesQueue[this.messagesQueue.length - 1].id !== id;
		if (shouldShowName) {
			container.prepend(senderInfo);
		}
		container.append(elem);
		return container;
	}


}