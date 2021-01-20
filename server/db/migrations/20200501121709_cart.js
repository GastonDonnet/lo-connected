exports.up = function (knex) {
  return knex.schema
    .createTable('cart', (t) => {
      t.increments();
      t.integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      t.integer('shopId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('token').unique();

      t.datetime('validTo');
      t.timestamps(true, true);
    })
    .createTable('cartProduct', (t) => {
      t.increments();
      t.integer('productVariantId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('productVariant')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      t.integer('cartId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cart')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('quantity').defaultTo(1);
      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cartProduct').dropTable('cart');
};
