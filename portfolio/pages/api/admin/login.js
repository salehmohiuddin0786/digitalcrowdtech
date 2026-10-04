import { ADMIN_CREDENTIALS, createAdminToken } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email and password are required.' });
  }

  const inputEmail = String(email).trim().toLowerCase();
  const validEmail = ADMIN_CREDENTIALS.email.toLowerCase();

  if (inputEmail === validEmail && String(password).trim() === ADMIN_CREDENTIALS.password) {
    const token = createAdminToken(inputEmail);
    return res.status(200).json({
      ok: true,
      token,
      user: {
        email: inputEmail,
        role: 'admin',
        name: 'Digital Crowd Administrator',
      },
      message: 'Authentication successful.',
    });
  }

  return res.status(401).json({
    ok: false,
    message: 'Invalid administrator email or password.',
  });
}
