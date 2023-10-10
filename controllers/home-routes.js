const router = require('express').Router();
const { Recipe, User, Comment } = require('../models'); // Adjust this path to your actual Recipe model
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
    const recipeData = recipes.map((recipe) => recipe.toJSON());

    res.render('homepage', {
      recipeData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/recipe/:id', async (req, res) => {
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
    console.log(recipe);
    res.render('recipe', {
      recipe,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/profile', async (req, res) => {
  try {
    console.log('Profile route');
    console.log('User ID loggedIn', req.session.loggedIn);
    console.log('User ID user_id', req.session.user_id);

    const userData = await User.findByPk(req.session.user_id, {
      include: [Recipe],
    });

    console.log("UserData", userData);

    if (!userData) {
      console.log("User data not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('profile', {
      user,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
