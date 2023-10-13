function addIngredient() {
  const ingredientsContainer = document.getElementById('ingredientsContainer');
  const newIngredientRow = document.createElement('div');
  newIngredientRow.className = 'flex mb-2 block';
  newIngredientRow.innerHTML = `
  <input type="number" class="border rounded-lg w-1/6 p-2 mr-2 text-gray-700" placeholder="Qty">
  <select class="border rounded-lg w-1/4 p-2 mr-2 text-gray-700">
  <option value="whole">whole</option>
  <option value="slice(s)">slice(s)</option>
  <option value="teaspoon(s)">teaspoon(s)</option>
  <option value="tablespoon(s)">tablespoon(s)</option>
  <option value="cup(s)">cup(s)</option>
  <option value="pint(s)">pint(s)</option>
  <option value="quart(s)">quart(s)</option>
  <option value="gallon(s)">gallon(s)</option>
  <option value="ounce(s)">ounce(s)</option>
  <option value="fluid ounce(s)">fluid ounce(s)</option>
  <option value="pound(s)">pound(s)</option>
    <!-- Add more units as needed -->
    </select>
    <input type="text" class="border rounded-lg flex-grow p-2 mr-2 text-gray-700" placeholder="Ingredient Name">
    `;
  ingredientsContainer.appendChild(newIngredientRow);
}

const form = document.querySelector('form');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const title = document.getElementById('dishName').value.trim();
  const description = document.getElementById('description').value.trim();
  const ingredients = Array.from(
    document.querySelectorAll(
      '#ingredientsContainer input[type="number"], #ingredientsContainer select, #ingredientsContainer input[type="text"]'
    )
  ).map((element) => element.value);

  // Initialize an empty array to store values
  let selectedValues = [];

  // Query all checked checkboxes with a certain name
  const checkedCheckboxes = document.querySelectorAll('input[name="category_id"]:checked');
  console.log(checkedCheckboxes);
  const array = Array.from(checkedCheckboxes);
  const category_id = array.map((element) => element.value);
  // Loop through NodeList and push each value into the array
  // checkedCheckboxes.forEach((checkbox) => {
  //   selectedValues.push(checkbox.value);
  // });

  // const category_id = selectedValues;  // Now category_id will contain the values of selected checkboxes
  console.log(category_id);
  const image = document.getElementById('image').value;

  // Concatenate ingredients and tags
  const ingredientsString = ingredients.join(', ');
  // const tagsString = category_id.join(', ');

  try {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        ingredients: ingredientsString,
        category_id,
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
