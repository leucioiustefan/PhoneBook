const tbodyUsersEl = document.getElementById('users');
const submitBtnEl = document.getElementById('submit');
const confirmBtnEl = document.getElementById('confirm');
const fullNameEl = document.getElementById('name');
const phoneNumberEl = document.getElementById('number');
const backdropEl = document.querySelector('.backdrop');
const emailEl = document.getElementById('email');
const formEl = document.querySelector('form');
const regexName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const regexEmail = /\S+@\S+\.\S+/;
const regexNumber = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
const users = [];

const resetForm = () => {
  fullNameEl.value = '';
  phoneNumberEl.value = '';
  emailEl.value = '';
};

const resetName = () => {
  fullNameEl.value = '';
};

const resetNumber = () => {
  phoneNumberEl.value = '';
};

const resetEmail = () => {
  emailEl.value = '';
};

submitBtnEl.addEventListener('click', () => {
  CreateUser.initializeUser();
});
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
});
