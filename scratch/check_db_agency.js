const path = require('path');
const { Sequelize } = require(path.join(__dirname, '../Backend/node_modules/sequelize'));
const sequelize = new Sequelize('dct', 'root', 'root', { host: 'localhost', dialect: 'mysql', logging: false });

async function check() {
  try {
    const [rows] = await sequelize.query("SELECT id, slug, title, price, imageUrl, screenshots, pricingPlans, overview FROM products WHERE slug LIKE '%agency%' OR id LIKE '%agency%'");
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
check();
