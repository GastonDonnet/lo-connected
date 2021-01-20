exports.up = function (knex) {
  return knex.schema.createTable('user', (t) => {
    t.increments();
    t.string('email').unique();
    t.string('googleId').unique();
    t.string('facebookId').unique();
    t.string('password');

    t.string('displayName');
    t.string('telephone');
    t.date('birthDate');
    t.string('photo');
    t.enum('gender', ['Male', 'Famale', 'Other']).nullable();

    t.string('role').notNullable().defaultTo('user');

    t.bool('isActive').notNullable().defaultTo(true);
    t.timestamp('lastLogin').notNullable().defaultTo(knex.fn.now());
    t.timestamp('passwordChangedAt').nullable();
    t.string('passwordResetToken');
    t.timestamp('passwordResetExpires').nullable();

    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
