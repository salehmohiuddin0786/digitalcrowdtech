const mysql = require("mysql2/promise");

async function migrate() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dct",
  });

  const columns = [
    { name: "businessName", def: "VARCHAR(255) NULL" },
    { name: "service", def: "VARCHAR(255) NULL" },
    { name: "budget", def: "VARCHAR(100) NULL" },
    { name: "status", def: "VARCHAR(50) DEFAULT 'New'" },
  ];

  const [existingCols] = await connection.query("DESCRIBE queries");
  const colNames = existingCols.map((c) => c.Field);

  for (const col of columns) {
    if (!colNames.includes(col.name)) {
      await connection.query(`ALTER TABLE queries ADD COLUMN ${col.name} ${col.def}`);
      console.log(`Added column ${col.name}`);
    } else {
      console.log(`Column ${col.name} already exists`);
    }
  }

  const [projectCols] = await connection.query("DESCRIBE projects");
  const projectColNames = projectCols.map((c) => c.Field);
  if (!projectColNames.includes("imageUrl")) {
    await connection.query("ALTER TABLE projects ADD COLUMN imageUrl VARCHAR(500) NULL AFTER liveUrl");
    console.log("Added imageUrl column to projects table");
  }

  const [blogCols] = await connection.query("DESCRIBE blogs");
  const blogColNames = blogCols.map((c) => c.Field);
  if (!blogColNames.includes("slug")) {
    await connection.query("ALTER TABLE blogs ADD COLUMN slug VARCHAR(255) NULL AFTER title");
    console.log("Added slug column to blogs table");
  }
  if (!blogColNames.includes("readTime")) {
    await connection.query("ALTER TABLE blogs ADD COLUMN readTime VARCHAR(50) DEFAULT '5 min read' AFTER date");
    console.log("Added readTime column to blogs table");
  }

  const [updatedCols] = await connection.query("DESCRIBE queries");
  console.log("Final columns in queries:", updatedCols.map((c) => c.Field));

  await connection.end();
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
  });
