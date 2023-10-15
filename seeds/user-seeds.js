const { User } = require('../models');
const fs = require('fs');
const { imageToBase64 } = require('../utils/helper');
const defaultImage = imageToBase64('/public/assets/profile-images/default-profile.jpg');


const userData = [
  {
    username: 'CulinaryMaster123',
    password: 'password',
    email: 'culinaryMaster123@hotmail.com',
    about: 'I am passionate about creating delicious and unique dishes!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'SpiceExplorer22',
    password: 'password',
    email: 'SpiceExplorer22@gmail.com',
    about: 'I love exploring different spices and their flavor profiles.',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'TastyTreats4U',
    password: 'password',
    email: 'TastyTreats4U@yahoo.com',
    about: 'Creating tasty treats is my specialty!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'ChefInTraining7',
    password: 'password',
    email: 'ChefInTraining7@gmail.com',
    about: 'I believe cooking should be fun and stress-free!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'FlavorFanatic99',
    password: 'password',
    email: 'FlavorFanatic99@hotmail.com',
    about: 'I enjoy experimenting with gourmet ingredients.',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'KitchenWhiz123',
    password: 'password',
    email: 'KitchenWhiz123@gmail.com',
    about: 'I rock at creating unique and unforgettable recipes!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'GourmetGuru55',
    password: 'password',
    email: 'GourmetGuru55@yahoo.com',
    about: 'My passion lies in creating sensational savory dishes!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'RecipeRocker88',
    password: 'password',
    email: 'RecipeRocker88@gmail.com',
    about: 'I am determined to be a cooking champion!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'SavorySensation42',
    password: 'password',
    email: 'SavorySensation42@gmail.com',
    about: 'Soon to be best chef ever.',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'CookingChampion12',
    password: 'password',
    email: 'CookingChampion12@gmail.com',
    about: 'Cooking is my passion',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'testuser',
    password: 'password',
    email: 'test@test.com',
    about: 'Just a test user.',
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
