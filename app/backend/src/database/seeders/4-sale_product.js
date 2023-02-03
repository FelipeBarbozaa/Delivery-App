module.exports = {
  up: async (queryInterface,) => {
    queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 20,
      },
      {
        sale_id: 2,
        product_id: 1,
        quantity: 30,
      },
      {
        sale_id: 3,
        product_id: 2,
        quantity: 15,
      },
    ]);
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('sales_products', null, {});
  }
};