const router = require('express').Router();
const { Category, Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// The 'recipes' endpoint
router.get('/recipe/:id', async (req, res) => {
    try {
        console.log("recipe get req params: ", req.params.id); // TODO: Remove debug elements
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    attributes: ['category_name']
                }
            ]
        });
        console.log("recipe get json data: ", recipeData.toJSON()); // TODO: Remove debug elements
        const recipe = recipeData.get({ plain: true });
        return res.render('recipe', { recipe });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/recipe', withAuth, async (req, res) => {
    try {
        console.log("request for recipe post: ", req.body, req.session.user_id); // TODO: Remove debug elements
        const recipeData = await Recipe.create({
            ...req.body,
            author_id: req.session.user_id,
        });
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/recipe/:id', withAuth, async (req, res) => {
    try {
        console.log("request for recipe put: ", req.body, req.params.id); // TODO: Remove debug elements
        console.log("recipe data: ", recipeData.toJSON()); // TODO: Remove debug elements
        const recipeData = await Recipe.update(req.body, {
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

router.delete('/recipe/:id', withAuth, async (req, res) => {
    try {
        console.log("request for recipe delete: ", req.params.id); // TODO: Remove debug elements
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