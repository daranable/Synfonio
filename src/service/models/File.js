import {Model} from 'objection';

export default class File extends Model {
  static tableName = 'files';

  static jsonSchema = {
    type: 'object',
    required: ['path', 'filename', 'library_id'],

    properties: {
      id: { type: 'integer' },
      library_id: { type: 'integer' },
      path: { type: 'string' },
      filename: { type: 'string' },
      last_seen: { type: 'string', format: 'date-time' },
    }
  };

  static relationMappings = {
    library: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Library',
      join: {
        from: 'libraries.id',
        to: 'files.library_id',
      }
    }
  }
}