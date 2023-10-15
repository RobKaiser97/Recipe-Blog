require('dotenv').config();
console.log("SECRET_KEY:", process.env.SECRET_KEY); // Debug: Assist in debugging routing errors
// IMPORTANT: Remove before deployment
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Buffer } = require('buffer');
const helpers = require('./utils/helper');
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET_KEY,
  cookie: {
    // Expires after one day
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    logging: false,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`
  ##################
  ### Route Call ###
  ##################
  `);
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
});


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database connected!"); // Debug: Check for DB connect on server start
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
