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
};

const form = document.querySelector('form');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const dishName = document.getElementById('dishName').value.trim();
  const description = document.getElementById('description').value.trim();
  const ingredients = document.getElementById('ingredientsContainer').value;
  const tags = document.getElementById('tags').value;
  const image = document.getElementById('image').value;

  try {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({ dishName, description, ingredients, tags, image }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to post recipe!');
    }

    console.log('dishName:', dishName);
    console.log('description:', description);
    console.log('tags:', tags);
    console.log('ingredients:', ingredients);
    console.log('image:', image);
  } catch (error) {
    console.error('Error:', error);
  }
});

document.querySelector(".plus-button").addEventListener("click",addIngredient);
