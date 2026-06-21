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
        waitlistForm.style.display = 'none';
        if (msg) msg.classList.add('show');
    });
}

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

        localStorage.setItem('ws_email', email);
        window.location.href = `/free-kit/thank-you?email=${encodeURIComponent(email)}`;
    });
}
