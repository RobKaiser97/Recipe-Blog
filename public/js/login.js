document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic form validation
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        // Log the entered username and password //Add authentication
        console.log('Username:', username);
        console.log('Password:', password);
    });
});
