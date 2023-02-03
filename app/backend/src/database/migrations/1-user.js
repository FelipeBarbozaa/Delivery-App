module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER },
      name: { allowNull: false, unique: true, type: Sequelize.STRING(50) },
      email: { allowNull: false, unique: true, type: Sequelize.STRING(100) },
      password: { allowNull: false, type: Sequelize.STRING(50) },
      role: { type: Sequelize.STRING(20), defaultValue: 'customer' },
      active: { type: Sequelize.BOOLEAN, allowNull: false }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};