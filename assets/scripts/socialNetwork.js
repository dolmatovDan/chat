class SocialNetwork {
	constructor() {
		this.groups = document.getElementById('groups');
		this.addListeners();
		this.dialogues = {};
		//this.chat = new Chat({id: 0, messages: this.dialogues[0] || []});
	}

	addListeners() {
		this.groups.addEventListener('click', (e) => {
			const targetElem = e.target;
			const parent = targetElem.closest('.group');
			if(!parent) {
				return;
			}
			const dialogueId = parent.getAttribute('data-id');
			
			
			this.toggleChat(dialogueId);
		})
	}

	toggleChat(dialogueId) {
		if(this.chat){
				this.dialogues[this.chat.id] = [...this.chat.messagesQueue];
				this.chat.destroy();
				console.log(this.chat.id);
				console.log(this.chat.messagesQueue);
				console.log(this.dialogues);
			}
			
			this.chat = new Chat({id: dialogueId, messages: this.dialogues[dialogueId]});
		}	

}

new SocialNetwork();