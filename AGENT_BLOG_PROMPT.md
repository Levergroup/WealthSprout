# WealthSprout Blog Publishing Prompt

Use this prompt every time you publish a new blog post to the WealthSprout repo.

---

## Your job

Write and publish a complete, SEO-optimised blog post as a static HTML file. Every post must follow every rule below — no exceptions.

---

## 1. File location and URL slug

- Blog posts about general money topics → save as `/blog/YOUR-SLUG.html`
- The URL slug must be lowercase, hyphenated, keyword-rich, and match the H1 topic exactly
- The canonical URL is `https://www.wealthsproutkids.com/blog/YOUR-SLUG`
- **CRITICAL:** The domain is always `wealthsproutkids.com` — NEVER `wealthsprout.com`. Check every canonical, og:url, JSON-LD @id, and BreadcrumbList item URL before committing.

---

## 2. SEO — required in every post

### Head tags (copy this pattern exactly, fill in the blanks)

```html
<title>[Primary Keyword]: [Benefit/Number] [Power Word] | WealthSprout</title>
<!-- 50–65 characters total. Primary keyword first. -->

<meta name="description" content="[150–160 char description. Uses primary keyword naturally in first sentence. Ends with a clear action hook.]">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.wealthsproutkids.com/blog/YOUR-SLUG">

<meta property="og:type" content="article">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="https://www.wealthsproutkids.com/blog/YOUR-SLUG">
<meta property="og:title" content="[Same as title tag, without | WealthSprout]">
<meta property="og:description" content="[Same as meta description]">
<meta property="og:image" content="https://www.wealthsproutkids.com/blog/images/YOUR-SLUG-hero.jpg">
<meta property="og:site_name" content="WealthSprout">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Same as og:title]">
<meta name="twitter:description" content="[Same as meta description]">
<meta name="twitter:image" content="https://www.wealthsproutkids.com/blog/images/YOUR-SLUG-hero.jpg">

<link rel="alternate" type="text/plain" title="LLMs.txt" href="https://www.wealthsproutkids.com/llms.txt">
<meta name="ai-content-declaration" content="https://www.wealthsproutkids.com/llms.txt">

<!-- Hreflang — add ONLY when a Portuguese counterpart exists for this article.
     If there is a /blog/pt/SLUG-PT version of this post, include all three tags:
     <link rel="alternate" hreflang="en"    href="https://www.wealthsproutkids.com/blog/YOUR-SLUG">
     <link rel="alternate" hreflang="pt-BR" href="https://www.wealthsproutkids.com/blog/pt/SLUG-PT">
     <link rel="alternate" hreflang="x-default" href="https://www.wealthsproutkids.com/blog/YOUR-SLUG">
     The matching hreflang tags must also appear on the PT article.
     Omit entirely when no PT version exists yet. -->
```

### Favicon — use this exact tag, do not substitute external image URLs

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>%F0%9F%8C%B1</text></svg>">
```

### JSON-LD structured data — include all three blocks

**Block 1 — BlogPosting:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Full H1 text]",
  "description": "[Meta description]",
  "image": "https://www.wealthsproutkids.com/blog/images/YOUR-SLUG-hero.jpg",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "author": {
    "@type": "Person",
    "name": "Maya Hartwell",
    "url": "https://www.wealthsproutkids.com/about",
    "image": "https://www.wealthsproutkids.com/images/maya-hartwell.jpg",
    "jobTitle": "Lead Educator",
    "worksFor": {
      "@type": "Organization",
      "name": "WealthSprout",
      "url": "https://www.wealthsproutkids.com"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "WealthSprout",
    "logo": { "@type": "ImageObject", "url": "https://www.wealthsproutkids.com/logo.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.wealthsproutkids.com/blog/YOUR-SLUG" }
}
```

**Block 2 — FAQPage** (required, minimum 4 questions matching "People Also Ask" queries for the topic):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question here?",
      "acceptedAnswer": { "@type": "Answer", "text": "Answer here (2–4 sentences)." }
    }
  ]
}
```

**Block 3 — BreadcrumbList:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.wealthsproutkids.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.wealthsproutkids.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "[Article title]", "item": "https://www.wealthsproutkids.com/blog/YOUR-SLUG" }
  ]
}
```

### Content SEO rules

