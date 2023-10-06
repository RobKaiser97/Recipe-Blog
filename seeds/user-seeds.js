const { User } = require('../models');
const path = require('path');
const defaultImage = path.join(
  __dirname,
  '../public/assets/profile-images/default-profile.jpg'
);

const userData = [
  {
    username: 'CulinaryMaster123',
    password: 'password',
    email: 'culinaryMaster123@hotmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'SpiceExplorer22',
    password: 'password',
    email: 'SpiceExplorer22@gmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'TastyTreats4U',
    password: 'password',
    email: 'TastyTreats4U@yahoo.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'ChefInTraining7',
    password: 'password',
    email: 'ChefInTraining7@gmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'FlavorFanatic99',
    password: 'password',
    email: 'FlavorFanatic99@hotmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'KitchenWhiz123',
    password: 'password',
    email: 'KitchenWhiz123@gmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'GourmetGuru55',
    password: 'password',
    email: 'GourmetGuru55@yahoo.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'RecipeRocker88',
    password: 'password',
    email: 'RecipeRocker88@gmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'SavorySensation42',
    password: 'password',
    email: 'SavorySensation42@gmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'CookingChampion12',
    password: 'password',
    email: 'CookingChampion12@gmail.com',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;
