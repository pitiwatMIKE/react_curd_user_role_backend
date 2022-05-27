"use strict";
const { Model } = require("sequelize");
const { options } = require("../routes/productRouter");
let bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    async comparePassword(passwordInput) {
      return await bcrypt.compare(passwordInput, this.password);
    }

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: { arg: true, msg: "Invalid Email" } },
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
