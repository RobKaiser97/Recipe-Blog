const { CategoryRecipe } = require('../models');

const categoryRecipeData = [
  {
    recipe_id: 1,
    category_id: 1,
  },
  {
    recipe_id: 2,
    category_id: 2,
  },
  {
    recipe_id: 3,
    category_id: 3,
  },
  {
    recipe_id: 4,
    category_id: 4,
  },
  {
    recipe_id: 5,
    category_id: 5,
  },
  {
    recipe_id: 6,
    category_id: 6,
  },
  {
    recipe_id: 7,
    category_id: 7,
  },
  {
    recipe_id: 8,
    category_id: 8,
  },
];

const seedCategoryRecipe = () => CategoryRecipe.bulkCreate(categoryRecipeData);

module.exports = seedCategoryRecipe;
