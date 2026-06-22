/* ─────────────────────────────────────
   NAV — scroll shadow
───────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 8);
    });
}

/* ─────────────────────────────────────
   NAV — mobile toggle
───────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll(':scope > li > a').forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }));
}

/* ─────────────────────────────────────
   NAV — Programs megadropdown (tap to open on mobile)
───────────────────────────────────── */
document.querySelectorAll('.nav-item-drop').forEach(item => {
    const label = item.querySelector('.nav-drop-label');
    if (!label) return;
    label.addEventListener('click', (e) => {
        if (window.innerWidth > 720) return;
        e.preventDefault();
        item.classList.toggle('open');
    });
});

/* ─────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(other => {
            other.classList.remove('open');
            other.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
            item.classList.add('open');
            a.style.maxHeight = a.scrollHeight + 'px';
        }
    });
});

/* ─────────────────────────────────────
   SUPABASE STUBS
   TODO: Replace with real Supabase project URL + anon key,
   e.g. via `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)` from
   the Supabase JS client, then insert into the named table below.
───────────────────────────────────── */
async function submitToSupabase(table, row) {
    // TODO: Wire up real Supabase client + insert call:
    // const { error } = await supabase.from(table).insert(row);
    // if (error) throw error;
    console.log(`[stub] would insert into "${table}":`, row);
    return Promise.resolve({ ok: true });
}

/* ─────────────────────────────────────
   RESEND STUB
   TODO: Resend's API key is secret and must never be called directly
   from browser JS. Wire this to a server endpoint / Edge Function
   (e.g. POST /api/send-welcome-email) that holds the key server-side
   and calls Resend from there, e.g.:
   // const res = await fetch('/api/send-welcome-email', {
   //     method: 'POST',
   //     headers: { 'Content-Type': 'application/json' },
   //     body: JSON.stringify(payload)
   // });
   // if (!res.ok) throw new Error('Failed to send welcome email');
───────────────────────────────────── */
async function submitToResend(payload) {
    console.log('[stub] would send welcome email via server endpoint:', payload);
    return Promise.resolve({ ok: true });
}

/* ─────────────────────────────────────
   GETRESPONSE INTEGRATION
   Calls a Netlify Function (netlify/functions/subscribe.js) so the
   GetResponse API key stays server-side instead of living in this file.
   Set GETRESPONSE_API_KEY in the Netlify dashboard (Site settings ->
   Environment variables), then replace each TODO list ID below with the
   real campaignId from GetResponse for that list.
───────────────────────────────────── */
const GETRESPONSE_LISTS = {
    KIT_STRIP: 'TODO_LIST_ID_KIT_STRIP', // homepage inline strip (#kitForm)
    WAITLIST: 'TODO_LIST_ID_WAITLIST',   // Money Lab waitlist (#waitlistForm)
    FREE_KIT: 'TODO_LIST_ID_FREE_KIT',   // /free-kit opt-in (#optinForm)
};

async function subscribeToGetResponse(email, listId) {
    const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listId }),
    });
    if (!res.ok) throw new Error(`GetResponse subscribe failed: ${res.status}`);
    return res.json();
}

/* ─────────────────────────────────────
   FREE KIT STRIP FORM (homepage inline strip)
───────────────────────────────────── */
const kitForm = document.getElementById('kitForm');
if (kitForm) {
    kitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = kitForm.querySelector('input').value;
        const btn = kitForm.querySelector('button');
        btn.disabled = true;
        await submitToSupabase('leads', { email, source: 'kit-strip' });
        try {
            await subscribeToGetResponse(email, GETRESPONSE_LISTS.KIT_STRIP);
        } catch (err) {
            console.error('subscribeToGetResponse failed:', err);
        }
        btn.textContent = 'Check Your Inbox!';
        kitForm.querySelector('input').value = '';
    });
}

/* ─────────────────────────────────────
   APP WAITLIST FORM (Money Lab teaser)
───────────────────────────────────── */
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = waitlistForm.querySelector('input');
        const btn = waitlistForm.querySelector('button');
        const msg = document.getElementById('waitlistMsg');
        const email = input.value;
        btn.disabled = true;
        btn.textContent = 'Joining...';
        // TODO: Replace with Supabase insert into `waitlist` table (columns: id, email, created_at)
        await submitToSupabase('waitlist', { email, created_at: new Date().toISOString() });
        try {
            await subscribeToGetResponse(email, GETRESPONSE_LISTS.WAITLIST);
        } catch (err) {
            console.error('subscribeToGetResponse failed:', err);
        }
        waitlistForm.style.display = 'none';
        if (msg) msg.classList.add('show');
    });
}

