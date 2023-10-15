// DOM Elements
const submitButton = document.getElementById('submit-button');
const commentsList = document.querySelector('.existing-comments ul');

// Initial State
const userId = sessionStorage.getItem('userId');
console.log(userId ? 'Logged in' : 'Logged Out');

// Functions
function updateComments(comments) {
  commentsList.innerHTML = '';

  if (!comments.length) {
    commentsList.innerHTML = '<li>No comments yet.</li>';
    return;
  }

  comments.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}

async function submitCommentToServer(comment, recipeId) {
  console.log(comment);
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: comment,
      recipe_id: recipeId,
    }),
  });
  return response.json();
}

// Commented-out function
/*
function submitComment() {
    console.log('HELLO');
    // preventDefault(); // Should be event.preventDefault() if you're using it in an event listener

    // Get the comment from the textarea
    const comment = document.getElementById("comment").value;

    console.log('Comment:', comment);

    // Assuming you have a function to submit the comment
    // submitCommentToServer(comment);
}
*/

// Event Listeners
submitButton.addEventListener('click', async () => {
  const comment = document.getElementById('comment-box').value;
  const recipeId = document
    .getElementById('image-container')
    .getAttribute('data-recipe-id');

  console.log('Button clicked!');
  console.log(JSON.stringify({ content: comment, recipe_id: recipeId }));

  await submitCommentToServer(comment, recipeId);
  // Update comments or perform other actions
});
