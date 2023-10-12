document.addEventListener('DOMContentLoaded', function () {
  const logout = async () => {
    console.log('Logout Hit');
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out!');
    }
  };

  const logoutLink = document.querySelector('#logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', logout);
  }
});