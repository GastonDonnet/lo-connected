exports.up = function (knex) {
  return knex.schema
    .createTable('permission', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.string('permission').notNullable();

      t.timestamps(true, true);
    })

    .createTable('role', (t) => {
      t.increments();
      t.string('name').notNullable();
      t.integer('shopId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('shop')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      t.timestamps(true, true);
    })

    .createTable('rolePermission', (t) => {
      t.integer('roleId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('role')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      t.integer('permissionId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('permission')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      t.primary(['roleId', 'permissionId']);

      t.timestamps(true, true);
    })

    .createTable('shopEmployee', (t) => {
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

      t.primary(['userId', 'shopId']);

      t.integer('roleId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('role')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

      t.boolean('active').defaultsTo(true);

      t.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('shopEmployee')
    .dropTable('rolePermission')
    .dropTable('permission')
    .dropTable('role');
};
