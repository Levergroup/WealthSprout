module.exports = async function handler(req, res) {
  console.log('[subscribe] invoked method=', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = req.body?.email?.trim().toLowerCase();
  console.log('[subscribe] email=', email);
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const GETRESPONSE_API_KEY = process.env.GETRESPONSE_API_KEY;
  if (!GETRESPONSE_API_KEY) {
    console.error('[subscribe] GETRESPONSE_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }
  console.log('[subscribe] API key present, length=', GETRESPONSE_API_KEY.length);

  // Use listId from request body; fall back to env var; then hardcoded default
  const listId = req.body?.listId || process.env.GETRESPONSE_LIST_ID || 'KKOGG';
  console.log('[subscribe] listId=', listId);
  const tagIds = req.body?.tagIds;

  const contact = {
    email,
    campaign: { campaignId: listId },
  };
  if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
    contact.tags = tagIds.map(id => ({ tagId: id }));
  }

  try {
    const grResponse = await fetch('https://api.getresponse.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `api-key ${GETRESPONSE_API_KEY}`,
      },
      body: JSON.stringify(contact),
    });

    console.log('[subscribe] GR status=', grResponse.status);

    if (grResponse.status === 202 || grResponse.status === 409) {
      console.log('[subscribe] success');
      return res.status(200).json({ success: true });
    }

    const errorBody = await grResponse.text();
    console.error('[subscribe] GR error:', grResponse.status, errorBody);
    return res.status(500).json({ error: 'Failed to subscribe', detail: errorBody });
  } catch (err) {
    console.error('[subscribe] fetch error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
