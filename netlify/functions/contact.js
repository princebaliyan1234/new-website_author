// netlify/functions/contact.js
// This runs server-side — your secret keys are NEVER exposed to the browser

export default async (request) => {
    // Only allow POST
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const SUPABASE_URL    = process.env.SUPABASE_URL;
    const SUPABASE_ANON   = process.env.SUPABASE_ANON_KEY;
    const RESEND_API_KEY  = process.env.RESEND_API_KEY;
    const YOUR_EMAIL      = process.env.YOUR_EMAIL; // the email you want to RECEIVE at

    // ── 1. Save to Supabase ───────────────────────────────────────────────
    const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
            'Content-Type':  'application/json',
            'apikey':         SUPABASE_ANON,
            'Authorization': `Bearer ${SUPABASE_ANON}`,
            'Prefer':        'return=minimal',
        },
        body: JSON.stringify({ name, email, subject, message }),
    });

    if (!supabaseRes.ok) {
        const err = await supabaseRes.text();
        console.error('Supabase error:', err);
        return new Response(JSON.stringify({ error: 'Failed to save submission.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // ── 2. Send email via Resend ──────────────────────────────────────────
    const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from:    'Contact Form <onboarding@resend.dev>', // free tier sender — works without a custom domain
            to:      [YOUR_EMAIL],
            reply_to: email,
            subject: `[SOS Contact] ${subject} — from ${name}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#ffffff;border-radius:12px;">
                    <h2 style="color:#ff6b35;margin-bottom:4px;">New Contact Form Submission</h2>
                    <p style="color:#888;font-size:13px;margin-top:0;">Silence of Scribes — silenceofscribes.com</p>
                    <hr style="border:1px solid #222;margin:20px 0;">
                    <table style="width:100%;border-collapse:collapse;">
                        <tr>
                            <td style="padding:10px 0;color:#888;font-size:13px;width:80px;">Name</td>
                            <td style="padding:10px 0;color:#fff;font-weight:600;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding:10px 0;color:#888;font-size:13px;">Email</td>
                            <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#ff6b35;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding:10px 0;color:#888;font-size:13px;">Subject</td>
                            <td style="padding:10px 0;color:#fff;">${subject}</td>
                        </tr>
                    </table>
                    <hr style="border:1px solid #222;margin:20px 0;">
                    <p style="color:#888;font-size:13px;margin-bottom:8px;">Message</p>
                    <p style="color:#fff;line-height:1.7;white-space:pre-wrap;">${message}</p>
                    <hr style="border:1px solid #222;margin:20px 0;">
                    <p style="color:#555;font-size:12px;">Hit Reply to respond directly to ${name}.</p>
                </div>
            `,
        }),
    });

    if (!resendRes.ok) {
        const err = await resendRes.text();
        console.error('Resend error:', err);
        // Submission was saved to DB — just email failed. Still return success to user.
        // You'll still see it in Supabase.
        console.warn('Email failed but DB save succeeded.');
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const config = {
    path: '/api/contact',
};
