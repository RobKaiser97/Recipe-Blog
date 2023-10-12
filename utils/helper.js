const { Buffer } = require('buffer');

module.exports = {
  format_date: (date) => {
    let formattedDate = new Date(date);
    return `${formattedDate.getMonth() + 1
      }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },

  getImageUrl: (blob) => {
    return new Promise((resolve, reject) => {
      const buffer = Buffer.from(blob);
      const dataUrl = `data:${blob.type};base64,${buffer.toString('base64')}`;
      resolve(dataUrl);
    });
  }
};