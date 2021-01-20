exports.up = function (knex) {
  return knex.schema
    .createTable('list', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');

      t.timestamps(true, true);
    })
    .createTable('shopList', (t) => {
      t.integer('shopId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('listId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('list')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.primary(['listId', 'shopId']);

      t.integer('relevance').defaultTo(5);

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('shopList').dropTable('list');
};
