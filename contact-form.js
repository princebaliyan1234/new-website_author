// contact-form.js
// Add this as a NEW file in your project root.
// Then add <script src="./contact-form.js"></script> at the bottom of contact.html
// (after main.js)

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn  = form.querySelector('button[type="submit"]');
    const btnOriginal = submitBtn.textContent;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            showBanner('error', 'Please fill in all fields.');
            return;
        }

        // Loading state
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled    = true;

        try {
            const res = await fetch('/api/contact', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ name, email, subject, message }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                showBanner('success', "Message sent! I'll get back to you soon ✨");
                form.reset();
            } else {
                showBanner('error', data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            showBanner('error', 'Network error. Please check your connection and try again.');
        } finally {
            submitBtn.textContent = btnOriginal;
            submitBtn.disabled    = false;
        }
    });
});

// ── Banner helper ─────────────────────────────────────────────────────────
function showBanner(type, text) {
    // Remove existing banner if any
    document.getElementById('sos-form-banner')?.remove();

    const banner = document.createElement('div');
    banner.id = 'sos-form-banner';

    const isSuccess = type === 'success';
    banner.style.cssText = `
        margin-top: 1rem;
        padding: 0.9rem 1.2rem;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 600;
        text-align: center;
        background: ${isSuccess ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.15)'};
        border: 1px solid ${isSuccess ? 'rgba(76,175,80,0.4)' : 'rgba(244,67,54,0.4)'};
        color: ${isSuccess ? '#4caf50' : '#f44336'};
        transition: opacity 0.4s ease;
    `;
    banner.textContent = text;

    const form = document.getElementById('contactForm');
    form.appendChild(banner);

    // Auto-remove after 6 seconds
    setTimeout(() => {
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 400);
    }, 6000);
}
