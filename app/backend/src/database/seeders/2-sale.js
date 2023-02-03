/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 50.00,
        delivery_address: 'Rua sem nome',
        delivery_number: 50,
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 125.00,
        delivery_address: 'Rua com nome',
        delivery_number: 50,
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 3,
        user_id: 3,
        seller_id: 2,
        total_price: 75.00,
        delivery_address: 'Rua cu',
        delivery_number: 50,
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 4,
        user_id: 3,
        seller_id: 2,
        total_price: 25.00,
        delivery_address: 'Rua t nome',
        delivery_number: 50,
        sale_date: new Date(),
        status: 'Pendente',
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};