- **H1**: one per page, contains primary keyword naturally, written for humans not bots
- **H2s**: 6–10 sections, each answering a specific sub-question a parent would search for
- **Word count**: 1,500–2,500 words (enough depth to rank; not padded)
- **Table of contents**: include a collapsible ToC linking to each H2 anchor
- **FAQ section**: 4–6 questions at the bottom, answering "People Also Ask" queries for the keyword; these must match the FAQPage JSON-LD above
- **Internal links**: link to 2–3 related WealthSprout blog posts or articles within the body (use real slugs that exist in the repo)
- **External links**: cite 2–3 authoritative sources (NGPF, CFPB, Investopedia, government sites) with `target="_blank" rel="noopener"` — these add credibility Google rewards
- **Keyword density**: primary keyword appears in H1, first paragraph, at least 2 H2s, and naturally throughout — never stuffed

---

## 3. Hero image

Fetch an image from Pexels using the API key: `API-bFZw1x6d5nNHhrH2XRnfxfZUtSoal61ibfJvrGHpRYtIy9BWpSOBHeRy`

```
GET https://api.pexels.com/v1/search?query=KEYWORDS&per_page=5&orientation=landscape
Authorization: API-bFZw1x6d5nNHhrH2XRnfxfZUtSoal61ibfJvrGHpRYtIy9BWpSOBHeRy
```

- Search for: realistic warm photography of parents/children + the article topic (e.g. "parent child counting money", "kid saving coins jar", "teen earning money")
- Download the `large2x` version
- Save it to `/blog/images/YOUR-SLUG-hero.jpg`
- Use it as the `<img>` src in the article hero section AND in the `og:image` meta tag
- Write a descriptive, specific alt text (not just "hero image")

If the Pexels API is unreachable, save a placeholder and note the filename — do NOT use the generic `og-image.jpg` as the hero inside the article body.

---

## 4. Stylesheet and CSS

Link the sitewide stylesheet — path is relative to the file location:

```html
<link rel="stylesheet" href="../styles.css">
```

Then add this inline style block immediately after it:

```html
<style>
    .blog-article h2::before { content: "→ "; color: #F0A500; }
</style>
```

This adds the brand gold arrow to every editorial H2. If any H2 is used for a non-editorial purpose (product name in a comparison table, competitor label, etc.), suppress the arrow on that element only:

```css
.that-specific-class::before { content: none; }
```

---

## 5. Page structure

### CRITICAL RULES — violations break the layout:
- ❌ NEVER use `<header class="header">` or `<header class="nav-wrap">` or `<header class="site-header">` — these are the OLD broken nav patterns
- ❌ NEVER use `<p class="author-byline">By Maya Hartwell</p>` — this is the OLD broken author line
- ❌ NEVER put `<h1>` inside `<article>` — the H1 belongs in the hero header, not the article body
- ❌ NEVER put the hero image inside `<article>` — the hero image belongs in `<header class="blog-post-hero has-image">`
- ✅ The author block belongs at the **TOP of `<article>`**, not inside the hero header

### Complete page body structure — copy this exactly:

