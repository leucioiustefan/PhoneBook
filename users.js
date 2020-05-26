class Users {
  constructor(name, number, email) {
    this.name = name;
    this.number = number;
    this.email = email;
  }
}

class User {
  constructor(user) {
    this.user = user;
  }

  validateUserInput(name, phone, email) {
    let isValid = false;
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
      alert('Fields cannot be empty!');
      return;
    } else if (!regexName.test(name)) {
      alert('Please provide a valid name!');
      resetName();
      return;
    } else if (!regexNumber.test(phone)) {
      alert('Please provide a valid phone number!');
      resetNumber();
      return;
    } else if (!regexEmail.test(email)) {
      alert('Please provide a valid email!');
      resetEmail();
      return;
    } else {
      isValid = true;
    }
    return isValid;
  }

  renderSingleUser() {
    const userData = document.createElement('tr');
    userData.insertAdjacentHTML(
      'beforeend',
      `
              <td>${this.user.name}</td>
              <td>${this.user.number}</td>
              <td>${this.user.email}</td>
              <td><a href="#" class="edit">Edit</a></td>
              <td><a href="#" class="delete">Delete</a></td>
      `
    );
    // const editBtn = userData.querySelector('.edit');
    const deleteBtn = userData.querySelector('.delete');
    deleteBtn.addEventListener('click', () => this.deleteUserHandler(userData));
    // editBtn.addEventListener('click', this.editUser.bind(this, userData));
    return userData;
  }

  deleteUserHandler(user) {
    tbodyUsersEl.removeChild(user);
  }

  // editUser(user) {
  //   user.innerHTML = '';
  // }
}

class UsersList {
  user = new Users(fullNameEl.value, phoneNumberEl.value, emailEl.value);

  render() {
    const userObject = new User(this.user);
    if (
      userObject.validateUserInput(
        this.user.name,
        this.user.number,
        this.user.email
      )
    ) {
      const userEl = userObject.renderSingleUser();
      tbodyUsersEl.append(userEl);
      users.push(this.user);
      resetForm();
    } else {
      return;
    }
  }
}

class CreateUser {
  static initializeUser() {
    const user = new UsersList();
    user.render();
  }
}
