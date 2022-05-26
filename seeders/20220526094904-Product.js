"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};

const products = [...Array(20).keys()].map((i) => ({
  name: `name${i}`,
  desc: "this is server it can detect Objects",
  price: 250,
  qty: 25,
  image: "/upload/example.png",
  createdAt: new Date(),
  updatedAt: new Date(),
}));
