
exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('libraries', (t) => {
      t.increments('id').primary();
      t.string('location').notNull();
      t.dateTime('last_checked').nullable();
      t.dateTime('createdAt').notNull();
      t.string('checksum').notNull();
      t.boolean('remote');
    })
    .createTable('files', (t) => {
      t.increments('id').primary();
      t.integer('library_id').unsigned().references('id').inTable('libraries');
      //The relative path from the library
      t.string('path').notNull();
      t.string('filename').notNull();
      t.dateTime('last_seen').nullable();
    });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists('libraries')
    .dropTableIfExists('files');
};
