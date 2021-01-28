exports.up = function (knex) {
  return knex.schema
    .createTable('orderStatus', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');

      t.timestamps(true, true);
    })
    .createTable('orderState', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description').notNullable();

      t.timestamps(true, true);
    })
    .createTable('order', (t) => {
      t.increments();
      t.integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('shopId') // Queda redundante pero es necesario para acceder con pocas querys a info de una orden
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('orderStateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderState')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('statusId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderStatus')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('token').unique().notNullable();

      t.string('clientAddress').notNullable();
      t.float('total');
      t.string('note');
      t.boolean('delivery').defaultTo(true);
      t.enum('paymentMethod', ['efectivo', 'tarjeta']);

      t.date('deliveryDate').nullable();
      t.time('deliveryTime').nullable();

      t.timestamp('lastStateUpdate').defaultTo(knex.fn.now());
      t.timestamps(true, true);
    })
    .createTable('orderTransaction', (t) => {
      t.increments();
      t.integer('orderId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('orderStateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderState')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('newOrderStateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderState')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('token').unique().notNullable();
      t.string('note');

      t.timestamp('validFrom').nullable();
      t.timestamp('validTo').defaultTo(knex.fn.now());
      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('orderTransaction')
    .dropTable('order')
    .dropTable('orderState')
    .dropTable('orderStatus');
};
