// Server-side proxy for GetResponse contact creation.
// Exists so GETRESPONSE_API_KEY never has to be embedded in client-side JS
// (anyone could read it out of the page source otherwise).
// Set GETRESPONSE_API_KEY in the Netlify dashboard: Site settings -> Environment variables.

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const apiKey = process.env.GETRESPONSE_API_KEY;
    if (!apiKey) {
        console.error('GETRESPONSE_API_KEY is not set');
        return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured' }) };
    }

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const { email, listId, tagIds } = payload;
    if (!email || !listId) {
        return { statusCode: 400, body: JSON.stringify({ error: 'email and listId are required' }) };
    }

    const body = {
        email,
        campaign: { campaignId: listId },
        ...(Array.isArray(tagIds) && tagIds.length ? { tags: tagIds } : {}),
    };

    try {
        const res = await fetch('https://api.getresponse.com/v3/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': `api-key ${apiKey}`,
            },
            body: JSON.stringify(body),
        });

        // GetResponse returns 202 Accepted when a contact is queued successfully.
        // A given email can only be added once per list - treat a 409 conflict
        // (already subscribed) as success too, since the goal is just "are they
        // on the list", not a strict create.
        if (res.status === 202 || res.status === 409) {
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        const errText = await res.text();
        console.error('GetResponse subscribe failed:', res.status, errText);
        return { statusCode: 502, body: JSON.stringify({ error: 'GetResponse request failed' }) };
    } catch (err) {
        console.error('GetResponse subscribe error:', err);
        return { statusCode: 502, body: JSON.stringify({ error: 'GetResponse request failed' }) };
    }
};
