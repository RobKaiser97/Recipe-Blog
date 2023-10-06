const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const categoryRoutes = require('./api/categoryRoutes.js');
const recipeRoutes = require('./api/recipeRoutes.js');
const userRoutes = require('./api/userRoutes.js');

// Define routes for each URL
router.use('/', homeRoutes); // http://www.sample.com/
router.use('/:category', categoryRoutes); // http://www.sample.com/:category
router.use('/:category/recipe/:id', recipeRoutes); // http://www.sample.com/:category/recipe/:id
router.use('/', userRoutes); // This will include /login, /signup, and /profile/:user_id

// Use the API routes for all requests to /api
router.use('/api', require('./api'));

// If no routes are hit, respond with a 404
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
