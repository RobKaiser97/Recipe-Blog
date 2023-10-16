document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const about = formData.get('about');
    // FUTURE DEVELOPMENT
    // const password = formData.get('password');
    const profile_picture = formData.get('profileImage');
    console.log(username);
    console.log(profile_picture);

    const user_id = document
      .getElementById('edit-profile')
      .getAttribute('data-id');

    try {
      const response = await fetch(`/api/users/profile/${user_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to edit profile!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
