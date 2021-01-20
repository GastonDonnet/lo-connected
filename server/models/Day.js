const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class Day extends BaseModel {
  static get tableName() {
    return 'day';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['day'],

      properties: {
        id: { type: 'integer' },
        day: {
          type: 'string',
          enum: [
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'sabado',
            'domingo',
            'feriado',
            'semana',
            'finDeSemana',
            'oneTime',
          ],
        },
      },
    };
  }
}

module.exports = Day;
