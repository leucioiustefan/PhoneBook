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
