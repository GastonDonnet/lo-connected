exports.up = function (knex) {
  return knex.schema

    .createTable('tag', (t) => {
      t.increments();
      t.string('name').notNullable();

      t.timestamps(true, true);
    })
    .createTable('sale', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('type').notNullable();
      t.float('value').notNullable();

      t.timestamps(true, true);
    })
    .createTable('productBrand', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');

      t.timestamps(true, true);
    })
    .createTable('productCategory', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');
      t.bool('visible').defaultTo(true);

      t.integer('shopId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('categoryId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('productCategory')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('saleId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sale')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })
    .createTable('masterProduct', (t) => {
      t.increments();

      t.integer('shopId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.string('name').notNullable();
      t.string('description');

      t.timestamps(true, true);
    })
    .createTable('product', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');
      t.float('avgRating').defaultTo(0);
      t.string('barcode');
      t.string('model');
      t.float('price');
      t.bool('taxIncluded').defaultTo(false);
      t.bool('hasAtributes').defaultTo(false);
      t.bool('active').defaultTo(true);

      t.integer('masterProductId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('masterProduct')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('shopId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('categoryId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('productCategory')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('brandId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('productBrand')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('saleId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sale')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })
    .createTable('productReview', (t) => {
      t.increments();
      t.string('comment');
      t.string('rating').notNullable();

      t.integer('productId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })
    .createTable('productTag', (t) => {
      t.increments();

      t.integer('productId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('tagId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tag')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })
    .createTable('productImage', (t) => {
      t.increments();

      t.string('path').notNullable();

      t.integer('productId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })
    .createTable('productHistory', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');
      t.float('avgRating').defaultTo(0);
      t.string('barcode');
      t.string('model');
      t.float('price');
      t.bool('taxIncluded').defaultTo(false);

      t.integer('shopId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('categoryId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('productCategory')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('brandId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('productBrand')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('saleId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('sale')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('productId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('product')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamp('valid_from').notNullable();
      t.timestamp('valid_to').defaultTo(knex.fn.now());

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('productHistory')
    .dropTable('productImage')
    .dropTable('productTag')
    .dropTable('productReview')
    .dropTable('product')
    .dropTable('masterProduct')
    .dropTable('productCategory')
    .dropTable('productBrand')
    .dropTable('sale')
    .dropTable('tag');
};
