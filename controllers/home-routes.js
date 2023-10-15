const router = require('express').Router();
const { Recipe, User, Comment, Category } = require('../models'); // Adjust this path to your actual Recipe model

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [User],
    });
    const recipeData = recipes.map(recipe => recipe.toJSON());

    const categoriesFind = await Category.findAll();
    const categories = categoriesFind.map(category => category.toJSON());

    res.render('homepage', {
      recipeData,
      categories,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

router.get('/recipes/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_text', 'date_created'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    const recipe = recipeData.get({ plain: true });
    res.render('recipe', {
      recipe,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup', { currentRoute: '/signup' });
});

module.exports = router;
