import { saveNewQuery } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const { fullName, name, company, email, phone, projectType, budget, message } = req.body || {};

    const clientName = (fullName || name || '').trim();
    if (!clientName) {
      return res.status(400).json({ ok: false, message: 'Please enter your full name.' });
    }

    const clientEmail = (email || '').trim().toLowerCase();
    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      return res.status(400).json({ ok: false, message: 'Please enter a valid email address.' });
    }

    const clientMessage = (message || '').trim();
    if (!clientMessage || clientMessage.length < 5) {
      return res.status(400).json({ ok: false, message: 'Please describe your project or requirements.' });
    }

    // 1. Forward to the unified backend on port 5001 so it appears in the main website admin panel
    try {
      const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const backendRes = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: clientName,
          company: (company || '').trim(),
          email: clientEmail,
          phone: (phone || '').trim(),
          projectType: (projectType || 'Custom Software').trim(),
          budget: (budget || 'Not specified').trim(),
          message: clientMessage,
          source: 'Portfolio',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        return res.status(200).json({
          ok: true,
          queryId: backendData.queryId,
          message: backendData.message || 'Thank you! Your project request has been logged.',
        });
      }
    } catch (forwardErr) {
      console.warn('Forwarding to backend failed, saving locally:', forwardErr.message);
    }

    // 2. Fallback to local storage
    const saved = saveNewQuery({
      name: clientName,
      company: (company || '').trim(),
      email: clientEmail,
      phone: (phone || '').trim(),
      projectType: (projectType || 'Custom Software').trim(),
      budget: (budget || 'Not specified').trim(),
      message: clientMessage,
      source: 'Portfolio',
    });

    return res.status(200).json({
      ok: true,
      queryId: saved.id,
      message: 'Thank you! Your project request has been logged. An engineer will get in touch shortly.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Unable to process your request at this moment. Please contact us directly at support@digitalcrowdtech.in',
    });
  }
}