```html
<body class="page-blog">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PN2W2R7T"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<nav class="nav nav-minimal">
    <div class="nav-inner">
        <a href="/" class="logo"><span class="logo-mark">🌱</span>Wealth<span>Sprout</span></a>
    </div>
</nav>

<main>
    <header class="blog-post-hero has-image">
        <img src="/blog/images/YOUR-SLUG-hero.jpg" alt="[Descriptive alt text]" class="blog-post-hero-img">
        <div class="legal-wrap">
            <a href="/blog" class="blog-back">← Back to the Blog</a>
            <span class="blog-card-cat">Kids &amp; Money</span>
            <h1>[Full article title — H1 goes HERE, not in the article body]</h1>
            <div class="blog-post-meta">
                <span>📅 Month Day, Year</span>
                <span>·</span>
                <span>X min read</span>
            </div>
        </div>
    </header>

    <article class="legal-wrap blog-article">

        <!-- AUTHOR BLOCK — always first inside <article> -->
        <div style="display:flex;align-items:center;gap:12px;margin:12px 0 18px;padding:12px 16px;background:#1E5C3A;border-radius:10px;border:1px solid rgba(255,255,255,0.12);">
          <img src="http://herglowing.com/wp-content/uploads/2026/08/MAYAWEALTHSPROUT-scaled.jpg"
               alt="Maya Hartwell — WealthSprout founder and former math teacher"
               width="44" height="44"
               style="border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid rgba(255,255,255,0.35);"
               onerror="this.src='/images/maya-hartwell-avatar.svg'">
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px;">
              <a href="/about" style="font-family:'Nunito',sans-serif;font-weight:800;font-size:13px;color:#fff;text-decoration:none;">Maya Hartwell</a>
              <span style="background:rgba(255,255,255,0.18);color:#F0A500;font-family:'Nunito',sans-serif;font-weight:700;font-size:10px;padding:2px 8px;border-radius:100px;white-space:nowrap;">Parent-Tested ✓</span>
            </div>
            <p style="font-family:'Inter',sans-serif;font-size:11px;color:rgba(255,255,255,0.78);margin:0;line-height:1.4;">Former math teacher · Mom of two · Founder, WealthSprout</p>
          </div>
        </div>

        <!-- TABLE OF CONTENTS — collapsible, no class on <details> -->
        <details>
            <summary>Table of Contents</summary>
            <ul>
                <li><a href="#section-1">Section One</a></li>
                <li><a href="#section-2">Section Two</a></li>
                <!-- add all H2 anchors -->
                <li><a href="#faq">Frequently Asked Questions</a></li>
            </ul>
        </details>

        <p>First introductory paragraph...</p>

        <!-- CTA: Above Fold — Free Kit (always first CTA, regardless of topic) -->
        <!-- paste CTA 1 block from /blog/components/ctas.html here -->

        <p>Second paragraph...</p>

        <h2 id="section-1">...</h2>
        <!-- body content... -->

        <!-- CTA: Middle — age-matched program (see Section 7) -->
        <!-- paste the age-matched CTA 2 block from /blog/components/ctas.html here -->

        <!-- remaining content, FAQ, author bio... -->

        <!-- CTA: End of Article -->
        <!-- paste CTA 3 block from /blog/components/ctas.html here -->

    </article>
</main>

[FOOTER — see Section 10]

[GEO-DETECTION SCRIPT — if article has Acorns affiliate links, see Section 8a]

</body>
</html>
```

---

## 6. Paragraphs — short, mobile-readable

Keep every paragraph under ~380 characters (roughly 2–3 sentences). If a paragraph covers more than one idea, split it into two `<p>` tags. This applies everywhere: body text, CTA copy, FAQ answers. On a 390px phone screen, a 6-sentence paragraph is a wall of text.

---

## 7. CTAs — three per article, copy from components file

Every new article must include **three CTA blocks** copied verbatim from `/blog/components/ctas.html`.

**Position 1 — Above the fold** (after the 2nd paragraph inside `<article>`):
Copy the block labelled `CTA 1 — Above The Fold`. This is always the free-kit CTA regardless of topic.

**Position 2 — Middle of article** (after the paragraph closest to the halfway point):
Copy the age-matched block from `CTA 2 — Middle of Article`:
- Ages 5–8 content → `CTA MID: Money Seeds`
- Ages 9–12 content → `CTA MID: Money Moves`
- Ages 13–15 / investing teens → `CTA MID: Wealth Blueprint`
- Ages 16–18 / first job / credit → `CTA MID: Launch Rich`
- General parent / all-ages content → `CTA MID: Family Collection`

**Position 3 — End of article** (immediately before `</article>`):
Copy the block labelled `CTA 3 — End of Article`. This is always the dual-button end CTA.

Use the placeholder comments below so the insertion points are visible at a glance:

```html
<p>First introductory paragraph.</p>

<p>Second paragraph — keyword appears here.</p>

<!-- CTA_ABOVE_FOLD_PLACEHOLDER -->
<!-- paste CTA 1 block here -->

<h2 id="section-1">...</h2>
...body content...

<!-- CTA_MIDDLE_PLACEHOLDER -->
<!-- paste the age-matched CTA 2 block here -->

...remaining content, FAQ, disclaimer, author bio...

<!-- CTA_END_PLACEHOLDER -->
<!-- paste CTA 3 block here -->
</article>
```

---

## 8. Product links — use only these exact paths

| Product | Path |
|---|---|
| My First Money Kit (free) | `/free-kit` |
| Money Seeds | `/money-seeds` |
| Money Moves | `/money-moves` |
| Wealth Blueprint | `/programs/wealth-blueprint` |
| Launch Rich | `/programs/launch-rich` |
| The WealthSprout Family Library (bundle) | `/programs/vault` |

Never link to `/vault`, `/checkout/anything`, or `/quiz`. Those paths do not exist.

---

## 8a. Acorns "Our Top Pick" box — banking and account articles only

