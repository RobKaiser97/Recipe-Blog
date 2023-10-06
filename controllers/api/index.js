const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const commentRoutes = require('./commentRoutes');
const categoryRoutes = require('./categoryRoutes');
// Add other API routes here as needed

// Here you're defining the path for each set of API routes
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);
// Add other route usages here as needed

module.exports = router;
