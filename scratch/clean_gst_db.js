const path = require('path');
const { Sequelize } = require(path.join(__dirname, '../Backend/node_modules/sequelize'));
const sequelize = new Sequelize('dct', 'root', '', { host: 'localhost', dialect: 'mysql', logging: false });

async function check() {
  try {
    const [rows] = await sequelize.query("SELECT id, title, features, pricingPlans FROM products WHERE features LIKE '%GST%' OR pricingPlans LIKE '%GST%'");
    console.log('Matches found in DB:', rows.length);
    for (const r of rows) {
      console.log('Found:', r.id, r.title);
      let updatedFeatures = r.features;
      let updatedPricing = r.pricingPlans;
      if (updatedFeatures && updatedFeatures.includes('GST')) {
        updatedFeatures = updatedFeatures.replace(/itemized GST invoices/gi, 'itemized billing receipts').replace(/GST/g, 'tax');
      }
      if (updatedPricing && updatedPricing.includes('GST')) {
        updatedPricing = updatedPricing.replace(/GST-Ready Reports/gi, 'Financial Reports').replace(/GST/g, 'tax');
      }
      await sequelize.query('UPDATE products SET features = :f, pricingPlans = :p WHERE id = :id', {
        replacements: { f: updatedFeatures, p: updatedPricing, id: r.id }
      });
      console.log('Cleaned GST references in DB for', r.id);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
check();
