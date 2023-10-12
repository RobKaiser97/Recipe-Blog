var recipeImage = document.getElementById("recipe-card-image");
var clickedRecipeId = document.getElementById("recipe-card-image").getAttribute("data-recipe-id");

// Function to toggle the display of full description

function toggleDescription(card) {
    const description = card.querySelector('.recipe-description');
    const readMore = card.querySelector('.read-more');

    if (description.classList.contains('collapsed')) {
        description.classList.remove('collapsed');
        readMore.innerText = 'Read Less';
    } else {
        description.classList.add('collapsed');
        readMore.innerText = 'Read More...';
    }
}

recipeImage.addEventListener("click", handleImageClick);

function handleImageClick() {

    // Get the recipe_id from the data object using Handlebars syntax
    var recipeId = this; // Replace with the correct Handlebars syntax
    console.log("Clicked on recipe with ID:", clickedRecipeId);
    console.log(recipeId);

    // Construct the URL based on the recipe_id
    var url = "/api/recipes/" + clickedRecipeId; // Replace with your desired URL structure

    // Change the page location to the constructed URL
    window.location.href = url;
}



