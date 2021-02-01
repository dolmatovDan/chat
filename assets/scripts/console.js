const consoleElement = document.getElementById('console');
const input = document.getElementById('input');
const commandsPlace = document.getElementById('commands-place');
const buttonClose = document.getElementById('button-close');
const buttonOpen = document.getElementById('button-open');

input.addEventListener('keydown', (e) => {

    if (e.key == 'Enter' && input.value.trim()) {
        const value = input.value;
        const historyElement = Helpers.createElement('p', 'console__text');
        historyElement.innerText = value;
        const br = document.createElement('br');
        commandsPlace.append(historyElement, br);

        input.value = '';
    }
})

consoleElement.addEventListener('click', () => {
    input.focus();
})

buttonClose.addEventListener('click', () => {
    consoleElement.classList.add('console--minV');
    buttonClose.classList.toggle('button--hidden');
    buttonOpen.classList.toggle('button--hidden');
    consoleElement.classList.remove('console-return-scale');
})

buttonOpen.addEventListener('click', () => {
    consoleElement.classList.remove('console--minV');
    consoleElement.classList.toggle('console-return-scale');
    buttonClose.classList.toggle('button--hidden');
    buttonOpen.classList.toggle('button--hidden');
})