const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  try {
    //Borra users
    await knex('user').del();

    //Inserta users
    await knex('user').insert([
      {
        id: 1,
        email: 'administrador@administrador.com',
        password: await bcrypt.hash('administrador', 12),
        displayName: 'Administrador',
        role: 'admin',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

// Otra forma de escribirlo
// exports.seed = (knex) => {
//   return knex('users')
//     .del()
//     .then(() => {
//       return knex('users').insert([
//         {
//           id: 1,
//           email: 'hola@gmail.com',
//           username: 'test',
//           password: 'test',
//         },
//       ]);
//     });
// };
