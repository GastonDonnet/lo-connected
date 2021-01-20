exports.up = function (knex) {
  return knex.schema
    .createTable('orderProductState', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description').notNullable();

      t.timestamps(true, true);
    })
    .createTable('orderProduct', (t) => {
      t.increments();
      t.integer('orderId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('order')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      t.integer('orderProductStateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderProductState')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      t.integer('statusId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderStatus')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      t.integer('productVariantId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('productVariant')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('token').unique().notNullable();

      t.string('name');
      t.float('price').notNullable();
      t.integer('quantity').notNullable();
      t.float('subtotal').notNullable();

      t.string('note');

      t.timestamp('lastStateUpdate').defaultTo(knex.fn.now());
      t.timestamps(true, true);
    })
    .createTable('orderProductTransaction', (t) => {
      t.increments();
      t.integer('orderProductId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderProduct')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('orderProductStateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderProductState')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('newOrderStateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orderProductState')
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

      t.timestamp('validFrom');
      t.timestamp('validTo').defaultTo(knex.fn.now());
      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('orderProductTransaction')
    .dropTable('orderProduct')
    .dropTable('orderProductState');
};
