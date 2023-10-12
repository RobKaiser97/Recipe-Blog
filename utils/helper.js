const { Buffer } = require('buffer');
const path = require('path');

module.exports = {
  format_date: (date) => {
    let formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1
      }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
  decodeBase64: (base64String) => {
    try {
      // Decode the Base64 string
      const decodedString = Buffer.from(base64String, 'base64').toString();

      // Use the path module to handle the file path in an OS-agnostic way
      const parts = decodedString.split(path.sep + 'public');
      const imagePath = parts[1];

      console.log(imagePath);
      return imagePath;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  },
  randomRecipe: (recipeData) => {
    const randomIndex = Math.floor(Math.random() * recipeData.length);
    return recipeData[randomIndex];
  }
};