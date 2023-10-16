document.addEventListener('DOMContentLoaded', function () {
  function addIngredient() {
    const ingredientsContainer = document.getElementById(
      'ingredientsContainer'
    );
    const newIngredientRow = document.createElement('div');
    newIngredientRow.className = 'ingredient-row mb-2';
    newIngredientRow.innerHTML = `
      <input type="number" class=" ingredient-input border rounded-lg w-1/6 p-2 mr-2 text-gray-700" placeholder="Qty">
      <select class=" ingredient-input border rounded-lg w-1/4 p-2 mr-2 text-gray-700">
        <option value="" disabled selected>unit</option>
        <option value="whole">whole</option>
        <option value="slice(s)">slice(s)</option>
        <option value='teaspoon(s)'>teaspoon(s)</option>
        <option value='tablespoon(s)'>tablespoon(s)</option>
        <option value='cup(s)'>cup(s)</option>
        <option value='pint(s)'>pint(s)</option>
        <option value='quart(s)'>quart(s)</option>
        <option value='gallon(s)'>gallon(s)</option>
        <option value='ounce(s)'>ounce(s)</option>
        <option value='fluid ounce(s)'>fluid ounce(s)</option>
        <option value='pound(s)'>pound(s)</option>
      </select>
      <input type="text" class="ingredient-input border rounded-lg flex-grow p-2 mr-2 text-gray-700 ing_name" placeholder="Ingredient Name">
    `;
    ingredientsContainer.appendChild(newIngredientRow);
  }

  const form = document.querySelector('#recipeForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    let emptyFields = [];
    let ingredientsArray = [];

    const title = formData.get('title');
    const description = formData.get('description');
    const instructions = formData.get('instructions');
    const category_id = formData.getAll('category_id');
    // Collect ingredient data dynamically
    document
      .querySelectorAll('#ingredientsContainer > div')
      .forEach(ingredientRow => {
        const qty = ingredientRow.querySelector('input[type="number"]').value;
        const unit = ingredientRow.querySelector('select').value;
        const name = ingredientRow.querySelector('input[type="text"]').value;

        // Concatenate quantity, unit, and name and add to the array
        const ingredientString = `${qty} ${unit} ${name}`;
        ingredientsArray.push(ingredientString);
      });

    // Log to debug empty fields
    if (!title) {
      emptyFields.push('Title');
    }
    if (!description) {
      emptyFields.push('Description');
    }
    if (!instructions) {
      emptyFields.push('Instructions');
    }
    if (!ingredientsArray.length) {
      emptyFields.push('Ingredients');
    }
    if (emptyFields.length) {
      alert(
        `You must fill out the following fields to submit a recipe: ${emptyFields.join(
          ', '
        )}`
      );
      return;
    }

    // Add the ingredients data to the formData object
    formData.append('ingredients', ingredientsArray.join(', '));

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData, // Use FormData directly here
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to post recipe!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  document
    .querySelector('.plus-button')
    .addEventListener('click', addIngredient);
});

async function deleteCommentFromServer(comment_id) {
  try {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deletedComment = await response.json();
    return deletedComment;
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    throw error; // Propagate the error to the caller if needed
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', async function (event) {
      try {
        event.preventDefault();

        // Get the comment_id from the data-comment-id attribute
        const comment_id =
          this.closest('.comment').getAttribute('data-comment-id');

        // Ask for confirmation
        const isConfirmed = confirm(
          'Are you sure you want to delete this comment?'
        );

        if (isConfirmed) {
          const deletedComment = await deleteCommentFromServer(comment_id);
          const commentElement = this.closest('.comment');
          commentElement.remove();
        }
      } catch (error) {
        console.error('Error deleting comment:', error.message);
      }
    });
  });
});
