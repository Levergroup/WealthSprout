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
    navLinks.querySelectorAll(':scope > li > a:not(.nav-drop-label)').forEach(link => link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }));
}

/* ─────────────────────────────────────
   NAV — Programs megadropdown
   Desktop: hover-intent with a short close delay, so moving the
   cursor from the label down into the panel (crossing the gap
   between them) doesn't close it before it's reached.
   Mobile: tap the label to toggle.
───────────────────────────────────── */
document.querySelectorAll('.nav-item-drop').forEach(item => {
    const label = item.querySelector('.nav-drop-label');
    if (!label) return;
    let closeTimer = null;
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 720) return;
        clearTimeout(closeTimer);
        item.classList.add('open');
    });
    item.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 720) return;
        closeTimer = setTimeout(() => item.classList.remove('open'), 250);
    });
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
   PRODUCT PAGE — hero personalization
   Reads ?from=quiz&concern=... and swaps the hero headline on any
   page whose H1 carries [data-hero-headline]. Concern copy is the
   same across every product page, so it lives here once rather than
   being redeclared per page.
───────────────────────────────────── */
(function personalizeHero() {
    const CONCERN_HEADLINES = {
        saving: "You said they have no concept of saving. Here's where that changes.",
        generational: "You're breaking a cycle. This is the first step.",
        investing: "They're ready to learn how money actually grows. Let's go.",
        credit: "Credit mistakes happen young. Here's how to get ahead of them.",
        business: "The entrepreneurial instinct is there. Now give it direction.",
    };
    const headline = document.querySelector('[data-hero-headline]');
    if (!headline) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') !== 'quiz') return;
    const override = CONCERN_HEADLINES[params.get('concern')];
    if (override) headline.textContent = override;
})();

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
    KIT_STRIP: 'TODO_LIST_ID_KIT_STRIP',             // homepage inline strip (#kitForm)
    WAITLIST: 'TODO_LIST_ID_WAITLIST',               // Money Lab waitlist (#waitlistForm)
    FREE_KIT: 'KKOGG',                               // /free-kit opt-in (#optinForm)
    VAULT_PRICE_WATCH: 'TODO_LIST_ID_VAULT_PRICE_WATCH', // Family Collection price-increase notify (#vaultNotifyForm)
};

// Tag IDs (not list IDs) applied alongside a list on subscribe, e.g. to
// segment "didn't buy yet, wants a heads-up" leads. Replace with the real
// tag ID from GetResponse once the tag below has been created there.
const GETRESPONSE_TAGS = {
    VAULT_PRICE_WATCH: ['TODO_TAG_ID_VAULT_PRICE_INCREASE'], // tag: waitlist:vault-price-increase
};

async function subscribeToGetResponse(email, listId, tagIds) {
    const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listId, ...(tagIds ? { tagIds } : {}) }),
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
   VAULT PRICE-INCREASE NOTIFY FORM (Family Collection page)
───────────────────────────────────── */
const vaultNotifyForm = document.getElementById('vaultNotifyForm');
if (vaultNotifyForm) {
    vaultNotifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = vaultNotifyForm.querySelector('input');
        const btn = vaultNotifyForm.querySelector('button');
        const msg = document.getElementById('vaultNotifyMsg');
        const email = input.value;
        btn.disabled = true;
        btn.textContent = 'Joining...';
        // TODO: Replace with Supabase insert into `waitlist` table (columns: id, email, source, created_at)
        await submitToSupabase('waitlist', { email, source: 'vault-price-increase', created_at: new Date().toISOString() });
        try {
            await subscribeToGetResponse(email, GETRESPONSE_LISTS.VAULT_PRICE_WATCH, GETRESPONSE_TAGS.VAULT_PRICE_WATCH);
        } catch (err) {
            console.error('subscribeToGetResponse failed:', err);
        }
        vaultNotifyForm.style.display = 'none';
        if (msg) msg.classList.add('show');
    });
}

