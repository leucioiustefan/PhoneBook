const submitBtnEl = document.getElementById('submit');
const fullNameEl = document.getElementById('name');
const phoneNumberEl = document.getElementById('number');
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

const addAndValidateUser = (userObj) => {
  if (userObj.name.trim() === '' || userObj.email.trim() === '') {
    alert('Please provide all the informations');
    resetForm();
    return;
  } else if (!regexName.test(userObj.name)) {
    alert('Please write a valid name');
    userObj.name = '';
    return;
  } else if (!regexNumber.test(userObj.phoneNo)) {
    alert('Not a valid number');
    userObj.phoneNo = '';
    return;
  } else if (!regexEmail.test(userObj.email)) {
    alert('That is not a valid email');
    userObj.email = '';
    return;
  } else {
    tbodyUsersEl.insertAdjacentHTML(
      'beforeend',
      `
        <tr>
            <td>${userObj.name}</td>
            <td>${userObj.phoneNo}</td>
            <td>${userObj.email}</td>
            
        </tr>
    `
    );
  }
};

const checkForDuplicates = (obj1, obj2) => {
  if (obj1.phoneNo === obj2.phoneNo || obj1.email === obj2.email) {
    return true;
  } else {
    return false;
  }
};

const userObjectHandler = () => {
  const user = {
    name: fullNameEl.value,
    phoneNo: phoneNumberEl.value,
    email: emailEl.value,
  };
  const isDuplicate = users.some((singleUser) =>
    checkForDuplicates(singleUser, user)
  );
  if (isDuplicate) {
    alert('Person already exists!');
    resetForm();
    return;
  } else {
    addAndValidateUser(user);
    users.push(user);
  }
  resetForm();
};

submitBtnEl.addEventListener('click', userObjectHandler);
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
});
