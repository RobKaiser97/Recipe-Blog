const router = require('express').Router();
const { User } = require('../../models');
const { upload, imageToBase64, binaryToBase64, validateSignupData } = require('../../utils/helper');
const defaultProfileImg = imageToBase64('public/assets/profile-images/default-profile.jpg');

const signupHandler = async (req, res) => {
  try {
    validateSignupData(req.body);
    const userData = {
      ...req.body,
      // Set to default image
      profile_picture: defaultProfileImg, 
    };
    const createdUser = await User.create(userData);
    // Use req.session.save() to make sure session is saved before redirecting
    req.session.save(() => {
      req.session.user_id = createdUser.user_id,
        req.session.username = createdUser.username,
        req.session.loggedIn = true,
        res.redirect('/profile');
    });
  } catch (error) {
    console.log('error:', error);
    res.status(400).json({ message: error.message });
  }
};
// Endpoint for user signup
router.post('/signup', signupHandler);

const loginHandler = async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
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
      req.session.user_id = userData.user_id,
        req.session.username = userData.username,
        req.session.loggedIn = true,
        res.json(userData);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
// Endpoint for user login
router.post('/login', loginHandler);

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } else {
    res.status(400).json({ message: 'No user to log out' });
  }
});

// Put route to update User model, used for updating profile picture, username, email, and password
router.put('/profile/:id', upload.single('profile_picture'), async (req, res) => {
  try {
    const updatedUserData = { ...req.body };
    // Only update the profile_picture if a new file is provided.
    if (req.file) {
      // Get the mime type of the file
      const mimeType = req.file.mimetype; 
      updatedUserData.profile_picture = binaryToBase64(req.file.buffer, mimeType);
    }
    const userData = await User.update(updatedUserData, {
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json(userData);
    return res.render('edit-profile', {
      recipe,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
