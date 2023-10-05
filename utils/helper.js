module.exports = {
  format_date: (date) => {
    let formattedDate = new Date(date);
    return `${
      formattedDate.getMonth() + 1
    }/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  },
};
