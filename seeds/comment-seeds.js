const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    recipe_id: 1,
    content:
      'I made this last night for my family and they absolutely loved it! The meat sauce was incredibly flavorful. This recipe is definitely going into my regular rotation.',
    created_at: new Date(),
  },
  {
    user_id: 2,
    recipe_id: 2,
    content:
      'The Alfredo sauce was so rich and creamy! It paired perfectly with the grilled chicken. This dish is a new favorite in my household.',
    created_at: new Date(),
  },
  {
    user_id: 3,
    recipe_id: 3,
    content:
      'I adore the simplicity of this salad. The combination of fresh tomatoes, mozzarella, and basil is a classic for a reason. The balsamic glaze adds a lovely touch!',
    created_at: new Date(),
  },
  {
    user_id: 4,
    recipe_id: 4,
    content:
      'Great way to get your veggies in! Adding tofu was a nice protein boost, too!',
    created_at: new Date(),
  },
  {
    user_id: 5,
    recipe_id: 5,
    content:
      'These cookies are a hit in my house! The gooey chocolate chips are a game changer.',
    created_at: new Date(),
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