/* ─────────────────────────────────────
   COOKIE CONSENT — banner + preferences modal
   Stores choice in localStorage as `ws_cookie_consent`. Analytics/marketing
   scripts must call `window.wsHasConsent('analytics'|'marketing')` before
   loading — nothing is injected until the visitor has chosen.
───────────────────────────────────── */
(function initCookieConsent() {
    const STORAGE_KEY = 'ws_cookie_consent';

    function getConsent() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch {
            return null;
        }
    }

    function saveConsent(analytics, marketing) {
        const consent = { necessary: true, analytics, marketing, ts: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        document.dispatchEvent(new CustomEvent('ws-cookie-consent', { detail: consent }));
        return consent;
    }

    window.wsHasConsent = function (category) {
        const consent = getConsent();
        return !!(consent && consent[category]);
    };

    // TODO: hook real tracking snippets here, gated by consent:
    // if (window.wsHasConsent('analytics')) { /* load GA4 (gtag.js) */ }
    // if (window.wsHasConsent('marketing')) { /* load Meta Pixel */ }
    function applyConsent() {
        const consent = getConsent();
        if (!consent) return;
        if (consent.analytics) {
            // TODO: inject GA4 gtag.js snippet
        }
        if (consent.marketing) {
            // TODO: inject Meta Pixel snippet
        }
    }

    function injectMarkup() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div class="cookie-banner-inner">
                <p>We use cookies to improve your experience and to show you relevant content. We also use cookies for advertising and analytics. See our <a href="/cookie-policy">Cookie Policy</a> to learn more.</p>
                <div class="cookie-banner-btns">
                    <button type="button" class="btn-cookie-manage" id="cookieManageBtn">Manage Preferences</button>
                    <button type="button" class="btn-cookie-accept" id="cookieAcceptBtn">Accept All</button>
                </div>
            </div>`;

        const modal = document.createElement('div');
        modal.className = 'cookie-modal';
        modal.id = 'cookieModal';
        modal.innerHTML = `
            <div class="cookie-modal-box">
                <button type="button" class="cookie-modal-close" id="cookieModalClose" aria-label="Close">&times;</button>
                <h3>Cookie Preferences</h3>
                <p>Choose which cookies you're okay with. Strictly necessary cookies keep the site and checkout working and can't be turned off.</p>
                <div class="cookie-modal-row">
                    <div><h5>Strictly Necessary</h5><p>Session, login, and Stripe checkout. Always on.</p></div>
                    <span class="cookie-toggle-locked">Always On</span>
                </div>
                <div class="cookie-modal-row">
                    <div><h5>Analytics</h5><p>Helps us understand how visitors use the site (Google Analytics).</p></div>
                    <label class="cookie-switch"><input type="checkbox" id="cookieAnalyticsToggle"><span class="cookie-switch-slider"></span></label>
                </div>
                <div class="cookie-modal-row">
                    <div><h5>Marketing</h5><p>Used for ad targeting and retargeting on Google &amp; Meta.</p></div>
                    <label class="cookie-switch"><input type="checkbox" id="cookieMarketingToggle"><span class="cookie-switch-slider"></span></label>
                </div>
                <div class="cookie-modal-btns">
                    <button type="button" class="btn-cookie-manage" id="cookieModalCancel">Cancel</button>
                    <button type="button" class="btn-cookie-accept" id="cookieModalSave">Save Preferences</button>
                </div>
            </div>`;

        document.body.appendChild(banner);
        document.body.appendChild(modal);
        return { banner, modal };
    }

    function run() {
        const existing = getConsent();
        const { banner, modal } = injectMarkup();
        const analyticsToggle = document.getElementById('cookieAnalyticsToggle');
        const marketingToggle = document.getElementById('cookieMarketingToggle');

        function openModal() {
            const consent = getConsent();
            analyticsToggle.checked = !!(consent && consent.analytics);
            marketingToggle.checked = !!(consent && consent.marketing);
            modal.classList.add('show');
        }
        function closeModal() { modal.classList.remove('show'); }
        function hideBanner() { banner.classList.remove('show'); }

        if (!existing) {
            banner.classList.add('show');
        }

        document.getElementById('cookieAcceptBtn').addEventListener('click', () => {
            saveConsent(true, true);
            hideBanner();
            applyConsent();
        });
        document.getElementById('cookieManageBtn').addEventListener('click', openModal);
        document.getElementById('cookieModalClose').addEventListener('click', closeModal);
        document.getElementById('cookieModalCancel').addEventListener('click', closeModal);
        document.getElementById('cookieModalSave').addEventListener('click', () => {
            saveConsent(analyticsToggle.checked, marketingToggle.checked);
            closeModal();
            hideBanner();
            applyConsent();
        });

        applyConsent();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();

/* ─────────────────────────────────────
   FREE KIT OPT-IN FORM (/free-kit)
───────────────────────────────────── */
const optinForm = document.getElementById('optinForm');
if (optinForm) {
    const optinInput = document.getElementById('optinEmail');
    const optinError = document.getElementById('optinError');
    const optinBtn = document.getElementById('optinSubmit');
    const optinBtnLabel = optinBtn.querySelector('.fk-btn-label');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    optinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = optinInput.value.trim();

        if (!email || !emailPattern.test(email)) {
            optinError.classList.add('show');
            return;
        }
        optinError.classList.remove('show');

        optinBtn.disabled = true;
        optinBtn.classList.add('loading');
        optinBtnLabel.textContent = 'Sending...';

        try {
            // TODO: Replace with Supabase insert into `leads` table (columns: id, email, source: 'free-kit', created_at)
            await submitToSupabase('leads', { email, source: 'free-kit', created_at: new Date().toISOString() });
        } catch (err) {
            console.error('submitToSupabase failed:', err);
        }

        try {
            // TODO: Replace with real welcome email trigger (subject "Your Free Money Kit is Here 🌱", placeholder PDF URL)
            await submitToResend({ email, subject: 'Your Free Money Kit is Here 🌱' });
        } catch (err) {
            console.error('submitToResend failed:', err);
        }

        try {
            await subscribeToGetResponse(email, GETRESPONSE_LISTS.FREE_KIT);
        } catch (err) {
            console.error('subscribeToGetResponse failed:', err);
        }

        localStorage.setItem('ws_email', email);
        window.location.href = `/free-kit/thank-you?email=${encodeURIComponent(email)}`;
    });
}
