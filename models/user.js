"use strict";
const { Model } = require("sequelize");
let bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(passwordInput) {
      return await bcrypt.compare(passwordInput, this.password);
    }

    static associate(models) {
      User.hasMany(models.Product);
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            let salt = await bcrypt.genSaltSync(10);
            let hash = await bcrypt.hashSync(user.password, salt);
            user.password = hash;
          }
        },
      },
    }
  );
  return User;
};
