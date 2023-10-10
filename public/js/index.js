function addIngredient() {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const newIngredientRow = document.createElement('div');
    newIngredientRow.className = 'flex mb-2 block';
    newIngredientRow.innerHTML = `
      <input type="number" class="border rounded-lg w-1/6 p-2 mr-2 text-gray-700" placeholder="Qty">
    <select class="border rounded-lg w-1/4 p-2 mr-2 text-gray-700">
    <option value="g">g</option>
    <option value="kg">kg</option>
    <option value="ml">ml</option>
    <option value="l">l</option>
    <!-- Add more units as needed -->
    </select>
    <input type="text" class="border rounded-lg flex-grow p-2 mr-2 text-gray-700" placeholder="Ingredient Name">
    `;
    ingredientsContainer.appendChild(newIngredientRow);
};

document.querySelector(".plus-button").addEventListener("click",addIngredient);
