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