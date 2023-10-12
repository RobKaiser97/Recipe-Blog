const { Buffer } = require('buffer');

module.exports = {
  format_date: (date) => {
    let formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1
      }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
  decodeBase64: (base64String) => {
    const decodedString = Buffer.from(base64String, 'base64').toString();
    const parts = decodedString.split('/public');
    const imagePath = parts[1];
    console.log(imagePath);
    return imagePath;
  }
};