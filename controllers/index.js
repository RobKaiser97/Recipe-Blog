const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');

// Here you're defining the path for each set of routes
router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes); // All API routes will be prefixed with '/api'

// If no routes are hit, respond with a 404
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
