import { getAllQueries, updateQueryStatus, deleteQuery, verifyAdminToken } from '@/lib/db';

function getAuthToken(req) {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return req.headers['x-admin-token'] || req.query.token || '';
}

export default async function handler(req, res) {
  const token = getAuthToken(req);
  const admin = verifyAdminToken(token);

  if (!admin) {
    return res.status(401).json({
      ok: false,
      message: 'Unauthorized access. Please log in as administrator.',
    });
  }

  // GET: Fetch all queries
  if (req.method === 'GET') {
    try {
      const items = getAllQueries();
      return res.status(200).json({
        ok: true,
        items,
        count: items.length,
      });
    } catch (err) {
      return res.status(500).json({ ok: false, message: 'Failed to retrieve queries' });
    }
  }

  // PATCH: Update status
  if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body || {};
      if (!id || !status) {
        return res.status(400).json({ ok: false, message: 'Query ID and new status are required.' });
      }

      const updated = updateQueryStatus(id, status);
      if (!updated) {
        return res.status(404).json({ ok: false, message: 'Query not found.' });
      }

      return res.status(200).json({
        ok: true,
        item: updated,
        message: 'Status updated successfully.',
      });
    } catch (err) {
      return res.status(500).json({ ok: false, message: 'Failed to update query status' });
    }
  }

  // DELETE: Remove query
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id || req.body?.id;
      if (!id) {
        return res.status(400).json({ ok: false, message: 'Query ID is required.' });
      }

      const deleted = deleteQuery(id);
      if (!deleted) {
        return res.status(404).json({ ok: false, message: 'Query not found or already deleted.' });
      }

      return res.status(200).json({
        ok: true,
        message: 'Query deleted successfully.',
      });
    } catch (err) {
      return res.status(500).json({ ok: false, message: 'Failed to delete query' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
  return res.status(405).json({ ok: false, message: 'Method not allowed' });
}
