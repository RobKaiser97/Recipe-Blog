const router = require('express').Router();
const { Recipe } = require('../models'); // Adjust this path to your actual Recipe model

router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll();
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render('homepage', {
      recipes,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;