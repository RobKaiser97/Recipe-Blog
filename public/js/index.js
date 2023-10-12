function addIngredient() {
  const ingredientsContainer = document.getElementById('ingredientsContainer');
  const newIngredientRow = document.createElement('div');
  newIngredientRow.className = 'flex mb-2 block';
  newIngredientRow.innerHTML = `
      <input type="number" class="border rounded-lg w-1/6 p-2 mr-2 text-gray-700" placeholder="Qty">
    <select class="border rounded-lg w-1/4 p-2 mr-2 text-gray-700">
    <option value="g">gram(s)</option>
    <option value="kg">kilogram(s)</option>
    <option value="ml">milliliter(s)</option>
    <option value="l">liter(s)</option>
    <!-- Add more units as needed -->
    </select>
    <input type="text" class="border rounded-lg flex-grow p-2 mr-2 text-gray-700" placeholder="Ingredient Name">
    `;
  ingredientsContainer.appendChild(newIngredientRow);
}

const form = document.querySelector('form');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const dishName = document.getElementById('dishName').value.trim();
  const description = document.getElementById('description').value.trim();
  const ingredients = Array.from(
    document.querySelectorAll(
      '#ingredientsContainer input[type="number"], #ingredientsContainer select, #ingredientsContainer input[type="text"]'
    )
  ).map((element) => element.value);
  const tags = Array.from(
    document.querySelectorAll('#tags input[type="checkbox"]')
  )
    .filter((element) => element.checked)
    .map((element) => element.value);
  const image = document.getElementById('image').value;
  // Concatenate ingredients and tags
  const ingredientsString = ingredients.join(', ');
  const tagsString = tags.join(', ');
  try {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({
        dishName,
        description,
        ingredients: ingredientsString,
        tags: tagsString,
        image,
      }),
      headers: { 'Content-Type': 'application/json' },
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

document.querySelector('.plus-button').addEventListener('click', addIngredient);
