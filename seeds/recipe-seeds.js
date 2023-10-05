const { Recipe } = require('../models');
const path = require('path');
const spaghettiBolognese = path.join(__dirname, '../public/assets/recipe-images/spaghetti-bolognese.jpeg')
const chickenAlfredo = path.join(__dirname, '../public/assets/recipe-images/Chicken-Alfredo.jpg')
const capreseSalad = path.join(__dirname, '../public/assets/recipe-images/Caprese-Salad.jpg')
const vegeStirFry = path.join(__dirname, '../public/assets/recipe-images/vegetable-stir-fry.jpg')
const chocoChipCookie = path.join(__dirname, '../public/assets/recipe-images/chocolate-chip-cookie.jpg')

const recipeData = [
  {
    title: 'Spaghetti Bolognese',
    description: 'Classic Italian pasta dish with a rich meat sauce.',
    ingredients:
      'Ground beef, onion, garlic, tomato sauce, spaghetti, salt, pepper, Parmesan cheese',
    instructions:
      '1. Heat oil in a large skillet. 2. Add chopped onion and garlic. 3. Brown ground beef.',
    author_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    image: spaghettiBolognese,
  },
  {
    title: 'Chicken Alfredo',
    description: 'Creamy pasta dish with grilled chicken and Alfredo sauce.',
    ingredients:
      'Chicken breast, fettuccine pasta, heavy cream, butter, Parmesan cheese, salt, pepper',
    instructions: '1. Grill chicken. 2. Cook pasta. 3. Heat cream and butter.',
    author_id: 2,
    category_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
    image: chickenAlfredo,
  },
  {
    title: 'Caprese Salad',
    description:
      'A refreshing Italian salad featuring tomatoes, mozzarella, and basil.',
    ingredients:
      'Tomatoes, fresh mozzarella cheese, fresh basil leaves, balsamic glaze, olive oil, salt, pepper',
    instructions:
      '1. Slice tomatoes and mozzarella. 2. Arrange on a plate with basil leaves. 3. Drizzle with balsamic glaze and olive oil.',
    author_id: 3,
    category_id: 3,
    created_at: new Date(),
    updated_at: new Date(),
    image: capreseSalad,
  },
  {
    title: 'Vegetable Stir-Fry',
    description:
      'A quick and healthy stir-fry with a variety of colorful vegetables.',
    ingredients:
      'Broccoli, bell peppers, carrots, snap peas, tofu, soy sauce, ginger, garlic, rice',
    instructions:
      '1. Heat oil in a wok. 2. Add tofu and stir-fry until golden. 3. Add vegetables, soy sauce, ginger, and garlic.',
    author_id: 4,
    category_id: 4,
    created_at: new Date(),
    updated_at: new Date(),
    image: vegeStirFry,
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade cookies with gooey chocolate chips.',
    ingredients:
      'Butter, sugar, brown sugar, eggs, flour, baking soda, salt, chocolate chips',
    instructions:
      '1. Cream butter and sugars. 2. Add eggs and beat. 3. Mix in dry ingredients and chocolate chips.',
    author_id: 5,
    category_id: 5,
    created_at: new Date(),
    updated_at: new Date(),
    image: chocoChipCookie,
  },
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;
