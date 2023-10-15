const signupHandler = async event => {
  event.preventDefault();
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const about = document.querySelector('#about').value.trim();
  const confirmPass = document.querySelector('#confirmPassword').value.trim();

  const usernameAlert = document.querySelector('#usernameAlert');
  const emailAlert = document.querySelector('#emailAlert');
  const passwordAlert = document.querySelector('#passwordAlert');
  const confirmPasswordAlert = document.querySelector('#confirmPasswordAlert');

  if (!username) {
    usernameAlert.textContent = 'Please enter a username';
    return;
  } else {
    usernameAlert.textContent = '';
  }

  if (!email) {
    emailAlert.textContent = 'Please enter an email';
    return;
  } else {
    emailAlert.textContent = '';
  }

  if (!password) {
    passwordAlert.textContent = 'Please enter a password';
    return;
  } else {
    passwordAlert.textContent = '';
  }

  if (password !== confirmPass) {
    confirmPasswordAlert.textContent = 'Passwords do not match';
    return;
  } else {
    confirmPasswordAlert.textContent = '';
  }

  const response = await fetch('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, about }),
    headers: { 'Content-Type': 'application/json' },
  });

  response.ok
    ? document.location.replace('/profile')
    : window.alert('Failed to Signup!');
};

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.signup_form')
    .addEventListener('submit', signupHandler);
});
