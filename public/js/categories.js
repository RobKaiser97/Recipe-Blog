// recipes.js

// const fetchCategoryData = async (categoryName) => {
//     try {
//         // Construct the API endpoint URL on the client side
//         const apiUrl = `/categories/${categoryName}`;

//         // Make a GET request to the server
//         const response = await fetch(apiUrl);

//         // Check if the request was successful (status code 200)
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         // Parse the response as JSON
//         const data = await response.json();

//         // Handle the data (replace this with your own logic)
//         console.log('Data from the server:', data);

//         // Display the data in the result container (replace this with your own logic)
//         document.getElementById('result-container').innerHTML = JSON.stringify(data, null, 2);

//     } catch (error) {
//         // Handle any errors that occurred during the fetch
//         console.error('Fetch error:', error);
//     }
// };

// // Example: Replace 'yourCategoryName' with the actual category name you want to fetch
// const categoryName = 'lunch';

// // Call the function to fetch category data on the client side
// fetchCategoryData(categoryName);


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
