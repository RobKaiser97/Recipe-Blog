const router = require('express').Router();
const { Recipe, User, Comment, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log('\x1b[36m%s\x1b[0m', req.session);
  console.log('\x1b[36m%s\x1b[0m', '====================================');
  console.log('\x1b[36m%s\x1b[0m', '|| Body of /profile route request ||');
  console.log('\x1b[36m%s\x1b[0m', '====================================');
  console.log('\x1b[36m%s\x1b[0m', JSON.stringify(req.body));
  try {
    const userData = await User.findByPk(req.session.user_id, {
      logging: console.log,
      include: [
        {
          model: Recipe,
          attributes: ['recipe_id', 'title', 'created_at', 'description'],
        },
        {
          model: Comment,
          attributes: ['comment_id', 'content', 'created_at'],
          include: [
            {
              model: Recipe,
              attributes: ['title', 'author_id', 'recipe_id'],
            },
          ],
        },
      ],
    });

    // Check if userData exists
    if (userData) {
      // Convert userData to plain object
      const users = userData.get({ plain: true });

      // Initialize categories
      const categories = await Category.findAll();
      const category = categories.map((category) => category.get({ plain: true }));

      // Render profile even if the user has no recipes or comments
      return res.render('profile', {
        users,
        category,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id,
      });
    } else {
      return res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/recipes/edit/:id', withAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.render('edit-recipe', {
      recipe,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/recipes/edit/:id', withAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await recipe.update(req.body);

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
