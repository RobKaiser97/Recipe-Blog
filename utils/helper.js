const { Buffer } = require('buffer');

module.exports = {
  format_date: (date) => {
    let formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1
      }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
  decodeBase64: (base64String) => {
    const decodedString = Buffer.from(base64String, 'base64').toString();
    console.log(decodedString);
    return decodedString;
  }
};