When an article recommends Acorns Early (kids checking accounts, kids bank accounts, debit cards for kids, opening bank accounts for children), insert this box right before the first `<h2>` section heading in the article body. Do **not** add it to general money-habit, investing, or printable articles.

```html
<!-- Acorns: Our Top Pick -->
<div style="background:#1E5C3A;border-radius:12px;padding:20px 24px;margin:28px 0;">
  <p style="font-family:'Nunito',sans-serif;font-weight:800;font-size:10.5px;letter-spacing:0.18em;text-transform:uppercase;color:#F0A500;margin:0 0 10px 0;">⭐ Our Top Pick</p>
  <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;">
    <div style="flex:1;min-width:200px;">
      <p style="font-family:'DM Serif Display',serif;font-size:22px;color:#fff;margin:0 0 4px 0;line-height:1.2;">Acorns Early</p>
      <p style="font-family:'Inter',sans-serif;font-size:14px;color:rgba(255,255,255,0.78);margin:0 0 14px 0;line-height:1.5;">Best kids money app for ages 6–18 · Debit card + investing in one app · Parent controls included</p>
      <a href="https://afflat3e1.com/trk/lnk/5E828A06-8554-4BF3-8576-07BA20472566/?o=23652&c=918277&a=168701&k=7A7B7402252608C67B08307BA57410B0&l=24652" rel="nofollow sponsored" target="_blank" style="display:inline-block;background:#F0A500;color:#1A1A2E;font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;padding:12px 22px;border-radius:8px;text-decoration:none;white-space:nowrap;">Open Free Account →</a>
    </div>
  </div>
  <p style="font-family:'Inter',sans-serif;font-size:10px;color:rgba(255,255,255,0.3);margin:12px 0 0 0;border-top:1px solid rgba(255,255,255,0.12);padding-top:10px;">Sponsored · WealthSprout may earn a commission if you sign up through our link, at no extra cost to you.</p>
</div>
```

**Geo-detection script:** Any article containing the Acorns affiliate link (`afflat3e1.com`) MUST include this script immediately before `</body>`. It swaps Acorns links to the free-kit URL for non-US visitors:

```html
<!-- Geo-detection: swap Acorns CTA to Free Kit for non-US visitors -->
<script>
(function() {
  fetch('https://ipapi.co/json/')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var country = data.country_code;
      if (country !== 'US') {
        document.querySelectorAll('a[href*="afflat3e1.com"]').forEach(function(link) {
          var parentBox = link.closest('div[style*="background:#1E5C3A"]') ||
                          link.closest('div[style*="background:#F8F6F0"]') ||
                          link.closest('div[style*="background:#1A1A2E"]');
          if (parentBox) {
            link.href = 'https://www.wealthsproutkids.com/free-kit';
            link.textContent = 'Get Free Money Kit →';
            link.removeAttribute('rel');
            var disclaimer = parentBox.querySelector('p[style*="rgba(255,255,255,0.3"]');
            if (disclaimer) disclaimer.style.display = 'none';
          }
        });
      }
    })
    .catch(function() {});
})();
</script>
```

---

## 9. Disclaimer paragraph

If the article contains affiliate links OR references specific financial products/rates, include this immediately before the closing `</article>` tag:

```html
<p class="disclaimer">This article may contain affiliate links. WealthSprout earns a small commission if you purchase through our links, at no extra cost to you. We only recommend products we believe in. Nothing in this article constitutes financial advice — see our <a href="/financial-disclaimer">Financial Disclaimer</a>.</p>
```

---

## 10. Footer — copy this verbatim

