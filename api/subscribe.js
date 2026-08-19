module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = req.body?.email?.trim().toLowerCase();
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const GETRESPONSE_API_KEY = process.env.GETRESPONSE_API_KEY;
  const GETRESPONSE_LIST_ID = process.env.GETRESPONSE_LIST_ID || 'KKOGG';

  try {
    const grResponse = await fetch('https://api.getresponse.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `api-key ${GETRESPONSE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        campaign: { campaignId: GETRESPONSE_LIST_ID },
      }),
    });

    const success = grResponse.status === 202 || grResponse.status === 409;
    if (!success) {
      const errorText = await grResponse.text();
      console.error('GetResponse error:', grResponse.status, errorText);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
