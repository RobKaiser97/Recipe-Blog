const router = require('express').Router();
const { Recipe, User, Comment, Category } = require('../models'); // Adjust this path to your actual Recipe model
// Debug: Begin debugging of session variables
// Test route to set a session variable
// router.get('/set', (req, res) => {
//   req.session.testVar = 'Hello, world!';
//   res.send('Session variable set.');
// });

// Test route to get a session variable
// router.get('/get', (req, res) => {
//   res.send(`Session variable: ${req.session.testVar}`);
// });
// * End Debug Statements *
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
