import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const QUERIES_FILE = path.join(DATA_DIR, 'queries.json');

// Ensure data folder and file exists
function ensureQueriesFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(QUERIES_FILE)) {
    const initialSeed = [
      {
        id: 'query-sample-1',
        name: 'Rajesh Kumar',
        company: 'Kumar Logistics Hyderabad',
        email: 'rajesh@kumarlogistics.in',
        phone: '+91 98490 12345',
        projectType: 'ERP',
        budget: '₹75,000 – ₹1,50,000',
        message: 'Looking for a custom logistics ERP to track fleet dispatch, driver trip sheets, and customer invoicing with automated reports.',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'query-sample-2',
        name: 'Sunita Reddy',
        company: 'Vedic Academy Hyderabad',
        email: 'admin@vedicacademy.edu.in',
        phone: '+91 94401 98765',
        projectType: 'School Management System',
        budget: 'Under ₹25,000',
        message: 'Interested in the School Management System license. We need student enrollment, parent SMS notices, and fee receipts for 600 students.',
        status: 'Contacted',
        createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
      },
    ];
    fs.writeFileSync(QUERIES_FILE, JSON.stringify(initialSeed, null, 2), 'utf-8');
  }
}

export function getAllQueries() {
  ensureQueriesFile();
  try {
    const raw = fs.readFileSync(QUERIES_FILE, 'utf-8');
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items : [];
  } catch (err) {
    console.error('Error reading queries:', err);
    return [];
  }
}

export function saveNewQuery(queryData) {
  ensureQueriesFile();
  const queries = getAllQueries();

  const newEntry = {
    id: `query-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    name: String(queryData.name || '').trim(),
    company: String(queryData.company || '').trim(),
    email: String(queryData.email || '').trim().toLowerCase(),
    phone: String(queryData.phone || '').trim(),
    projectType: String(queryData.projectType || 'Custom Software').trim(),
    budget: String(queryData.budget || 'Not specified').trim(),
    message: String(queryData.message || '').trim(),
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  queries.unshift(newEntry);
  fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), 'utf-8');

  // Also mirror to Digital directory data if it exists
  try {
    const altDir = path.resolve('G:', 'Usama', 'Usama', 'Digital', 'digitalcrowdtech', 'Backend', 'data');
    if (fs.existsSync(altDir)) {
      const altFile = path.join(altDir, 'queries.json');
      fs.writeFileSync(altFile, JSON.stringify(queries, null, 2), 'utf-8');
    }
  } catch {}

  return newEntry;
}

export function updateQueryStatus(id, newStatus) {
  ensureQueriesFile();
  const queries = getAllQueries();
  const index = queries.findIndex((q) => q.id === id);
  if (index === -1) return null;

  queries[index].status = newStatus;
  queries[index].updatedAt = new Date().toISOString();
  fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), 'utf-8');
  return queries[index];
}

export function deleteQuery(id) {
  ensureQueriesFile();
  let queries = getAllQueries();
  const beforeCount = queries.length;
  queries = queries.filter((q) => q.id !== id);
  if (queries.length === beforeCount) return false;

  fs.writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2), 'utf-8');
  return true;
}

// Simple secure admin token auth
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'dct_admin_production_key_hyderabad_2026';
export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@digitalcrowdtech.in',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

export function createAdminToken(email) {
  const payload = {
    email,
    role: 'admin',
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24h
  };
  const jsonStr = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(jsonStr).digest('hex');
  return Buffer.from(jsonStr).toString('base64') + '.' + signature;
}

export function verifyAdminToken(token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  try {
    const jsonStr = Buffer.from(parts[0], 'base64').toString('utf-8');
    const expectedSig = crypto.createHmac('sha256', ADMIN_SECRET).update(jsonStr).digest('hex');
    if (expectedSig !== parts[1]) return false;

    const payload = JSON.parse(jsonStr);
    if (payload.exp < Date.now()) return false;
    return payload;
  } catch {
    return false;
  }
}
