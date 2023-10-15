document.addEventListener('DOMContentLoaded', function () {
  function addIngredient() {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const newIngredientRow = document.createElement('div');
    newIngredientRow.className = 'ingredient-row';
    newIngredientRow.innerHTML = `
      <input type="number" class="border rounded-lg w-1/6 p-2 mr-2 text-gray-700" placeholder="Qty">
      <select class="border rounded-lg w-1/4 p-2 mr-2 text-gray-700">
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
      <input type="text" class="border rounded-lg flex-grow p-2 mr-2 text-gray-700" placeholder="Ingredient Name">
    `;
    ingredientsContainer.appendChild(newIngredientRow);
  }

  const form = document.querySelector('#recipeForm');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    // Log FormData to debug
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    let emptyFields = [];
    let ingredientsArray = [];
    console.log('Form Data:', Array.from(formData.entries()));

    const title = formData.get('title');
    const description = formData.get('description');
    const instructions = formData.get('instructions');
    const category_id = formData.getAll('category_id');
    // Collect ingredient data dynamically
    document.querySelectorAll('#ingredientsContainer > div').forEach((ingredientRow) => {
      const qty = ingredientRow.querySelector('input[type="number"]').value;
      const unit = ingredientRow.querySelector('select').value;
      const name = ingredientRow.querySelector('input[type="text"]').value;

      // Concatenate quantity, unit, and name and add to the array
      const ingredientString = `${qty} ${unit} ${name}`;
      ingredientsArray.push(ingredientString);
    });

    // Log to debug empty fields
    if (!title) {
      console.log("Title is empty: ", title);
      emptyFields.push('Title');
    }
    if (!description) {
      console.log("Description is empty: ", description);
      emptyFields.push('Description');
    }
    if (!instructions) {
      console.log("Instructions is empty: ", instructions);
      emptyFields.push('Instructions');
    }
    if (!ingredientsArray.length) {
      console.log("Ingredients is empty: ", ingredientsArray);
      emptyFields.push('Ingredients');
    }
    console.log('ingredientsArray:', ingredientsArray);
    if (emptyFields.length) {
      alert(`You must fill out the following fields to submit a recipe: ${emptyFields.join(', ')}`);
      return;
    }

    // Add the ingredients data to the formData object
    formData.append('ingredients', ingredientsArray.join(', '));

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,  // Use FormData directly here
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
