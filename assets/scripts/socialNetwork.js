class SocialNetwork {
    constructor() {
        this.groups = document.getElementById('groups');
        this.addListeners();
        this.dialogues = {};
        this.chat = new Chat({id: 0, messages: this.dialogues[0] || []});
    }

    addListeners() {
        this.groups.addEventListener('click', (e) => {
            const targetElem = e.target;
            const parent = targetElem.closest('.group');
            if (!parent) {
                return;
            }
            const dialogueId = parent.getAttribute('data-id');
            
            // CSS-магия активного диалога (лучше обработчики одного элемента держать вместе)
            const arrElem = document.querySelectorAll('.group');
            for (let i = 0; i < arrElem.length; i++) {
                arrElem[i].classList.remove('group--click');
            }
            if (parent) {
                parent.classList.add('group--click');
            }
            this.toggleChat(dialogueId);
        })
    }

    toggleChat(dialogueId) {
        if (this.chat.id) {
            this.dialogues[this.chat.id] = this.chat.messagesQueue || [];
            this.chat.destroy();
        }

        this.chat.init({id: dialogueId, messages: this.dialogues[dialogueId]});
    }

}

new SocialNetwork();
