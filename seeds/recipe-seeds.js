const { Recipe } = require('../models');
const fs = require('fs');
const { imageToBase64 } = require('../utils/helper');
const spaghettiBolognese =
  'public/assets/recipe-images/spaghetti-bolognese.jpeg';
const chickenAlfredo = 'public/assets/recipe-images/Chicken-Alfredo.jpg';
const capreseSalad = 'public/assets/recipe-images/Caprese-Salad.jpg';
const vegeStirFry = 'public/assets/recipe-images/vegetable-stir-fry.jpg';
const chocoChipCookie = 'public/assets/recipe-images/chocolate-chip-cookie.jpg';
const waffle = 'public/assets/recipe-images/Belgian-Waffles.jpg';

const recipeData = [
  {
    title: 'Spaghetti Bolognese',
    description:
      'A beloved Italian classic featuring al dente spaghetti smothered in a robust meat sauce, exuding rich and savory flavors.',
    ingredients:
      '1 lb Ground beef, 1 Onion, 2 cloves Garlic, 1 can Tomato sauce, 8 oz Spaghetti, Salt, Pepper, Parmesan cheese',
    instructions:
      '1. Heat 1 tbsp oil in skillet. 2. Sauté chopped onion and minced garlic. 3. Add ground beef and brown. 4. Pour in tomato sauce, let it simmer. 5. Cook spaghetti. 6. Serve topped with Parmesan cheese.',
    author_id: 1,
    category_id: 7,
    created_at: new Date(),
    updated_at: new Date(),
    image: imageToBase64(spaghettiBolognese),
  },
  {
    title: 'Chicken Alfredo',
    description:
      'Experience indulgence with this creamy pasta dish. Succulent grilled chicken is generously coated in a velvety Alfredo sauce, resulting in a harmonious blend of textures and tastes.',
    ingredients:
      '2 Chicken breasts, 8 oz Fettuccine pasta, 1 cup Heavy cream, 4 tbsp Butter, 1 cup Parmesan cheese, Salt, Pepper',
    instructions:
      '1. Grill chicken until cooked. 2. Cook pasta. 3. Heat cream and butter, add Parmesan. 4. Combine with pasta. 5. Top with sliced chicken.',
    author_id: 2,
    category_id: 7,
    created_at: new Date(),
    updated_at: new Date(),
    image: imageToBase64(chickenAlfredo),
  },
  {
    title: 'Caprese Salad',
    description:
      'A burst of freshness awaits with this salad, bringing together vibrant tomatoes, creamy mozzarella, and aromatic basil. Drizzled with balsamic glaze and olive oil, it is a symphony of simple yet exquisite flavors.',
    ingredients:
      '4 Tomatoes, 8 oz Fresh mozzarella cheese, Fresh basil leaves, Balsamic glaze, Olive oil, Salt, Pepper',
    instructions:
      '1. Slice tomatoes and mozzarella. 2. Arrange on a plate with basil leaves. 3. Drizzle with balsamic glaze and olive oil.',
    author_id: 3,
    category_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
    image: imageToBase64(capreseSalad),
  },
  {
    title: 'Vegetable Stir-Fry',
    description:
      'Quick, vibrant, and nutritious. This colorful stir-fry combines crisp broccoli, sweet bell peppers, tender carrots, and snap peas with tofu, all tossed in a delectable blend of soy sauce, ginger, and garlic. Served over fluffy rice, it is a delight for both the eyes and the palate.',
    ingredients:
      '1 cup Broccoli florets, 1 Red bell pepper, 1 Carrot, 1 cup Snap peas, 8 oz Tofu, 2 tbsp Soy sauce, 1 tsp Ginger (minced), 2 cloves Garlic (minced), Cooked rice',
    instructions:
      '1. Heat 2 tbsp oil. 2. Add cubed tofu, stir-fry. 3. Add chopped veggies, soy sauce, ginger, and garlic. 4. Serve over cooked rice.',
    author_id: 4,
    category_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
    image: imageToBase64(vegeStirFry),
  },
  {
    title: 'Chocolate Chip Cookies',
    description:
      'Dive into the world of timeless treats. These classic cookies boast a perfect marriage of buttery richness and the decadence of gooey chocolate chips, offering a taste of pure comfort in every bite.',
    ingredients:
      '1 cup Butter, 1 cup Sugar, 1 cup Brown sugar, 2 Eggs, 3 cups Flour, 1 tsp Baking soda, 1/2 tsp Salt, 2 cups Chocolate chips',
    instructions:
      '1. Cream butter, sugar, and brown sugar. 2. Add eggs and beat. 3. Mix in flour, baking soda, and salt. 4. Stir in chocolate chips. 5. Drop spoonfuls onto baking sheet. 6. Bake at 350°F for 10-12 minutes.',
    author_id: 5,
    category_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
    image: imageToBase64(chocoChipCookie),
  },
  {
    title: 'Waffles',
    description:
      'Elevate your breakfast game with these delectable waffles. Crispy on the outside, fluffy on the inside, and ready to be adorned with your favorite toppings, they promise a morning indulgence like no other.',
    ingredients:
      '1 cup Flour, 2 tbsp Sugar, 1 tbsp Baking powder, 1/2 tsp Salt, 1 cup Milk, 2 Eggs, 1/4 cup Butter (melted)',
    instructions:
      '1. Preheat Waffle Iron, 2. Combine Dry Ingredients, 3. Mix Wet Ingredients, 4. Combine Wet and Dry Ingredients, 5. Cook the Waffles',
    author_id: 5,
    category_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
    image: imageToBase64(waffle),
  },
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;
