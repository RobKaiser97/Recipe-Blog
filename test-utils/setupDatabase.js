const { sequelize } = require('../models');

async function setupDatabase() {
  await sequelize.sync({ force: true });
  // Create test data here
}

module.exports = { setupDatabase };
