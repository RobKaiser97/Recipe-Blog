// Function to update the comments section on the page
function updateComments(comments) {
    const commentsList = document.querySelector('.existing-comments ul');

    // Clear existing comments
    commentsList.innerHTML = '';

    if (comments.length > 0) {
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.textContent = comment;
            commentsList.appendChild(li);
        });
    } else {
        // Display a message if there are no comments
        const li = document.createElement('li');
        li.textContent = 'No comments yet.';
        commentsList.appendChild(li);
    }
}

// Assume you have a function to initialize the page with recipe data
function initPage(recipeId) {
    fetchRecipeData(recipeId)
        .then(recipeData => {
            // Assuming you have a function to render the recipe data using Handlebars
            renderRecipe(recipeData);

            // Attach event listener to the comment form
            const commentForm = document.querySelector('.comment-form');
            commentForm.addEventListener('submit', event => handleCommentSubmission(event, recipeId));
        })
        .catch(error => console.error('Error initializing page:', error));
}

// Call initPage with the recipe ID when the page is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     const recipeId = /* get the recipe ID from somewhere */
//         initPage(recipeId);
// });
