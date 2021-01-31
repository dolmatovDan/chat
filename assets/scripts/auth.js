const btnAuth = document.getElementById('btn-auth');
const modal = document.getElementById('modal');
const userPassword = document.getElementById('password');
const userLogin = document.getElementById('login');
const userButton = document.getElementById('user');
const adminButton = document.getElementById('admin');

const accounts = {
    'Terry': {
        password: 'Terry1234',
        role: 'user'
    },
    'Robert': {
        password: 'Robert1234',
        role: 'admin'
    }
}

btnAuth.addEventListener('click', () => {
    const role = userButton.checked ? userButton.id : adminButton.id;
    const login = userLogin.value;
    const password = userPassword.value;
    const userExists = login in accounts;
    const dataExists = accounts[login]?.password == password;
    const roleExists = accounts[login]?.role == role;
    if (userExists && dataExists && roleExists) {
        modal.classList.add('modal--hidden');
    }
});