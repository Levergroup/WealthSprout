export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const GETRESPONSE_API_KEY = process.env.GETRESPONSE_API_KEY;
    const GETRESPONSE_LIST_ID = process.env.GETRESPONSE_LIST_ID || 'KKOGG';

    const grResponse = await fetch('https://api.getresponse.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `api-key ${GETRESPONSE_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        campaign: { campaignId: GETRESPONSE_LIST_ID },
      }),
    });

    const success = grResponse.status === 202 || grResponse.status === 409;

    if (!success) {
      const errorText = await grResponse.text();
      console.error('GetResponse error:', grResponse.status, errorText);
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

  } catch (err) {
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
