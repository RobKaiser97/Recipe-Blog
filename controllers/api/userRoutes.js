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
    try {
      console.log('username:', req.body.username); // add this line to check the value of req.body.username
      if (!req.body.username) {
        throw new Error('Username field is required');
      }
      const userData = {
        ...req.body,
        username:
          typeof req.body.username === 'string' ? req.body.username : '',
        profile_picture: req.file ? req.file.buffer : null,
      };
      console.log('userData:', userData);
      const createdUser = await User.create(userData);
      console.log('createdUser:', createdUser);
      req.session.save(() => {
        (req.session.user_id = createdUser.id),
          (req.session.username = createdUser.username),
          (req.session.loggedIn = true);
        res.json(createdUser);
        console.log(createdUser);
      });
    } catch (error) {
      console.log('error:', error);
      res.status(500).json(error);
    }
  }
);

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log('userData', userData);
    if (!userData) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(404).json({ message: 'No user found' });
      return;
    }
    req.session.save(() => {
      (req.session.user_id = userData.id),
        (req.session.username = userData.username),
        (req.session.loggedIn = true);
      res.json(userData);

      // console.log('user_id', req.session.user_id);
      // console.log('username', req.session.username);
      // console.log('loggedIn', req.session.loggedIn);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
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
