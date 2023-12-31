const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const profileRoutes = require('./profile-routes.js');
const apiRoutes = require('./api');
const categoryRoutes = require('./categoryRoutes');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);
router.use('/categories', categoryRoutes);

router.use((req, res) => {
  res.send('<h1>Wrong Route!</h1>');
});

module.exports = router;
