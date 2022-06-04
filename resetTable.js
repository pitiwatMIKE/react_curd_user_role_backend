const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function migrateUndoAll() {
  const { stdout, stderr } = await exec(
    "npx sequelize-cli db:migrate:undo:all"
  );
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}
async function migrate() {
  const { stdout, stderr } = await exec("npx sequelize-cli db:migrate");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}
async function seed() {
  const { stdout, stderr } = await exec("npx sequelize-cli db:seed:all");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

module.exports = resetDbTable = async () => {
  await migrateUndoAll();
  await migrate();
  await seed();
};
