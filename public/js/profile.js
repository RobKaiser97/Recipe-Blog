document.addEventListener('DOMContentLoaded', function () {
  const profileLink = document.getElementById('profileLink');

  if (profileLink) {
    profileLink.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.replace('/profile');
    });
  }
});
