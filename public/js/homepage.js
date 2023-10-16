document.addEventListener('DOMContentLoaded', function () {
    var recipeImages = document.querySelectorAll('.cardImgIdentifier');

    // Add a click event listener to each recipe image
    recipeImages.forEach(function (recipeImage) {
        recipeImage.addEventListener('click', handleImageClick);
    });

    // Function to handle recipe image click
    function handleImageClick(event) {
        // Get the recipe ID from the clicked image
        var clickedRecipeId = event.target.getAttribute('data-recipe-id');

        // Construct the URL based on the recipe_id
        var url = '/api/recipes/' + clickedRecipeId; // Replace with your desired URL structure

        // Change the page location to the constructed URL
        window.location.href = url;
    }
});