exports.up = function (knex) {
  return knex.schema
    .createTable('shopCategory', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('icon');

      t.integer('shopCategoryId')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('shopCategory');

      t.timestamps(true, true);
    })
    .createTable('shopState', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');

      t.timestamps(true, true);
    })

    .createTable('shop', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('description');
      t.string('telephone').notNullable();
      t.string('telephone1');
      t.string('telephone2');
      t.float('avgRating').defaultTo(0);
      t.integer('deliveryCost').defaultTo(0);
      t.integer('deliveryMin').defaultTo(0);
      t.string('imgLogo').defaultTo('defaultLogo.jpeg');
      t.string('imgBanner').defaultTo('defaultBanner.jpeg');

      t.string('invitationCode').nullable().unique();
      t.datetime('invitationCodeExpires').nullable();

      t.integer('defaultRoleId').unsigned().nullable();

      t.boolean('active').defaultTo(0);

      t.integer('stateId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shopState')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.integer('shopCategoryId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shopCategory')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })
    .createTable('shopReview', (t) => {
      t.increments();
      t.string('comment'); // Comentario Opcional
      t.float('rating').notNullable();

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

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('shopReview')
    .dropTable('shop')
    .dropTable('shopState')
    .dropTable('shopCategory');
};
