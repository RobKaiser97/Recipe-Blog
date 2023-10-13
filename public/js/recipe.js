var submitButton = document.getElementById('submit-button');
var comment;

if (sessionStorage.getItem('userId')) {
    // User is logged in
    console.log('Logged in')
} else {
    // User is not logged in
    console.log('Logged Out')
}

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
submitButton.addEventListener("click", function () {


    // This function will be executed when the button is clicked
    event.preventDefault();
    var comment = document.getElementById('comment-box').value;
    var recipeId = document.getElementById("image-container").getAttribute("data-recipe-id");

    console.log("Button clicked!");

    console.log(comment);
    console.log(JSON.stringify({
        content: comment,
        recipe_id: recipeId
    }));



    const submitCommentToServer = (comment) =>
        console.log(comment);
    fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: comment,
            recipe_id: recipeId
        }),
    })

    submitCommentToServer(comment);
    // You can add your custom logic here
    // For example, call a function or perform other actions

});


//function submitComment() {    
//    console.log('HELLO');
//    preventDefault();

// Get the comment from the textarea
//var comment = document.getElementById("comment").value;

// You can now use the 'comment' variable to do whatever you need
//console.log('Comment:', comment);

// Assuming you have a function to submit the comment
//submitCommentToServer(comment);
//}


