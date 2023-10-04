const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    recipe_id: 1, // Corresponds to 'Spaghetti Bolognese'
    content: 'This was delicious!',
    created_at: new Date(),
  },
  {
    user_id: 2,
    recipe_id: 2, // Corresponds to 'Chicken Alfredo'
    content: 'I loved the creamy sauce!',
    created_at: new Date(),
  },
  {
    user_id: 3,
    recipe_id: 3, // Corresponds to 'Caprese Salad'
    content: 'So refreshing and tasty!',
    created_at: new Date(),
  },
  {
    user_id: 4,
    recipe_id: 4, // Corresponds to 'Vegetable Stir-Fry'
    content: 'Great way to get your veggies in!',
    created_at: new Date(),
  },
  {
    user_id: 5,
    recipe_id: 5, // Corresponds to 'Chocolate Chip Cookies'
    content: 'These cookies are amazing!',
    created_at: new Date(),
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
