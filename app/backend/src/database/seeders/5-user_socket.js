module.exports = {
  up: async (QueryInterface) => {
    await QueryInterface.bulkInsert('users_sockets', [
      {
        id: 1,
        socket: 'HCtNLVdQt4Lr6uhDAAAB'
      },
      {
        id: 2,
        socket: 'EduBLkEiILXCBQwAAAAB'
      },
      {
        id: 3,
        socket: 'nGu_4wxYtTjyMd22AAAF'
      },
    ],
    {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_sockets', null, {});
  }
};