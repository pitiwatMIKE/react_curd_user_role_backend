"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};

const desc = `Occaecati quo velit sapiente sit occaecati debitis laudantium a. Molestiae recusandae sed similique voluptatibus perferendis atque ex quisquam hic. Voluptate sunt aut perspiciatis ut aut recusandae autem omnis. Molestiae vel vel tempore quae ut. Eligendi est exercitationem qui quam optio maiores autem aut dolorem. Voluptate accusamus quisquam et sed placeat est id.
 
Alias incidunt blanditiis minus laborum facilis accusamus. Pariatur quis culpa corrupti quae porro ut. Dolor id et dolorum.
 
Sit perspiciatis et omnis molestiae omnis. Non officiis tempora earum dolorum quae id accusamus maiores beatae. Ipsam voluptatem id qui illum.`;

const products = [...Array(50).keys()].map((i) => ({
  name: `name${i}`,
  desc: desc,
  price: 250,
  qty: 25,
  image: "/static/images/example.jpg",
  userId: i > 10 ? 2 : 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
