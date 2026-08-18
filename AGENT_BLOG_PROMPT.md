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
  "author": { "@type": "Organization", "name": "WealthSprout" },
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

Use this wrapper for the article body:

```html
<article class="legal-wrap blog-article">
  <!-- all article content here -->
</article>
```

Navigation:
```html
<nav class="nav nav-minimal">
    <div class="nav-inner">
        <a href="/" class="logo"><span class="logo-mark">🌱</span>Wealth<span>Sprout</span></a>
    </div>
</nav>
```

Back-to-blog link and category chip above the H1:
```html
<header class="blog-post-hero">
    <div class="legal-wrap">
        <a href="/blog" class="blog-back">← Back to the Blog</a>
        <span class="blog-card-cat">CATEGORY</span>
        <h1>...</h1>
        <div class="blog-post-meta">
            <span>📅 Month Day, Year</span>
            <span>·</span>
            <span>X min read</span>
        </div>
    </div>
</header>
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
