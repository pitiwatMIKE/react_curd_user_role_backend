"use strict";
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

let date = { createdAt: new Date(), updatedAt: new Date() };

const users = [
  {
    ...date,
    firstname: "admin",
    lastname: "My admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234", salt),
    role: "admin",
  },
  {
    ...date,
    firstname: "user",
    lastname: "My user",
    email: "user@example.com",
    password: bcrypt.hashSync("1234", salt),
    role: "user",
  },
];
