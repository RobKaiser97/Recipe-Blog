const CategoryRecipe = require('./CategoryRecipe');
const User = require('./Users');
const Recipe = require('./Recipes');
const Category = require('./Category');
const Comment = require('./Comments');

User.hasMany(Recipe, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Recipe.belongsTo(User, {
  foreignKey: 'author_id',
});

Recipe.hasMany(Comment, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Recipe.belongsToMany(Category, {
  through: CategoryRecipe,
  foreignKey: 'recipe_id',
});

Category.belongsToMany(Recipe, {
  through: CategoryRecipe,
  foreignKey: 'category_id',
});

module.exports = { User, Comment, Recipe, Category, CategoryRecipe };
