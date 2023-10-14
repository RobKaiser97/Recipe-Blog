const router = require('express').Router();
const { Recipe, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log('session:', req.session);
  console.log('user_id:', req.session.user_id);
  console.log('username:', req.session.username);
  console.log('loggedIn:', req.session.loggedIn);
  try {
    const userData = await User.findByPk(req.session.user_id, {
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
              attributes: ['title', 'author_id'],
            },
          ],
          where: {
            user_id: req.session.user_id,
          },
        },
      ],
    });
    console.log('userData', userData);
    if (!userData) {
      return res.status(404).send('User not found');
    }
    const users = userData.get({ plain: true });
    console.log('users', users);
    res.render('profile', {
      users,
      loggedIn: req.session.loggedIn,
    });
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
