const { User } = require('../models');

const userData = [
  {
    username: 'CulinaryMaster123',
    password: 'password',
    email: 'culinaryMaster123@hotmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'SpiceExplorer22',
    password: 'password',
    email: 'SpiceExplorer22@gmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'TastyTreats4U',
    password: 'password',
    email: 'TastyTreats4U@yahoo.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'ChefInTraining7',
    password: 'password',
    email: 'ChefInTraining7@gmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'FlavorFanatic99',
    password: 'password',
    email: 'FlavorFanatic99@hotmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'KitchenWhiz123',
    password: 'password',
    email: 'KitchenWhiz123@gmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'GourmetGuru55',
    password: 'password',
    email: 'GourmetGuru55@yahoo.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'RecipeRocker88',
    password: 'password',
    email: 'RecipeRocker88@gmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'SavorySensation42',
    password: 'password',
    email: 'SavorySensation42@gmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
  {
    username: 'CookingChampion12',
    password: 'password',
    email: 'CookingChampion12@gmail.com',
    created_at: new Date(),
    profile_picture: null,
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
