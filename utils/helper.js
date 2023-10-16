const { Buffer } = require('buffer');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to get MIME type based on the file extension
const getMimeType = extension => {
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    // add more types as needed
  };
  return types[extension.toLowerCase()] || 'application/octet-stream'; // default to 'application/octet-stream' if type is not recognized
};

module.exports = {
  upload,
  format_date: date => {
    let formattedDate = new Date(date);
    return `${
      formattedDate.getMonth() + 1
    }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
  imageToBase64: pathInput => {
    const relativePath = pathInput.startsWith('/')
      ? pathInput.substring(1)
      : pathInput;
    const absolutePath = path.join(process.cwd(), relativePath);

    // Use getMimeType to find MIME type
    const mimeType = getMimeType(path.extname(absolutePath));

    const file = fs.readFileSync(absolutePath);
    const base64String = Buffer.from(file).toString('base64');
    return `data:${mimeType};base64,${base64String}`; // Add the mimetype
  },
  decodeBase64: base64String => {
    // console.log('Before decodeBase64:', req.file.buffer);
    try {
      if (base64String === null || base64String === undefined) {
        console.log('Received null or undefined. Skipping decoding.');
        return null;
      }

      // Decode the Base64 string
      const decodedString = Buffer.from(base64String, 'base64').toString();

      // Use the path module to handle the file path in an OS-agnostic way
      const parts = decodedString.split(path.sep + 'public');
      const imagePath = parts[1];

      console.log(imagePath);
      return imagePath;
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  },
  randomRecipe: recipeData => {
    const randomIndex = Math.floor(Math.random() * recipeData.length);
    return recipeData[randomIndex];
  },
  seasonalRecipe: recipeData => {
    const specificIndex = 1;
    return recipeData[specificIndex];
  },
  eq: (a, b) => {
    return a === b;
  },
  binaryToBase64: (binaryData, mimeType = 'image/jpeg') => {
    try {
      if (binaryData === null || binaryData === undefined) {
        console.log('Received null or undefined. Skipping encoding.');
        return null;
      }

      if (!Buffer.isBuffer(binaryData)) {
        console.log('Received non-Buffer object. Skipping encoding.');
        return null;
      }

      const base64String = Buffer.from(binaryData).toString('base64');
      return `data:${mimeType};base64,${base64String}`; // Add the mimetype
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  },
  // Function to convert base64 to binary
  base64ToBinary: base64String => {
    try {
      if (base64String === null || base64String === undefined) {
        console.log('Received null or undefined. Skipping decoding.');
        return null;
      }

      if (typeof base64String !== 'string') {
        console.log(
          'Received non-string object for base64. Skipping decoding.'
        );
        return null;
      }

      const binaryData = Buffer.from(base64String, 'base64');
      return binaryData;
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  },
  validateSignupData: userData => {
    const { username, password, email } = userData;
    const errors = [];
    if (!username || typeof username !== 'string') {
      errors.push({
        field: 'username',
        message: 'Username field is required and must be a string',
      });
    }
    if (!password || typeof password !== 'string') {
      errors.push({
        field: 'password',
        message: 'Password field is required and must be a string',
      });
    } else if (
      !/\d/.test(password) ||
      !/[!@#$%^&*()_+[\]{};':"\\|,.<>?`~]/.test(password)
    ) {
      errors.push({
        field: 'password',
        message: 'Password must contain at least one number and one symbol',
      });
    }
    if (!email || typeof email !== 'string') {
      errors.push({
        field: 'email',
        message: 'Email field is required and must be a string',
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }
    if (errors.length > 0) {
      throw errors; // Throw an array of error objects
    }
    // If all validations pass, return true
    return true;
  },
};
