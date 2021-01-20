const { Model } = require('objection');
const BaseModel = require('./_baseModel');

class AtributeType extends BaseModel {
  static get tableName() {
    return 'atributeType';
  }

  static get relationMappings() {
    const AtributeValue = require('./AtributeValue');
    return {
      values: {
        relation: Model.HasManyRelation,
        modelClass: AtributeValue,
        join: {
          from: 'atributeType.id',
          to: 'atributeValue.atributeTypeId',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'type', 'masterProductId'],

      properties: {
        id: { type: 'integer' },
        masterProductId: { type: 'integer' },
        type: {
          type: 'string',
          enum: ['string', 'float', 'integer', 'color', 'null'],
          default: 'string',
        },
        name: { type: 'string' },
        description: { type: 'string' },
      },
    };
  }
}

module.exports = AtributeType;
