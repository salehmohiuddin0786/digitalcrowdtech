const path = require('path');
const { Sequelize, DataTypes } = require(path.join(__dirname, '../Backend/node_modules/sequelize'));
const { defaultProducts } = require(path.join(__dirname, '../Backend/defaultData'));

const sequelize = new Sequelize('dct', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false
});

const Product = sequelize.define(
  "Product",
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    category: { type: DataTypes.STRING, allowNull: false, defaultValue: "Web Application" },
    label: { type: DataTypes.STRING, defaultValue: "Ready to Deploy" },
    summary: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT("long"), allowNull: false },
    price: { type: DataTypes.STRING, defaultValue: "Starting from ₹9,999" },
    technologies: { type: DataTypes.TEXT },
    features: { type: DataTypes.TEXT },
    screenshots: { type: DataTypes.TEXT },
    pricingPlans: { type: DataTypes.TEXT },
    overview: { type: DataTypes.TEXT },
    liveUrl: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Published", "Draft"), defaultValue: "Published" },
  },
  { tableName: "products" }
);

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    const agencyProd = defaultProducts.find(p => p.id === 'prod-enterprise-agency-suite');
    if (!agencyProd) {
      console.error("Agency product not found in defaultProducts!");
      return;
    }

    const [updated] = await Product.update(
      {
        title: agencyProd.title,
        slug: agencyProd.slug,
        category: agencyProd.category,
        label: agencyProd.label,
        summary: agencyProd.summary,
        description: agencyProd.description,
        price: agencyProd.price,
        technologies: agencyProd.technologies,
        features: agencyProd.features,
        screenshots: agencyProd.screenshots,
        pricingPlans: agencyProd.pricingPlans,
        overview: agencyProd.overview,
        liveUrl: agencyProd.liveUrl,
        imageUrl: agencyProd.imageUrl,
        status: agencyProd.status,
      },
      {
        where: { id: 'prod-enterprise-agency-suite' }
      }
    );

    console.log(`Updated ${updated} row(s) for prod-enterprise-agency-suite`);

    const updatedRow = await Product.findByPk('prod-enterprise-agency-suite');
    console.log("Updated row slug:", updatedRow.slug);
    console.log("Updated row price:", updatedRow.price);
    console.log("Updated row imageUrl:", updatedRow.imageUrl);
    console.log("Updated row screenshots length:", updatedRow.screenshots ? updatedRow.screenshots.length : null);
  } catch (err) {
    console.error("Error updating database:", err);
  } finally {
    await sequelize.close();
  }
}

run();
