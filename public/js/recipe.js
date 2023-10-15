// DOM Elements
const submitButton = document.getElementById('submit-button');
const commentsList = document.querySelector('.existing-comments ul');

// Initial State
const userId = sessionStorage.getItem('userId');

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


// Event Listeners
submitButton.addEventListener('click', async () => {
  const comment = document.getElementById('comment-box').value;
  const recipeId = document
    .getElementById('image-container')
    .getAttribute('data-recipe-id');

  await submitCommentToServer(comment, recipeId);
});
