import {Model} from 'objection';

class Library extends Model {
  static tableName = '';

  static jsonSchema = {
    type: 'object',
    required: ['location'],

    properties: {
      id: { type: 'integer' },
      location: { type: 'string', format: 'uri' },
      last_checked: { type: ['string', 'null'], format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
      checksum: { type: 'string' },
      remote: { type: ['boolean', 'null'] },
    }
  }
}

export default Library