exports.up = function (knex) {
  return knex.schema
    .createTable('atributeType', (t) => {
      t.increments();

      t.integer('masterProductId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('masterProduct')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.enum('type', [
        'string',
        'number',
        'float',
        'color',
        'date',
        'datetime',
        'null',
      ]);
      t.string('name').notNullable();
      t.string('description');

      t.timestamps(true, true);
    })
    .createTable('productAtributeType', (t) => {
      t.integer('productId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('atributeTypeId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('atributeType')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.primary(['productId', 'atributeTypeId']);

      t.timestamps(true, true);
    })
    .createTable('atributeValue', (t) => {
      t.increments();

      t.integer('atributeTypeId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('atributeType')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('value');

      t.timestamps(true, true);
    })
    .createTable('productVariant', (t) => {
      t.increments();

      t.integer('productId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('sku').unique().notNullable();

      t.string('description');
      t.float('stock').defaultTo(1);
      t.float('price');

      t.timestamps(true, true);
    })
    .createTable('productVariantAtributeValue', (t) => {
      t.integer('productVariantId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('productVariant')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('atributeValueId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('atributeValue')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.primary(['productVariantId', 'atributeValueId']);
      t.timestamps(true, true);
    })
    .createTable('productImageVariant', (t) => {
      t.integer('productVariantId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('productVariant')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('productImageId')
        .unsigned()
        .notNullable()
        .references('id') // VER QUE NO CREA RELACION
        .inTable('productImage')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.primary(['productImageId', 'productVariantId']);

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('productImageVariant')
    .dropTable('productVariantAtributeValue')
    .dropTable('productAtributeType')
    .dropTable('productVariant')
    .dropTable('atributeValue')
    .dropTable('atributeType');
};
