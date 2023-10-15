const withAuth = (req, res, next) => {
  console.log('withAuth middleware called');
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.render('login');
  } else {
    // If the user is logged in, allow them to view the paintings
    next();
  }
};

module.exports = withAuth;
