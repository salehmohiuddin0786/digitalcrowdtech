const mysql = require('mysql2/promise');

async function migrate() {
  const conn = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'dct' });

  console.log('Connecting to MySQL database dct...');

  // 1. Alter orders table to add coupon & offer columns
  try {
    await conn.execute('ALTER TABLE orders ADD COLUMN originalAmount DECIMAL(10,2) NULL AFTER amount');
    console.log('Added originalAmount to orders');
  } catch (e) {}

  try {
    await conn.execute('ALTER TABLE orders ADD COLUMN discountAmount DECIMAL(10,2) NOT NULL DEFAULT 0.00 AFTER originalAmount');
    console.log('Added discountAmount to orders');
  } catch (e) {}

  try {
    await conn.execute('ALTER TABLE orders ADD COLUMN couponCode VARCHAR(100) NULL AFTER discountAmount');
    console.log('Added couponCode to orders');
  } catch (e) {}

  try {
    await conn.execute('ALTER TABLE orders ADD COLUMN offerId VARCHAR(255) NULL AFTER couponCode');
    console.log('Added offerId to orders');
  } catch (e) {}

  // 2. Create offers table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS offers (
      id VARCHAR(255) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      discountType ENUM('PERCENTAGE', 'FIXED', 'FREE_SERVICE') NOT NULL DEFAULT 'PERCENTAGE',
      discountValue DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      maxDiscountAmount DECIMAL(10,2) NULL,
      minOrderValue DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      isAutomatic TINYINT(1) NOT NULL DEFAULT 0,
      customerEligibility ENUM('ALL', 'NEW_CUSTOMERS', 'EXISTING_CUSTOMERS') NOT NULL DEFAULT 'ALL',
      firstOrderOnly TINYINT(1) NOT NULL DEFAULT 0,
      totalUsageLimit INT NULL,
      perCustomerLimit INT NOT NULL DEFAULT 1,
      usedCount INT NOT NULL DEFAULT 0,
      startDate DATETIME NOT NULL,
      expiryDate DATETIME NOT NULL,
      isActive TINYINT(1) NOT NULL DEFAULT 1,
      bannerText VARCHAR(255) NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      INDEX idx_offers_status (isActive, startDate, expiryDate),
      INDEX idx_offers_auto (isAutomatic, isActive)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Verified offers table');

  // 3. Create coupons table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS coupons (
      id VARCHAR(255) PRIMARY KEY,
      offerId VARCHAR(255) NOT NULL,
      code VARCHAR(50) NOT NULL UNIQUE,
      totalUsageLimit INT NULL,
      perCustomerLimit INT NULL,
      usedCount INT NOT NULL DEFAULT 0,
      isActive TINYINT(1) NOT NULL DEFAULT 1,
      expiryDate DATETIME NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      INDEX idx_coupons_code (code),
      INDEX idx_coupons_offer (offerId),
      CONSTRAINT fk_coupons_offer FOREIGN KEY (offerId) REFERENCES offers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Verified coupons table');

  // 4. Create offer_service_mappings table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS offer_service_mappings (
      id VARCHAR(255) PRIMARY KEY,
      offerId VARCHAR(255) NOT NULL,
      productId VARCHAR(255) NOT NULL,
      productTitle VARCHAR(255) NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      INDEX idx_mapping_offer (offerId),
      INDEX idx_mapping_product (productId),
      CONSTRAINT fk_mapping_offer FOREIGN KEY (offerId) REFERENCES offers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Verified offer_service_mappings table');

  // 5. Create coupon_redemptions table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS coupon_redemptions (
      id VARCHAR(255) PRIMARY KEY,
      couponId VARCHAR(255) NULL,
      offerId VARCHAR(255) NOT NULL,
      orderId VARCHAR(255) NOT NULL,
      orderNumber VARCHAR(255) NOT NULL,
      customerEmail VARCHAR(255) NOT NULL,
      customerPhone VARCHAR(255) NOT NULL,
      originalAmount DECIMAL(10,2) NOT NULL,
      discountAmount DECIMAL(10,2) NOT NULL,
      finalAmount DECIMAL(10,2) NOT NULL,
      status ENUM('RESERVED', 'COMPLETED', 'FAILED', 'RELEASED') NOT NULL DEFAULT 'RESERVED',
      reservedAt DATETIME NOT NULL,
      completedAt DATETIME NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      INDEX idx_redemptions_email (customerEmail),
      INDEX idx_redemptions_order (orderNumber),
      INDEX idx_redemptions_coupon_status (couponId, status),
      INDEX idx_redemptions_offer_status (offerId, status),
      CONSTRAINT fk_redemptions_offer FOREIGN KEY (offerId) REFERENCES offers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Verified coupon_redemptions table');

  // 6. Create payment_offer_details table
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS payment_offer_details (
      id VARCHAR(255) PRIMARY KEY,
      orderNumber VARCHAR(255) NOT NULL UNIQUE,
      offerId VARCHAR(255) NULL,
      couponCode VARCHAR(100) NULL,
      discountType VARCHAR(50) NOT NULL,
      discountValue DECIMAL(10,2) NOT NULL,
      originalAmount DECIMAL(10,2) NOT NULL,
      discountAmount DECIMAL(10,2) NOT NULL,
      finalAmount DECIMAL(10,2) NOT NULL,
      phonepeTxnId VARCHAR(255) NULL,
      settlementStatus VARCHAR(50) NOT NULL DEFAULT 'PENDING',
      auditNotes TEXT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      INDEX idx_pod_order (orderNumber),
      INDEX idx_pod_coupon (couponCode)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
  console.log('Verified payment_offer_details table');

  // 7. Seed initial promotional offers if table is empty
  const [existingOffers] = await conn.execute('SELECT COUNT(*) as count FROM offers');
  if (existingOffers[0].count === 0) {
    const now = new Date();
    const oneMonthLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const twoMonthsLater = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

    // Offer 1: WELCOME10 (10% off for all orders)
    const offer1Id = 'offer-welcome10';
    await conn.execute(`
      INSERT INTO offers (id, title, description, discountType, discountValue, maxDiscountAmount, minOrderValue, isAutomatic, customerEligibility, firstOrderOnly, totalUsageLimit, perCustomerLimit, usedCount, startDate, expiryDate, isActive, bannerText, createdAt, updatedAt)
      VALUES (?, ?, ?, 'PERCENTAGE', 10.00, 2000.00, 5000.00, 0, 'ALL', 0, 500, 1, 0, ?, ?, 1, 'Get 10% OFF on all solutions with code WELCOME10', NOW(), NOW())
    `, [offer1Id, 'Welcome Discount 10% Off', 'Special 10% discount across digital software solutions and turnkeys.', now, twoMonthsLater]);

    await conn.execute(`
      INSERT INTO coupons (id, offerId, code, totalUsageLimit, perCustomerLimit, usedCount, isActive, expiryDate, createdAt, updatedAt)
      VALUES ('coupon-welcome10', ?, 'WELCOME10', 500, 1, 0, 1, ?, NOW(), NOW())
    `, [offer1Id, twoMonthsLater]);

    // Offer 2: FIRSTORDER (Flat ₹1,500 off for first-time clients)
    const offer2Id = 'offer-firstorder';
    await conn.execute(`
      INSERT INTO offers (id, title, description, discountType, discountValue, maxDiscountAmount, minOrderValue, isAutomatic, customerEligibility, firstOrderOnly, totalUsageLimit, perCustomerLimit, usedCount, startDate, expiryDate, isActive, bannerText, createdAt, updatedAt)
      VALUES (?, ?, ?, 'FIXED', 1500.00, 1500.00, 9000.00, 0, 'NEW_CUSTOMERS', 1, 200, 1, 0, ?, ?, 1, 'First-Time Client Benefit: Flat ₹1,500 OFF with code FIRSTORDER', NOW(), NOW())
    `, [offer2Id, 'First Order Special Offer', 'Exclusive flat ₹1,500 discount for new business clients on their first project or license.', now, oneMonthLater]);

    await conn.execute(`
      INSERT INTO coupons (id, offerId, code, totalUsageLimit, perCustomerLimit, usedCount, isActive, expiryDate, createdAt, updatedAt)
      VALUES ('coupon-firstorder', ?, 'FIRSTORDER', 200, 1, 0, 1, ?, NOW(), NOW())
    `, [offer2Id, oneMonthLater]);

    // Offer 3: DIGITAL20 (20% off on Enterprise Agency Website)
    const offer3Id = 'offer-digital20';
    await conn.execute(`
      INSERT INTO offers (id, title, description, discountType, discountValue, maxDiscountAmount, minOrderValue, isAutomatic, customerEligibility, firstOrderOnly, totalUsageLimit, perCustomerLimit, usedCount, startDate, expiryDate, isActive, bannerText, createdAt, updatedAt)
      VALUES (?, ?, ?, 'PERCENTAGE', 20.00, 4000.00, 8000.00, 0, 'ALL', 0, 100, 1, 0, ?, ?, 1, 'Exclusive 20% OFF on Enterprise Agency Suite with code DIGITAL20', NOW(), NOW())
    `, [offer3Id, 'Agency Suite 20% Privilege', 'Exclusive 20% discount on Enterprise Agency Website & Inquiry CMS.', now, twoMonthsLater]);

    await conn.execute(`
      INSERT INTO coupons (id, offerId, code, totalUsageLimit, perCustomerLimit, usedCount, isActive, expiryDate, createdAt, updatedAt)
      VALUES ('coupon-digital20', ?, 'DIGITAL20', 100, 1, 0, 1, ?, NOW(), NOW())
    `, [offer3Id, twoMonthsLater]);

    await conn.execute(`
      INSERT INTO offer_service_mappings (id, offerId, productId, productTitle, createdAt, updatedAt)
      VALUES ('map-digital20-agency', ?, 'enterprise-agency-website-cms', 'Enterprise Agency Website & Inquiry CMS', NOW(), NOW())
    `, [offer3Id]);

    console.log('Seeded initial offers and coupons: WELCOME10, FIRSTORDER, DIGITAL20');
  }

  await conn.end();
  console.log('Migration completed successfully!');
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