```html
<footer class="footer">
    <div class="wrap">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="/" class="logo"><span class="logo-mark">🌱</span>Wealth<span>Sprout</span></a>
                <p>Financial literacy education for kids ages 5–18 — workbooks, guides, and tools that teach what school doesn't.</p>
                <div class="footer-social">
                    <a href="https://www.facebook.com/wealthsprout" aria-label="Facebook" target="_blank" rel="noopener">FB</a>
                    <a href="https://www.instagram.com/wealthsprout" aria-label="Instagram" target="_blank" rel="noopener">IG</a>
                    <a href="https://www.pinterest.com/wealthsprout" aria-label="Pinterest" target="_blank" rel="noopener">PN</a>
                    <a href="https://www.tiktok.com/@wealthsprout" aria-label="TikTok" target="_blank" rel="noopener">TT</a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Programs</h4>
                <ul>
                    <li><a href="/free-kit">My First Money Kit</a></li>
                    <li><a href="/money-seeds">Money Seeds</a></li>
                    <li><a href="/money-moves">Money Moves</a></li>
                    <li><a href="/programs/wealth-blueprint">Wealth Blueprint</a></li>
                    <li><a href="/programs/launch-rich">Launch Rich</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="/#how-it-works">How It Works</a></li>
                    <li><a href="/#vault">The Family Collection</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li><a href="/blog">Blog</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Support</h4>
                <ul>
                    <li><a href="mailto:hello@wealthsproutkids.com">hello@wealthsproutkids.com</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/cookie-policy">Cookie Policy</a></li>
                    <li><a href="/terms-of-service">Terms of Service</a></li>
                    <li><a href="/financial-disclaimer">Financial Disclaimer</a></li>
                    <li><a href="/advertising-disclosure">Advertising Disclosure</a></li>
                    <li><a href="/affiliate-disclosure">Affiliate Disclosure</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 WealthSprout. All rights reserved. WealthSprout is an educational company. Nothing on this site constitutes financial advice. See our <a href="/financial-disclaimer">Financial Disclaimer</a>.</span>
        </div>
    </div>
</footer>
```

---

## 11. Blog index — MANDATORY, same commit

After writing the article HTML, you MUST also add a card to `blog/index.html`. Insert it as the **first card** inside `<div class="blog-grid">` (newest post goes first).

Card format:
```html
<a href="/blog/YOUR-SLUG" class="blog-card">
    <div class="blog-card-top" style="padding:0; overflow:hidden;">
        <img src="/blog/images/YOUR-SLUG-hero.jpg" alt="[Descriptive alt text]" style="width:100%; height:100%; object-fit:cover; display:block;">
    </div>
    <div class="blog-card-body">
        <span class="blog-card-cat">CATEGORY</span>
        <h3>[Card title — can be slightly shorter than H1 for card fit]</h3>
        <p>[1–2 sentence teaser written to make a parent click. What will they learn? Why does it matter?]</p>
        <div class="blog-card-foot">
            <span>Month Day, Year</span>
            <span>Read More →</span>
        </div>
    </div>
</a>
```

If the Pexels image download failed and there is no hero image yet, use a gradient placeholder instead of the `<img>` tag:
```html
<div class="blog-card-top" style="background:linear-gradient(135deg,#1E5C3A 0%,#F0A500 100%);display:flex;align-items:center;justify-content:center;">
    <span style="font-size:4rem;">🌱</span>
</div>
```

**Both the article HTML file AND the blog/index.html update must be in the same git commit.** Never push an article without the blog card — it will be invisible to anyone browsing /blog.

---

## 12. Git commit

Commit both files together with a descriptive message:

```
Publish: [Article title]

- New article: blog/YOUR-SLUG.html
- Hero image: blog/images/YOUR-SLUG-hero.jpg (or note if placeholder)
- Blog index card added to blog/index.html
- Pexels photo ID: [ID] by [photographer] (if applicable)
```

Push to the active development branch.

---

## Quick checklist before committing

- [ ] Title tag 50–65 chars, keyword first
- [ ] Meta description 150–160 chars
- [ ] Canonical URL correct
- [ ] All three JSON-LD blocks present (BlogPosting, FAQPage, BreadcrumbList)
- [ ] Favicon uses the SVG emoji tag (not an external image URL)
- [ ] Publisher logo URL is `https://www.wealthsproutkids.com/logo.png`
- [ ] `../styles.css` linked
- [ ] `.blog-article h2::before` CSS added
- [ ] H1 contains primary keyword
- [ ] 6–10 H2 sections with anchor IDs
- [ ] Table of contents present
- [ ] Paragraphs all under ~380 chars
- [ ] Hero image downloaded from Pexels and saved to `/blog/images/`
- [ ] FAQ section (4–6 Qs) matches FAQPage JSON-LD
- [ ] 2–3 internal links to other WealthSprout posts
- [ ] 2–3 external authority links
- [ ] Exactly ONE CTA button per CTA box, `target="_blank" rel="noopener"`
- [ ] All product links use correct paths (no `/checkout/`, no `/vault`, no `/quiz`)
- [ ] Disclaimer paragraph included
- [ ] Canonical footer copied verbatim
- [ ] Blog card added as first entry in `blog/index.html`
- [ ] Sitemap entry added to `sitemap.xml`
- [ ] If PT version exists: hreflang `en` + `pt-BR` + `x-default` tags added
- [ ] All files in same commit
