const router = require('express').Router();
const { Category, Recipe, Comment } = require('../../models');
const multer = require('multer');
const withAuth = require('../../utils/auth');

// Configure multer for recipe image uploads
const recipeImageStorage = multer.memoryStorage();
const recipeImageUpload = multer({
  storage: recipeImageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.', 400), false);
    }
  },
});

// The 'recipes' endpoint
router.get('/:id', async (req, res) => {
  try {
    console.log('recipe get req params: ', req.params.id); // TODO: Remove debug elements
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['category_id'],
        },
        {
          model: Comment,
        },
      ],
    });
    console.log('recipe get json data: ', recipeData.toJSON()); // TODO: Remove debug elements
    const recipe = recipeData.get({ plain: true });
    return res.render('recipe', { recipe });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  '/',

  recipeImageUpload.single('image'),
  async (req, res) => {
    try {
      console.log('request for recipe post: ', req.body, req.session.user_id); // TODO: Remove debug elements
      const recipeData = await Recipe.create({
        ...req.body,
        author_id: req.session.user_id,
        image: req.file ? req.file.buffer : null,
      });
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.put(
  '/:id',
  withAuth,
  recipeImageUpload.single('image'),
  async (req, res) => {
    try {
      console.log('request for recipe put: ', req.body, req.params.id); // TODO: Remove debug elements
      const recipeData = await Recipe.update(
        {
          ...req.body,
          image: req.file ? req.file.buffer : null,
        },
        {
          where: {
            recipe_id: req.params.id,
          },
        }
      );
      if (!recipeData) {
        res.status(404).json({ message: 'No recipe found with this id!' });
        return;
      }
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete('/:id', withAuth, async (req, res) => {
  try {
    console.log('request for recipe delete: ', req.params.id); // TODO: Remove debug elements
    const recipeData = await Recipe.destroy({
      where: {
        recipe_id: req.params.id,
      },
    });
    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
