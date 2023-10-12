document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic form validation
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      // Make an API call for login
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the response is OK
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in!');
      }

      // Log the entered username and password
      console.log('Username:', username);
      console.log('Password:', password);
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
