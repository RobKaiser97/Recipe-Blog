const router = require('express').Router();
const { User } = require('../../models');
const multer = require('multer');

// Configure multer for profile image uploads
const profileImageStorage = multer.memoryStorage();
const profileImageUpload = multer({
  storage: profileImageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.', 400), false);
    }
  },
});

console.log('signup endpoint hit'); // add this line to check if the endpoint is hit
// Endpoint for user signup
router.post(
  '/signup',
  profileImageUpload.single('profile_picture'),
  async (req, res) => {
    console.log('Entering route: ', req.originalUrl);
    console.log('Request body:', req.body); // Debug
    try {
      console.log('username:', req.body.username); // add this line to check the value of req.body.username
      if (!req.body.username) {
        throw new Error('Username field is required');
      }
      const userData = {
        ...req.body,
        username: typeof req.body.username === 'string' ? req.body.username : '',
        profile_picture: req.file ? req.file.buffer : null,
      };
      console.log('userData:', userData);
      const createdUser = await User.create(userData);
      console.log('createdUser:', createdUser);

      // Use the createdUser directly to set session variables
      req.session.user_id = createdUser.user_id;
      req.session.username = createdUser.username;
      req.session.loggedIn = true;

      res.json(createdUser);
      console.log(createdUser);
    } catch (error) {
      console.log('error:', error);
      res.status(500).json(error);
    }
    console.log('Exiting route: ', req.originalUrl);
    console.log('Response:', res.statusCode); // Debug
  }
);


router.post('/login', async (req, res) => {
  console.log('Entering route: ', req.originalUrl);
  console.log('Request body:', req.body); // Debug
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // userData = { id: 1, username: 'mockUser' }; // Debug: Manually set userData for testing
    console.log('Is userData defined?', !!userData); // Debug: Check for userData
    if (!userData) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: 'No user found' });
      return;
    }

    // const user = userData.get({ plain: true });
    console.log("User Data ID:", userData.user_id);

    req.session.save(() => {
      req.session.user_id = userData.user_id,
        req.session.username = userData.username,
        req.session.loggedIn = true,
        res.json(userData);
    });
  } catch (error) {
    console.error('Login route errors: ', error); // Debug: Errors for login route
    res.status(500).json(error);
  }
  console.log('Exiting route: ', req.originalUrl);
  console.log('Response:', res.statusCode); // Debug
});

router.post('/logout', (req, res) => {
  console.log('Entering route: ', req.originalUrl);
  console.log('Request body:', req.body); // Debug
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  console.log('Exiting route: ', req.originalUrl);
  console.log('Response:', res.statusCode); // Debug
});

// Put route to update User model, used for updating profile picture, username, email, and password
router.put(
  '/profile/:id',
  profileImageUpload.single('profile_picture'),
  async (req, res) => {
    try {
      const updatedUserData = {
        ...req.body,
        profile_picture: req.file ? req.file.buffer : null,
      };
      const userData = await User.update(updatedUserData, {
        where: {
          user_id: req.params.id,
        },
      });
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
