const router = require('express').Router();
const { Category, Recipe, CategoryRecipe } = require('../models');

// The `/api/categories` endpoint
router.get('/:category', async (req, res) => {
  try {
    // Find category by name provided in the req params and return the associated recipes
    const categoryData = await Category.findOne({
      where: {
        name: req.params.category,
      },
      include: [
        {
          model: Recipe,
          through: {
            model: CategoryRecipe,
          },
          attributes: {
            exclude: ['ingredients', 'instructions', 'updated_at'],
          },
        },
      ],
    });
    const category = categoryData.get({ plain: true });
    return res.render('categories', { category });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
