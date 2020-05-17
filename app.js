const tbodyUsersEl = document.getElementById('users');
const submitBtnEl = document.getElementById('submit');
const fullNameEl = document.getElementById('name');
const phoneNumberEl = document.getElementById('number');
const emailEl = document.getElementById('email');
const formEl = document.querySelector('form');
const regexName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const regexEmail = /\S+@\S+\.\S+/;
const regexNumber = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
const users = [];

class Users {
  isValidUser = false;

  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }

  _renderUser() {
    tbodyUsersEl.insertAdjacentHTML(
      'beforeend',
      `
        <tr>
            <td>${this.name}</td>
            <td>${this.phone}</td>
            <td>${this.email}</td>
            <td><a href="#" class="edit">Edit</a></td>
            <td><a href="#" class="delete">Delete</a></td>
        </tr>
    `
    );
  }

  validate() {
    if (
      this.name.trim() === '' ||
      this.email.trim() === '' ||
      this.phone.trim() === ''
    ) {
      alert('Fields cannot be empty!');
      return;
    } else if (!regexName.test(this.name)) {
      alert('Please provide a valid name!');
      resetName();
      return;
    } else if (!regexNumber.test(this.phone)) {
      alert('Please provide a valid phone number!');
      resetNumber();
      return;
    } else if (!regexEmail.test(this.email)) {
      alert('Please provide a valid email!');
      resetEmail();
      return;
    } else {
      this.isValidUser = true;
    }
    return this.isValidUser;
  }

  delete() {
    const userEl = tbodyUsersEl.querySelectorAll('tr');
    for (let i = 0; i < userEl.length; i++) {
      const deleteBtn = userEl[i].querySelector('.delete');
      deleteBtn.addEventListener('click', () => {
        tbodyUsersEl.removeChild(userEl[i]);
      });
    }
  }
}

class User extends Users {
  isValidUser = false;

  constructor(name, phone, email) {
    super(name, phone, email);
  }

  checkForDuplicates(obj1, obj2) {
    if (
      obj1.name === obj2.name ||
      obj1.email === obj2.email ||
      obj1.phone === obj2.phone
    ) {
      return true;
    } else {
      return false;
    }
  }

  renderUserOnScreen() {
    if (this.validate()) {
      this._renderUser();
      return true;
    }
  }
}

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
  if (isDuplicate && users.length > 1) {
    alert('User already exists');
    const duplicatePerson = tbodyUsersEl.lastElementChild;
    tbodyUsersEl.removeChild(duplicatePerson);
    users.pop(user);
  }
  console.log(users);
};

submitBtnEl.addEventListener('click', userObjectHandler);
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
});
