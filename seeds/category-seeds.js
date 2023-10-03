const { Category } = require('../models');

const categoryData = [
  {
    category_id: 1,
    name: 'Vegetarian',
  },
  {
    category_id: 2,
    name: 'Vegan',
  },
  {
    category_id: 3,
    name: 'Gluten Free',
  },
  {
    category_id: 4,
    name: 'Keto',
  },
  {
    category_id: 5,
    name: 'Breakfast',
  },
  {
    category_id: 6,
    name: 'Lunch',
  },
  {
    category_id: 7,
    name: 'Dinner',
  },
  {
    category_id: 8,
    name: 'Desert',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
