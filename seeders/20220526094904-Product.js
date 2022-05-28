"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};

const products = [...Array(20).keys()].map((i) => ({
  name: `name${i}`,
  desc: "this is server it can detect Objects",
  price: 250,
  qty: 25,
  image: "/static/images/example.jpg",
  userId: i > 10 ? 2 : 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
