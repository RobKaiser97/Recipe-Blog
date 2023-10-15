var recipeImages = document.querySelectorAll('.cardImgIdentifier');

// Add a click event listener to each recipe image
recipeImages.forEach(function (recipeImage) {
  recipeImage.addEventListener('click', handleImageClick);
});

// Function to handle recipe image click
function handleImageClick(event) {
  // Get the recipe ID from the clicked image
  var clickedRecipeId = event.target.getAttribute('data-recipe-id');

  // Get the recipe card element that contains the clicked image
  var card = event.target.closest('.recipe-card');

  // Toggle the description for the clicked recipe card
  toggleDescription(card);

  // Construct the URL based on the recipe_id
  var url = '/api/recipes/' + clickedRecipeId; // Replace with your desired URL structure

  // Change the page location to the constructed URL
  window.location.href = url;
}

// Function to toggle the display of full description
function toggleDescription(card) {
  const description = card.querySelector('.recipe-description');
  const readMore = card.querySelector('.read-more');

  if (description.classList.contains('collapsed')) {
    description.classList.remove('collapsed');
  } else {
    description.classList.add('collapsed');
    readMore.innerText = 'Read More';
  }
}
// TODO: For some reason, if the toggleDescription is removed the images no longer are clickable. Not my highest priority, but it would be nice to figure out why this is happening.