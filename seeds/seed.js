const seedCategories = require('./category-seeds');
const seedCategoryRecipes = require('./categoryRecipe-seeds');
const seedComments = require('./comment-seeds');
const seedRecipes = require('./recipe-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n---- DATABASE SYNCED ----\n');

    await seedUsers();
    console.log('\n---- USERS SEEDED ----\n');

    await seedCategories();
    console.log('\n---- CATEGORIES SEEDED ----\n');

    await seedRecipes();
    console.log('\n---- RECIPES SEEDED ----\n');

    await seedComments();
    console.log('\n---- COMMENTS SEEDED ----\n');

    await seedCategoryRecipes();
    console.log('\n---- CATEGORY RECIPES SEEDED ----\n');

    process.exit(1);
  } catch (err) {
    console.error('Error seeding database: ', err);
    process.exit(0);
  }
};

seedAll();
