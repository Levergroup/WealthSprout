module.exports = async function handler(req, res) {
  const key = process.env.GETRESPONSE_API_KEY;
  if (!key) return res.status(500).json({ error: 'No API key set' });

  const r = await fetch('https://api.getresponse.com/v3/campaigns', {
    headers: { 'X-Auth-Token': `api-key ${key}` },
  });
  const data = await r.json();
  return res.status(200).json({ status: r.status, campaigns: data });
};
