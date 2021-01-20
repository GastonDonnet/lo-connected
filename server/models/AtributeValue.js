const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class AtributeValue extends BaseModel {
  static get tableName() {
    return 'atributeValue';
  }

  static get relationMappings() {
    const AtributeType = require('./AtributeType');
    return {
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: AtributeType,
        join: {
          from: 'atributeValue.atributeTypeId',
          to: 'atributeType.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['atributeTypeId'],

      properties: {
        id: { type: 'integer' },
        atributeTypeId: { type: 'integer' },
        value: { type: 'string' },
      },
    };
  }
}

module.exports = AtributeValue;
