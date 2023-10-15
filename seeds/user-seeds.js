const { User } = require('../models');
const fs = require('fs');
const { imageToBase64 } = require('../utils/helper');
const defaultImage = imageToBase64(
  '/public/assets/profile-images/default-profile.jpg'
);

const userData = [
  {
    username: 'CulinaryMaster123',
    password: 'password',
    email: 'culinaryMaster123@hotmail.com',
    about:
      'I am a passionate chef dedicated to creating delicious and unique dishes that ignite the taste buds!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'SpiceExplorer22',
    password: 'password',
    email: 'SpiceExplorer22@gmail.com',
    about:
      'I embark on flavorful journeys exploring a world of spices and uncovering their intricate taste profiles.',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'TastyTreats4U',
    password: 'password',
    email: 'TastyTreats4U@yahoo.com',
    about:
      'My specialty lies in crafting delectable treats that leave an indelible mark on your taste buds!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'ChefInTraining7',
    password: 'password',
    email: 'ChefInTraining7@gmail.com',
    about:
      'I firmly believe that cooking should be a joyful and stress-free experience for everyone!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'FlavorFanatic99',
    password: 'password',
    email: 'FlavorFanatic99@hotmail.com',
    about:
      'I delight in the art of experimenting with gourmet ingredients, creating culinary masterpieces along the way.',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'KitchenWhiz123',
    password: 'password',
    email: 'KitchenWhiz123@gmail.com',
    about:
      'I excel at concocting unique and unforgettable recipes that elevate every dining experience!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'GourmetGuru55',
    password: 'password',
    email: 'GourmetGuru55@yahoo.com',
    about:
      'My culinary passion lies in crafting sensational savory dishes that tantalize the taste buds!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'RecipeRocker88',
    password: 'password',
    email: 'RecipeRocker88@gmail.com',
    about:
      'I am driven to be a culinary champion, pushing the boundaries of taste and creativity!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'SavorySensation42',
    password: 'password',
    email: 'SavorySensation42@gmail.com',
    about:
      'On the path to becoming the best chef ever, with a focus on creating extraordinary savory delights!',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'CookingChampion12',
    password: 'password',
    email: 'CookingChampion12@gmail.com',
    about:
      'Cooking is not just a hobby, it’s my passion, and I put my heart and soul into every dish I create.',
    created_at: new Date(),
    profile_picture: defaultImage,
  },
  {
    username: 'testuser',
    password: 'password',
    email: 'test@test.com',
    about: 'Just a test user exploring the world of flavors!',
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
