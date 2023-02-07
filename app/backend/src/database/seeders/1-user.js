/* eslint-disable max-lines-per-function */
module.exports = {
  up: async (QueryInterface) => {
    await QueryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Felipe Barboza',
        email: 'felipebarboza5@gmail.com',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        role: 'administrator',
        active: true
      },
      {
        id: 2,
        name: 'Felipe Vendedor',
        email: 'vendedor@gmail.com',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        role: 'seller',
        active: true
      },
      {
        id: 3,
        name: 'Felipe Cliente',
        email: 'cliente@gmail.com',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        role: 'customer',
        active: true,
      },
    ],
    {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};