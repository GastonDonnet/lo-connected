const { ValidationError } = require('objection');
const { Model } = require('objection');
const CustomDate = require('../utils/date');
const { arrayOnlyIncludes } = require('../utils/utils');

class BaseModel extends Model {
  $beforeInsert() {
    if (this.id) {
      throw new ValidationError({
        message: 'identifier should not be defined before insert',
        type: 'MyCustomError',
        data: {},
      });
    }

    const now = new CustomDate().MYSQLParse();
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate(opt, queryContext) {
    if (
      !queryContext.ignoredFields ||
      !arrayOnlyIncludes(Object.keys(this), queryContext.ignoredFields)
    ) {
      this.updatedAt = new CustomDate().MYSQLParse();
    }
  }
}

module.exports = BaseModel;
