const router = require('express').Router();
const { Recipe, User, Comment } = require('../models'); // Adjust this path to your actual Recipe model

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [User],
    });
    const recipeData = recipes.map((recipe) => recipe.toJSON());

    res.render("homepage", {
      recipeData,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "date_created"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    const recipe = recipeData.get({ plain: true });
    console.log(recipe);
    res.render("recipe", {
      recipe,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [Recipe],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      user,
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
  res.render('signup');
});

module.exports = router;