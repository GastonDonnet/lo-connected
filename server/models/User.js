const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Model } = require('objection');

const BaseModel = require('./_baseModel');
const CustomDate = require('../utils/date');

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    const Address = require('./Address');
    const ShopEmployee = require('./ShopEmployee');
    return {
      address: {
        relation: Model.HasManyRelation,
        modelClass: Address,
        join: {
          from: 'address.userId',
          to: 'user.id',
        },
      },
      employees: {
        relation: Model.HasManyRelation,
        modelClass: ShopEmployee,
        join: {
          from: 'shopEmployee.userId',
          to: 'user.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'displayName'],

      properties: {
        id: { type: 'integer' },
        facebookId: { type: 'string' },
        googleId: { type: 'string' },
        email: { type: 'string', format: 'email' },

        password: { type: 'string', minLength: 8, maxLength: 50 },
        photo: { type: 'string' },

        displayName: { type: 'string' },
        telephone: { type: 'string', minLength: 5, maxLength: 30 },
        birthDate: { type: 'date' },
        gender: {
          enum: ['Male', 'Female', 'Other', null],
        },

        passwordChangedAt: { type: ['datetime', 'null'] },
        passwordResetToken: { type: ['string', 'null'] },
        passwordResetExpires: { type: ['datetime', 'null'] },

        isActive: { type: 'bool' },
      },
    };
  }

  // Virtuals

  // Hooks (Static  Methods)
  static changesPasswordAfter(JWTTimestamp, passwordChangedAt) {
    if (passwordChangedAt !== null) {
      const changedTimestamp = new CustomDate(passwordChangedAt * 1)
        .addHours(3)
        .getTime();
      return JWTTimestamp * 1000 < changedTimestamp;
    }

    // False mean not changed
    return false;
  }

  // Hooks (Instance Methods)

  async $afterFind(context) {
    if (!context.getAllFields) {
      this.password = undefined;
      this.passwordResetToken = undefined;
    }
  }

  async $beforeInsert() {
    await this.cryptPassword();
  }

  async $beforeUpdate(opt, queryContext) {
    queryContext.ignoredFields = ['lastLogin']; // No updatea el "updateAt" cuando se actualiza lastLogin
    await super.$beforeUpdate(opt, queryContext);

    if (this.password) {
      this.passwordChangedAt = new CustomDate().addSeconds(-5).MYSQLParse();
      this.passwordConfirm = undefined;
      await this.$cryptPassword();
    }
  }

  async cryptPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(candidatePassword, userPassword) {
    if (this.password) {
      return await bcrypt.compare(candidatePassword, this.password);
    }

    // Compara passwords
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  async createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = new CustomDate().addMinutes(10).MYSQLParse(); // Expira en 10 minutos

    await this.$query().patch(passwordResetExpires, passwordResetToken);
    return resetToken;
  }
}

module.exports = User;
