exports.up = function (knex) {
  return knex.schema
    .createTable('country', (t) => {
      t.increments();
      t.string('name').unique().notNullable();

      t.timestamps(true, true);
    })

    .createTable('province', (t) => {
      t.increments();
      t.integer('countryId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('country')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      t.string('name').notNullable();

      t.timestamps(true, true);
    })

    .createTable('city', (t) => {
      t.increments();
      t.integer('provinceId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('province')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('name').notNullable();

      t.timestamps(true, true);
    })

    .createTable('address', (t) => {
      t.increments();
      t.integer('cityId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('city')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('street').notNullable();
      t.string('note');

      t.integer('userId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('shopId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('address')
    .dropTable('city')
    .dropTable('province')
    .dropTable('country');
};
