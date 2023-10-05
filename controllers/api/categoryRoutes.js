const router = require('express').Router();
const { Category, Recipe } = require('../../models');

// The `/api/categories` endpoint
router.get('/:category', async (req, res) => {
  try {
    // Find category by name provided in the req params and return the associated recipes
    const categoryData = await Category.findOne({
      where: {
        category_name: req.params.category
      },
      include: [
        {
          model: Recipe,
          attributes: {
            // renders the recipe_id, title, description, author_id, created_at
            exclude: [
              'ingredients', // ingredients will need to be included if allergies are implemented
              'instructions',
              'category_id',
              'updated_at'
            ]
          }
        }
      ]
    });
    const category = categoryData.get({ plain: true });
    return res.render('category', { category });
  }
  catch (err) {
    res.status(500).json(err);
  }
});