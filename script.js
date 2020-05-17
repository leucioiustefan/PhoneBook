const tbodyUsersEl = document.getElementById('users');
const submitBtnEl = document.getElementById('submit');
const fullNameEl = document.getElementById('name');
const phoneNumberEl = document.getElementById('number');
const emailEl = document.getElementById('email');
const formEl = document.querySelector('form');
const regexName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const regexEmail = /\S+@\S+\.\S+/;
const regexNumber = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
let users = [];

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

const userObjectHandler = () => {
  const user = new User(fullNameEl.value, phoneNumberEl.value, emailEl.value);
  const isDuplicate = users.some((singleUser) =>
    user.checkForDuplicates(singleUser, user)
  );
  if (user.renderUserOnScreen()) {
    users.push(user);
  }
  if (isDuplicate && users.length > 0) {
    alert('User already exists');
    const duplicatePerson = tbodyUsersEl.lastElementChild;
    tbodyUsersEl.removeChild(duplicatePerson);
    users.pop();
  }
  if (!isDuplicate) {
    user.deleteUser();
  }
  console.log(users);
};

submitBtnEl.addEventListener('click', userObjectHandler);
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
});
