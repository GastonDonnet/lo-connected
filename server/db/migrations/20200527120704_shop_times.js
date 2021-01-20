exports.up = function (knex) {
  return knex.schema
    .createTable('shopTime', (t) => {
      t.increments();
      t.time('from').notNullable();
      t.time('to').notNullable();

      t.bool('delivery').defaultsTo(false);

      t.integer('shopId')
        .unsigned()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })

    .createTable('day', (t) => {
      t.increments();
      t.enum('day', [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo',
        'feriado',
        'semana',
        'finDeSemana',
        'oneTime',
      ]);

      t.timestamps(true, true);
    })

    .createTable('shopTimeDay', (t) => {
      t.integer('shopTimeId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shopTime')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('dayId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('day')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.primary(['dayId', 'shopTimeId']);

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('shopTimeDay')
    .dropTable('shopTime')
    .dropTable('day');
};
