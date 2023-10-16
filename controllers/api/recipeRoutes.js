const router = require('express').Router();
const {
  Category,
  Recipe,
  Comment,
  CategoryRecipe,
  User,
} = require('../../models');
const { upload, imageToBase64, binaryToBase64 } = require('../../utils/helper');
const path = require('path');

const defaultImageURL = imageToBase64(
  'public/assets/recipe-images/default_recipe_image.png'
);

// The 'recipes' endpoint
router.get('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Category,
          attributes: ['category_id', 'name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });
    const recipe = recipeData.get({ plain: true });
    return res.render('recipe', {
      recipe,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

const handleCategories = async (recipe_id, categoryIds) => {
  for (let id of categoryIds) {
    await CategoryRecipe.create({
      recipe_id,
      category_id: parseInt(id),
    });
  }
};

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Create the recipe
    const recipeData = await Recipe.create({
      ...req.body,
      author_id: req.session.user_id,
      // Set default image if there is no image selected
      image: req.file ? binaryToBase64(req.file.buffer) : defaultImageURL,
    });
    // Get the recipe_id of the newly created recipe
    const { recipe_id } = recipeData.get({ plain: true });
    // Loop through category_id array and insert into CategoryRecipe table
    await handleCategories(recipe_id, req.body.category_id);
    res.status(200).json(recipeData);
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(400).json(err);
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    // Initialize update data with request body
    const updateData = { ...req.body };

    // Only update image if a new file is uploaded
    if (req.file) {
      updateData.image = binaryToBase64(req.file.buffer);
    }

    const recipeData = await Recipe.update(updateData, {
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

router.delete('/:id', async (req, res) => {
  try {
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
