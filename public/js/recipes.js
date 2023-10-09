// recipes.js

document.addEventListener('DOMContentLoaded', async () => {
    const recipeId = window.location.pathname.split('/').pop();
    const recipeContainer = document.querySelector('.container');

    try {
        const response = await fetch(`/api/recipe/${recipeId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipe data');
        }

        const recipeData = await response.json();
        const recipeTemplate = document.getElementById('recipe-template').innerHTML;
        const compiledTemplate = Handlebars.compile(recipeTemplate);
        const html = compiledTemplate({ recipeData });

        recipeContainer.innerHTML = html;
    } catch (error) {
        console.error('Error fetching recipe data:', error);
    }
});

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

// Add event listeners to toggle description
document.querySelectorAll('.recipe-card').forEach(card => {
    const description = card.querySelector('.recipe-description');
    const readMore = card.querySelector('.read-more');

    if (description.clientHeight < description.scrollHeight) {
        description.classList.add('collapsed');
        readMore.style.display = 'block';

        readMore.addEventListener('click', () => {
            toggleDescription(card);
        });
    }
});