/* ─────────────────────────────────────
   PRODUCT MATCH QUIZ
   4-question quiz that matches a parent's child to the right
   WealthSprout product. Mounts into any [data-quiz-root] element
   found on the page (homepage + free-kit thank-you page). Result
   links reuse the ?from=quiz&concern=&outcome= params that
   personalizeHero() above already reads, so the destination
   product page's hero adapts too.
───────────────────────────────────── */
(function initMatchQuiz() {
    const roots = document.querySelectorAll('[data-quiz-root]');
    if (!roots.length) return;

    const QUESTIONS = [
        {
            id: 'age',
            eyebrow: 'Question 1 of 4',
            question: "How old is your child?",
            subtext: "We'll match you to the right level — no guessing.",
            options: [
                { label: '5–8 years old', value: '5-8', icon: '🌱' },
                { label: '9–12 years old', value: '9-12', icon: '🌿' },
                { label: '13–15 years old', value: '13-15', icon: '🌳' },
                { label: '16–18 years old', value: '16-18', icon: '🚀' },
                { label: 'Multiple kids, different ages', value: 'multi', icon: '👨‍👩‍👧‍👦' },
            ],
        },
        {
            id: 'concern',
            eyebrow: 'Question 2 of 4',
            question: "What's your biggest money worry for your child?",
            subtext: 'Pick the one that hits closest to home.',
            options: [
                { label: 'They have no concept of saving', value: 'saving', icon: '🐷' },
                { label: "They don't understand where money comes from", value: 'earning', icon: '💡' },
                { label: "They're almost an adult with zero financial skills", value: 'adulting', icon: '⏰' },
                { label: 'I want them investing before they leave home', value: 'investing', icon: '📈' },
                { label: 'I want to break generational money patterns', value: 'generational', icon: '🔄' },
            ],
        },
        {
            id: 'knowledge',
            eyebrow: 'Question 3 of 4',
            question: 'Where is your child right now with money?',
            subtext: "Be honest — there's no wrong answer here.",
            options: [
                { label: "We haven't really talked about it yet", value: 'none', icon: '🤷' },
                { label: 'They know save/spend but nothing deeper', value: 'basic', icon: '💰' },
                { label: 'They get budgeting but not investing', value: 'intermediate', icon: '📊' },
                { label: "They've heard of stocks/credit but don't get it", value: 'advanced', icon: '🎯' },
            ],
        },
        {
            id: 'outcome',
            eyebrow: 'Question 4 of 4',
            question: 'What does success look like to you?',
            subtext: 'What would genuinely make you proud?',
            options: [
                { label: 'My child has a savings habit and loves money', value: 'habits', icon: '⭐' },
                { label: 'My child can budget and has a business idea', value: 'business', icon: '💼' },
                { label: 'My child understands investing and has a plan', value: 'plan', icon: '🗺️' },
                { label: 'My child graduates ready to manage real money', value: 'ready', icon: '🎓' },
            ],
        },
    ];

    const FREE_KIT_URL = '/free-kit';
    const FREE_KIT_CHECKS = [
        'The 3-Jar System (Spend · Save · Give) with jar labels',
        'Weekly Earning Tracker — chores to cash',
        'My First Savings Goal worksheet',
        'Parent Quick-Start Guide — set up in one weekend',
    ];

    const RESULTS = {
        multi: {
            product: 'The WealthSprout Family Collection',
            subtitle: 'All 4 age tiers in one bundle',
            price: '$67',
            cover: '🏆',
            description: "You've got kids across multiple ages — and this is built for exactly that. Every concept, every tier, one complete family financial education.",
            includes: [
                'All 4 workbooks covering ages 5–18',
                'Family Money Conversation Guide (20 pages)',
                'Age-by-age scripts for money conversations',
                'Monthly Money Date template',
            ],
            kitBridge: 'Not ready to commit to the full bundle? Start your family off with the Free Money Kit — the same 3-Jar System that kicks off every tier.',
            url: '/programs/vault',
        },
        '5-8': {
            product: 'Money Seeds',
            subtitle: "A Kid's First Financial Playbook · Ages 5–8",
            price: '$17',
            cover: '🌱',
            description: '40 illustrated pages that turn money from a mystery into a superpower — built for little hands, big curiosity, and one unforgettable weekend together.',
            includes: [
                'The 3-Jar System (Spend, Save, Give) in depth',
                'My Savings Goal Adventure visual tracker',
                'Needs vs. Wants sorting activities',
                'Illustrated chapter guide + certificate of completion',
            ],
            kitBridge: 'The Free Money Kit is the perfect first step — it introduces the exact 3-Jar System your child will use inside Money Seeds.',
            url: '/money-seeds',
        },
        '9-12': {
            product: 'Money Moves',
            subtitle: "The Smart Kid's Guide to Building Wealth · Ages 9–12",
            price: '$24',
            cover: '💡',
            description: "52 pages covering compound interest, banking, micro-business, and real investing — for the kid who's already asked how the stock market works.",
            includes: [
                'Compound interest math with real exercises',
                'How to start a micro-business (lemonade stand → Etsy)',
                'Paper portfolio stock market exercise',
                '30 / 90 / 365-day goal ladder',
            ],
            kitBridge: 'Start with the Free Money Kit to get the savings foundation in place — then Money Moves takes it to the next level.',
            url: '/money-moves',
        },
        '13-15': {
            product: 'Wealth Blueprint',
            subtitle: "A Teen's Guide to Investing, Business & Real Money · Ages 13–15",
            price: '$29',
            cover: '📈',
            description: '60 pages that treat your teen like the intelligent person they are. Stocks, ETFs, Roth IRAs, side hustles, and a real 5-year wealth roadmap.',
            includes: [
                'How to open a custodial brokerage account (step-by-step)',
                'Roth IRA for Teens — why starting at 14 is a superpower',
                'Side hustle playbook: freelancing, reselling, content',
                '5-year money roadmap: from now to young adult',
            ],
            kitBridge: "Grab the Free Money Kit to start the conversation — it's designed for parents and kids to go through together, just like Wealth Blueprint.",
            url: '/programs/wealth-blueprint',
        },
        '16-18': {
            product: 'Launch Rich',
            subtitle: "The High Schooler's Complete Money Playbook · Ages 16–18",
            price: '$34',
            cover: '🚀',
            description: '70 pages. First paycheck decoded. Credit built before they need it. Roth IRA opened. College debt explained. Everything before they leave home.',
            includes: [
                'Your first paycheck decoded (taxes, withholding, take-home)',
                'Credit 101 — build it before you ever need it',
                'Roth IRA step-by-step with real brokerage comparisons',
                '10-year wealth roadmap: age 17 to 27',
            ],
            kitBridge: 'While your teen dives into Launch Rich, the Free Money Kit is a great starting point to kick off the money conversation at home.',
            url: '/programs/launch-rich',
        },
    };

    function getResult(answers) {
        return RESULTS[answers.age] || RESULTS['16-18'];
    }

    function buildProductUrl(baseUrl, answers) {
        const params = new URLSearchParams({ from: 'quiz' });
        if (answers.concern) params.set('concern', answers.concern);
        if (answers.outcome) params.set('outcome', answers.outcome);
        return `${baseUrl}?${params.toString()}`;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderIncludeList(items, checkChar) {
        return items.map(item => `
            <div class="quiz-include-item"><span>${checkChar}</span><span>${escapeHtml(item)}</span></div>`).join('');
    }

    function renderIntro() {
        return `
            <div class="quiz-intro">
                <div class="quiz-intro-banner">
                    <span class="eyebrow eyebrow-gold">Free · 60 Seconds</span>
                    <h2>Find the Right Program for Your Child</h2>
                    <p>4 quick questions. Instant result. We'll match your child to the exact WealthSprout product built for their age and level — plus a free starter kit.</p>
                </div>
                <div class="quiz-perks">
                    <span>⏱️ Takes 60 seconds</span>
                    <span>🎯 Matched to your child's exact age &amp; level</span>
                    <span>🎁 Free kit unlocked with every result</span>
                </div>
                <button type="button" class="btn btn-gold btn-block quiz-start" data-action="start">Find My Child's Match →</button>
                <p class="quiz-fine">Taken by 3,400+ parents · No email required to see your result</p>
            </div>`;
    }

    function renderQuestion(q, index, total, selected) {
        const options = q.options.map(opt => `
            <button type="button" class="quiz-option${selected === opt.value ? ' selected' : ''}" data-action="select" data-value="${escapeHtml(opt.value)}">
                <span class="quiz-opt-icon">${opt.icon}</span>
                <span class="quiz-opt-label">${escapeHtml(opt.label)}</span>
                <span class="quiz-opt-check">✓</span>
            </button>`).join('');

        return `
            <div class="quiz-question">
                <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${(index / total) * 100}%"></div></div>
                <span class="eyebrow eyebrow-gold">${q.eyebrow}</span>
                <h2>${escapeHtml(q.question)}</h2>
                <p class="quiz-subtext">${escapeHtml(q.subtext)}</p>
                <div class="quiz-options">${options}</div>
                <button type="button" class="btn btn-green btn-block quiz-next" data-action="next"${selected ? '' : ' disabled'}>${index === total ? 'See My Result →' : 'Next →'}</button>
            </div>`;
    }

    function renderResult(result, answers) {
        return `
            <div class="quiz-result">
                <div class="quiz-result-header">
                    <span class="eyebrow eyebrow-gold">Your Personalized Match</span>
                    <div class="quiz-result-title">
                        <span class="quiz-result-cover">${result.cover}</span>
                        <div>
                            <h2>${escapeHtml(result.product)}</h2>
                            <p>${escapeHtml(result.subtitle)}</p>
                        </div>
                    </div>
                    <p class="quiz-result-desc">${escapeHtml(result.description)}</p>
                </div>

                <div class="quiz-includes">
                    <p class="quiz-includes-label">What's Inside</p>
                    <div class="quiz-include-list">${renderIncludeList(result.includes, '✦')}</div>
                </div>

                <div class="quiz-divider"><span>Start here — it's free</span></div>

                <div class="quiz-freekit">
                    <div class="quiz-freekit-head">
                        <span class="quiz-freekit-icon">🎁</span>
                        <div>
                            <p class="quiz-freekit-name">My First Money Kit</p>
                            <p class="quiz-freekit-meta">12-page printable PDF · Instant download</p>
                        </div>
                        <span class="quiz-freekit-badge">Free</span>
                    </div>
                    <p class="quiz-freekit-bridge">${escapeHtml(result.kitBridge)}</p>
                    <div class="quiz-include-list">${renderIncludeList(FREE_KIT_CHECKS, '✓')}</div>
                    <a href="${FREE_KIT_URL}" class="btn btn-gold btn-block">Grab the Free Kit — $0 →</a>
                </div>

                <div class="quiz-paid">
                    <div class="quiz-paid-head">
                        <p class="quiz-paid-name">${escapeHtml(result.product)}</p>
                        <span class="quiz-paid-price">${result.price}</span>
                    </div>
                    <p class="quiz-paid-sub">Ready to go deeper? This is your child's complete curriculum — not a preview.</p>
                    <a href="${buildProductUrl(result.url, answers)}" class="btn btn-outline btn-block">Get ${escapeHtml(result.product)} — ${result.price} →</a>
                </div>

                <p class="quiz-guarantee">Instant PDF download · 30-day money-back guarantee</p>
                <button type="button" class="quiz-restart" data-action="restart">↺ Retake the quiz</button>
            </div>`;
    }

    function initQuiz(root) {
        const totalQuestions = QUESTIONS.length;
        let step = 0;
        let answers = {};
        let currentSelection = null;

        function render() {
            if (step === 0) {
                root.innerHTML = renderIntro();
            } else if (step <= totalQuestions) {
                root.innerHTML = renderQuestion(QUESTIONS[step - 1], step, totalQuestions, currentSelection);
            } else {
                root.innerHTML = renderResult(getResult(answers), answers);
            }
        }

        root.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const action = btn.dataset.action;

            if (action === 'start') {
                step = 1;
                render();
            } else if (action === 'select') {
                currentSelection = btn.dataset.value;
                render();
            } else if (action === 'next') {
                if (!currentSelection) return;
                const q = QUESTIONS[step - 1];
                answers = { ...answers, [q.id]: currentSelection };
                currentSelection = null;
                step += 1;
                render();
            } else if (action === 'restart') {
                step = 0;
                answers = {};
                currentSelection = null;
                render();
            }
        });

        render();
    }

    roots.forEach(initQuiz);
})();

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
