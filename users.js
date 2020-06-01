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
    const editBtn = userData.querySelector('.edit');
    const deleteBtn = userData.querySelector('.delete');
    deleteBtn.addEventListener('click', () => this.deleteUserHandler(userData));
    editBtn.addEventListener('click', () => this.editUser(userData));
    return userData;
  }

  deleteUserHandler(user) {
    const confirmation = confirm('Are you sure you want to delete?');
    if (confirmation) {
      tbodyUsersEl.removeChild(user);
    } else {
      return;
    }
  }

  confirmEditHandler(user) {
    const confirmation = confirm('Do you want to edit user?');
    if (confirmation) {
      const highlightedData = user.querySelectorAll('td');
      for (let i = 0; i < highlightedData.length - 2; i++) {
        highlightedData[i].classList.toggle('highlighted');
      }
      highlightedData[0].innerHTML = `${fullNameEl.value}`;
      highlightedData[1].innerHTML = `${phoneNumberEl.value}`;
      highlightedData[2].innerHTML = `${emailEl.value}`;

      backdropEl.classList.toggle('backdrop-visible');
      confirmBtnEl.classList.toggle('confirm-visible');
      submitBtnEl.classList.toggle('submit-notVisible');
      resetForm();
    } else {
      return;
    }
  }

  editUser(user) {
    const highlightedData = user.querySelectorAll('td');
    for (let i = 0; i < highlightedData.length - 2; i++) {
      highlightedData[i].style.position = 'relative';
      highlightedData[i].classList.toggle('highlighted');
    }
    fullNameEl.value = this.user.name;
    phoneNumberEl.value = this.user.number;
    emailEl.value = this.user.email;
    backdropEl.classList.toggle('backdrop-visible');
    confirmBtnEl.classList.toggle('confirm-visible');
    submitBtnEl.classList.toggle('submit-notVisible');
    confirmBtnEl.addEventListener('click', () => {
      if (
        this.validateUserInput(
          fullNameEl.value,
          phoneNumberEl.value,
          emailEl.value
        )
      ) {
        this.confirmEditHandler(user);
      } else {
        return;
      }
    });
  }
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
