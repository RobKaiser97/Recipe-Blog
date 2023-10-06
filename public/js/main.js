const categoriesDropdown = document.getElementById('categoriesDropdown');
const profileDropdown = document.getElementById('profileDropdown');

document
  .querySelector('.group:nth-child(2)')
  .addEventListener('mouseenter', () => {
    categoriesDropdown.classList.remove('hidden');
  });

document
  .querySelector('.group:nth-child(2)')
  .addEventListener('mouseleave', () => {
    categoriesDropdown.classList.add('hidden');
  });

document
  .querySelector('.group:nth-child(3)')
  .addEventListener('mouseenter', () => {
    profileDropdown.classList.remove('hidden');
  });

document
  .querySelector('.group:nth-child(3)')
  .addEventListener('mouseleave', () => {
    profileDropdown.classList.add('hidden');
  });
