// Async function to handle user login
const signupHandler = async (event) => {
    event.preventDefault();

    // Grab username and password
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const about = document.querySelector("#about").value.trim();
    const confirmPass = document.querySelector("#confirmPassword").value.trim();

    // Check for empty fields
    if (!username) {
        alert("Please enter a username");
        return;
    }

    if (!email || !password) {
        alert("Please enter an email or password");
        return;
    }

    if (password !== confirmPass) {
        alert("Passwords do not match");
        return;
    }

    // Make an API call for login
    const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ email, username, password, about }),
        headers: { "Content-Type": "application/json" },
    });

    // Redirect to homepage if login is successful
    response.ok ? document.location.replace("/") : alert("Failed to Signup!");
};

// Add event listener for login form submission
document.querySelector('.signup_form').addEventListener('submit', signupHandler);
