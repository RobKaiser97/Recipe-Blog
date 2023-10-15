document.addEventListener('DOMContentLoaded', function () {
  const logout = async () => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json(); // Parse JSON response

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(`Failed to log out! Reason: ${data.message}`);
    }
  };

  const logoutLink = document.querySelector('#logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', logout);
  }
});