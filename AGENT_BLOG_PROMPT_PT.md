# WealthSprout — Prompt de Publicação de Artigos em Português (pt-BR)

Use este prompt toda vez que publicar um novo artigo em português no repositório WealthSprout.
Este é o equivalente em pt-BR do `AGENT_BLOG_PROMPT.md` (inglês).

---

## Seu trabalho

Escreva e publique um artigo completo e otimizado para SEO como um arquivo HTML estático.
Cada artigo deve seguir todas as regras abaixo — sem exceções.

---

## 1. Localização do arquivo e slug da URL

- Artigos em português → salve em `/blog/pt/SEU-SLUG.html`
- O slug deve estar **em português**: letras minúsculas, hifenizadas, ricas em palavras-chave
  - ✅ `como-ensinar-criancas-sobre-dinheiro`
  - ❌ `how-to-teach-kids-about-money` (slug em inglês = errado)
- A URL canônica é `https://www.wealthsproutkids.com/blog/pt/SEU-SLUG`
- O arquivo de imagem hero vai em `/blog/images/SEU-SLUG-hero.jpg` (mesma pasta das imagens EN)

---

## 2. SEO — obrigatório em cada artigo

### Tags no `<head>` (copie este padrão exato, preencha os espaços)

```html
<!-- Idioma na tag <html> — obrigatório -->
<html lang="pt-BR">

<title>[Palavra-chave Principal]: [Benefício/Número] | WealthSprout</title>
<!-- 50–65 caracteres. Palavra-chave principal primeiro. -->

<meta name="description" content="[150–160 chars. Palavra-chave no início. Termina com gancho de ação.]">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.wealthsproutkids.com/blog/pt/SEU-SLUG">
<link rel="alternate" type="text/plain" title="LLMs.txt" href="https://www.wealthsproutkids.com/llms.txt">

<!-- HREFLANG — obrigatório em todos os artigos pt-BR -->
<!-- Se existe artigo equivalente em inglês: -->
<link rel="alternate" hreflang="pt-BR" href="https://www.wealthsproutkids.com/blog/pt/SEU-SLUG">
<link rel="alternate" hreflang="en" href="https://www.wealthsproutkids.com/blog/SLUG-EM-INGLÊS">
<link rel="alternate" hreflang="x-default" href="https://www.wealthsproutkids.com/blog/SLUG-EM-INGLÊS">

<!-- Se NÃO existe artigo equivalente em inglês para este tópico específico: -->
<link rel="alternate" hreflang="pt-BR" href="https://www.wealthsproutkids.com/blog/pt/SEU-SLUG">
<link rel="alternate" hreflang="en" href="https://www.wealthsproutkids.com/blog">
<link rel="alternate" hreflang="x-default" href="https://www.wealthsproutkids.com/blog">

<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="https://www.wealthsproutkids.com/blog/pt/SEU-SLUG">
<meta property="og:title" content="[Mesmo que title, sem | WealthSprout]">
<meta property="og:description" content="[Mesma meta description]">
<meta property="og:image" content="https://www.wealthsproutkids.com/blog/images/SEU-SLUG-hero.jpg">
<meta property="og:site_name" content="WealthSprout">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Mesmo que og:title]">
<meta name="twitter:description" content="[Mesma meta description]">
<meta name="twitter:image" content="https://www.wealthsproutkids.com/blog/images/SEU-SLUG-hero.jpg">
<meta name="twitter:site" content="@wealthsprout">
```

### Favicon — use exatamente este tag

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>%F0%9F%8C%B1</text></svg>">
```

### GTM — obrigatório no início de `<head>` e logo após `<body>`

```html
<!-- No <head>, ANTES do <meta charset>: -->
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PN2W2R7T');</script>
<!-- End Google Tag Manager -->

<!-- Logo após <body>: -->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PN2W2R7T"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### CSP — obrigatório, logo após `<meta charset="UTF-8">`

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

### JSON-LD — inclua os três blocos

**Bloco 1 — BlogPosting:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[H1 completo]",
  "description": "[Meta description]",
  "image": "https://www.wealthsproutkids.com/blog/images/SEU-SLUG-hero.jpg",
  "inLanguage": "pt-BR",
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
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.wealthsproutkids.com/blog/pt/SEU-SLUG" }
}
```

**Bloco 2 — FAQPage** (mínimo 4 perguntas correspondendo às "Perguntas Frequentes" no conteúdo):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pergunta aqui?",
      "acceptedAnswer": { "@type": "Answer", "text": "Resposta (2–4 frases)." }
    }
  ]
}
```

**Bloco 3 — BreadcrumbList:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://www.wealthsproutkids.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.wealthsproutkids.com/blog/pt" },
    { "@type": "ListItem", "position": 3, "name": "[Título do artigo]", "item": "https://www.wealthsproutkids.com/blog/pt/SEU-SLUG" }
  ]
}
```

### Regras de SEO de conteúdo

- **H1**: um por página, contém a palavra-chave principal de forma natural
- **H2s**: 6–10 seções, cada uma respondendo uma sub-pergunta específica
- **Contagem de palavras**: 1.500–2.500 palavras
- **Sumário (ToC)**: inclua um sumário recolhível com links para cada âncora H2
- **Seção FAQ**: 4–6 perguntas no final — devem coincidir com o FAQPage JSON-LD
- **Links internos**: 2–3 links para outros artigos WealthSprout no corpo do texto
- **Links externos**: cite 2–3 fontes autoritativas (NGPF, CFPB, Banco Central do Brasil, sites governamentais) com `target="_blank" rel="noopener"`

---

## 3. Imagem hero

Busque uma imagem no Pexels (API key: `API-bFZw1x6d5nNHhrH2XRnfxfZUtSoal61ibfJvrGHpRYtIy9BWpSOBHeRy`):

```
GET https://api.pexels.com/v1/search?query=PALAVRAS-CHAVE&per_page=5&orientation=landscape
Authorization: API-bFZw1x6d5nNHhrH2XRnfxfZUtSoal61ibfJvrGHpRYtIy9BWpSOBHeRy
```

- Busque por: fotografia realista e calorosa de pais/filhos + o tópico do artigo
- Baixe a versão `large2x`
- Salve em `/blog/images/SEU-SLUG-hero.jpg`
- Use como `<img>` no hero E no `og:image`
- Escreva um `alt` descritivo e específico

---

## 4. Stylesheet e CSS

O arquivo está em `blog/pt/`, então o caminho do stylesheet é **dois níveis acima**:

```html
<link rel="stylesheet" href="../../styles.css">
```

Adicione este bloco de estilo inline logo depois:

```html
<style>
    .blog-article h2::before { content: "→ "; color: #F0A500; }
</style>
```

---

## 5. Estrutura da página

**Navegação:**
```html
<nav class="nav nav-minimal">
    <div class="nav-inner">
        <a href="/" class="logo"><span class="logo-mark">🌱</span>Wealth<span>Sprout</span></a>
    </div>
</nav>
```

**Hero com imagem e overlay:**
```html
<main>
    <header class="blog-post-hero has-image">
        <img src="/blog/images/SEU-SLUG-hero.jpg" alt="[Alt text descritivo]" class="blog-post-hero-img">
        <div class="legal-wrap">
            <a href="/blog/pt" class="blog-back">← Voltar ao Blog</a>
            <span class="blog-card-cat">CATEGORIA EM PORTUGUÊS</span>
            <h1>Seu H1 aqui</h1>
            <div style="display:flex;align-items:center;gap:14px;margin:16px 0 24px;padding:16px 20px;background:rgba(255,255,255,0.12);border-radius:10px;border:1px solid rgba(255,255,255,0.18);">
              <img src="/images/maya-hartwell.jpg"
                   alt="Maya Hartwell — fundadora do WealthSprout e ex-professora de matemática"
                   width="52" height="52"
                   style="border-radius:50%;object-fit:cover;flex-shrink:0;"
                   onerror="this.style.display='none'">
              <div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                  <a href="/about" style="font-family:'Nunito',sans-serif;font-weight:800;font-size:14px;color:#fff;text-decoration:none;">Maya Hartwell</a>
                  <span style="background:rgba(255,255,255,0.15);color:#F0A500;font-family:'Nunito',sans-serif;font-weight:700;font-size:11px;padding:2px 10px;border-radius:100px;">Testado por Pais ✓</span>
                </div>
                <p style="font-family:'Inter',sans-serif;font-size:12px;color:rgba(255,255,255,0.7);margin:3px 0 0 0;line-height:1.5;">Ex-professora de matemática · Mãe de dois · Fundadora, WealthSprout<br>
                <span style="color:rgba(255,255,255,0.45);">Ajudando famílias a construir educação financeira desde 2025</span></p>
              </div>
            </div>
            <div class="blog-post-meta">
                <span>📅 Dia Mês Ano</span>
                <span>·</span>
                <span>X min de leitura</span>
            </div>
        </div>
    </header>

    <article class="legal-wrap blog-article">
        <!-- conteúdo do artigo aqui -->
    </article>
</main>
```

---

## 6. Parágrafos — curtos, legíveis no mobile

Máximo ~380 caracteres por parágrafo (2–3 frases). Uma ideia por parágrafo. Se um parágrafo cobre duas ideias, divida em dois `<p>`.

---

## 7. CTAs — três blocos por artigo, copiados do arquivo de componentes

Todo novo artigo deve conter **três blocos de CTA** copiados literalmente de `/blog/components/ctas.html`.

**Posição 1 — Acima da dobra** (após o 2º parágrafo dentro de `<article>`):
Copie o bloco `CTA 1 — Above The Fold`. Sempre o CTA do Kit Gratuito, independente do tópico.

**Posição 2 — Meio do artigo** (após o parágrafo mais próximo do ponto médio):
Copie o bloco correspondente à faixa etária do público-alvo:
- Crianças 5–8 → `CTA MID: Money Seeds`
- Crianças 9–12 → `CTA MID: Money Moves`
- Adolescentes 13–15 / investimentos → `CTA MID: Wealth Blueprint`
- Adolescentes 16–18 / primeiro emprego / crédito → `CTA MID: Launch Rich`
- Público geral / todas as idades → `CTA MID: Family Collection`

**Posição 3 — Final do artigo** (imediatamente antes de `</article>`):
Copie o bloco `CTA 3 — End of Article`. Sempre o CTA de botão duplo.

Use os comentários de referência abaixo para que as posições fiquem visíveis:

```html
<p>Primeiro parágrafo introdutório.</p>

<p>Segundo parágrafo — palavra-chave aparece aqui.</p>

<!-- CTA_ABOVE_FOLD_PLACEHOLDER -->
<!-- cole o bloco CTA 1 aqui -->

<h2 id="secao-1">...</h2>
...conteúdo do artigo...

<!-- CTA_MIDDLE_PLACEHOLDER -->
<!-- cole o bloco CTA 2 correspondente à faixa etária aqui -->

...conteúdo restante, FAQ, aviso legal, bio da autora...

<!-- CTA_END_PLACEHOLDER -->
<!-- cole o bloco CTA 3 aqui -->
</article>
```

---

## 8. Links de produtos — use apenas estes caminhos

| Produto | Caminho |
|---|---|
| Kit Gratuito | `/free-kit` |
| Money Seeds | `/money-seeds` |
| Money Moves | `/money-moves` |
| Wealth Blueprint | `/wealth-blueprint` |
| Launch Rich | `/launch-rich` |
| Biblioteca da Família WealthSprout | `/vault` |

---

## 9. Parágrafo de aviso legal

Inclua quando o artigo contiver links de afiliados OU mencionar produtos/taxas financeiras específicas:

```html
<p class="disclaimer">Este artigo pode conter links de afiliados. O WealthSprout recebe uma pequena comissão quando você compra através dos nossos links, sem custo adicional para você. Recomendamos apenas produtos em que acreditamos. Nada neste artigo constitui aconselhamento financeiro.</p>
```

---

## 10. Rodapé — copie literalmente

```html
<footer class="footer">
    <div class="wrap">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="/" class="logo"><span class="logo-mark">🌱</span>Wealth<span>Sprout</span></a>
                <p>Educação financeira para crianças de 5 a 18 anos — materiais e guias que ensinam o que a escola não ensina.</p>
                <div class="footer-social">
                    <a href="https://www.facebook.com/wealthsprout" aria-label="Facebook" target="_blank" rel="noopener">FB</a>
                    <a href="https://www.instagram.com/wealthsprout" aria-label="Instagram" target="_blank" rel="noopener">IG</a>
                    <a href="https://www.pinterest.com/wealthsprout" aria-label="Pinterest" target="_blank" rel="noopener">PN</a>
                    <a href="https://www.tiktok.com/@wealthsprout" aria-label="TikTok" target="_blank" rel="noopener">TT</a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Programas</h4>
                <ul>
                    <li><a href="/free-kit">Kit Gratuito</a></li>
                    <li><a href="/money-seeds">Money Seeds</a></li>
                    <li><a href="/money-moves">Money Moves</a></li>
                    <li><a href="/wealth-blueprint">Wealth Blueprint</a></li>
                    <li><a href="/launch-rich">Launch Rich</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Empresa</h4>
                <ul>
                    <li><a href="/#how-it-works">Como Funciona</a></li>
                    <li><a href="/#vault">Coleção da Família</a></li>
                    <li><a href="/#faq">Perguntas Frequentes</a></li>
                    <li><a href="/blog/pt">Blog (PT)</a></li>
                    <li><a href="/blog">Blog (EN)</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Suporte</h4>
                <ul>
                    <li><a href="mailto:hello@wealthsproutkids.com">hello@wealthsproutkids.com</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="/privacy-policy">Política de Privacidade</a></li>
                    <li><a href="/terms-of-service">Termos de Uso</a></li>
                    <li><a href="/financial-disclaimer">Aviso Legal</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 WealthSprout. Todos os direitos reservados. WealthSprout é uma empresa educacional. Nada neste site constitui aconselhamento financeiro.</span>
        </div>
    </div>
</footer>

<script src="../../main.js"></script>
```

---

## 11. Blog index PT — OBRIGATÓRIO, mesmo commit

Após escrever o HTML do artigo, adicione um card no topo de `blog/pt/index.html`:

```html
<a href="/blog/pt/SEU-SLUG" class="blog-card">
    <div class="blog-card-top" style="padding:0; overflow:hidden;">
        <img src="/blog/images/SEU-SLUG-hero.jpg" alt="[Alt text descritivo]" style="width:100%; height:100%; object-fit:cover; display:block;">
    </div>
    <div class="blog-card-body">
        <span class="blog-card-cat">CATEGORIA</span>
        <h3>[Título para o card — pode ser ligeiramente mais curto que o H1]</h3>
        <p>[Teaser de 1–2 frases que faz o pai/mãe clicar.]</p>
        <div class="blog-card-foot">
            <span>Dia Mês Ano</span>
            <span>Ler Mais →</span>
        </div>
    </div>
</a>
```

Insira como **primeiro card** dentro de `<div class="blog-grid">`. Remova o bloco de comentário "Os primeiros artigos chegam em breve" quando o primeiro artigo for publicado.

**O HTML do artigo E a atualização do blog/pt/index.html devem estar no mesmo commit.**

---

## 12. Sitemap — atualize no mesmo commit

Adicione a entrada do novo artigo à seção PT em `sitemap.xml`:

```xml
<!-- BLOG PORTUGUÊS (pt-BR) -->
<url>
  <loc>https://www.wealthsproutkids.com/blog/pt/SEU-SLUG</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
  <lastmod>YYYY-MM-DD</lastmod>
</url>
```

---

## 13. Git commit

```
Publish (pt-BR): [Título do artigo]

- Novo artigo: blog/pt/SEU-SLUG.html
- Imagem hero: blog/images/SEU-SLUG-hero.jpg
- Card adicionado ao blog/pt/index.html
- Entrada adicionada ao sitemap.xml
- Pexels foto ID: [ID] por [fotógrafo]
```

---

## Checklist antes do commit

- [ ] `<html lang="pt-BR">`
- [ ] Title tag 50–65 chars, palavra-chave primeiro
- [ ] Meta description 150–160 chars em português
- [ ] Canonical URL: `https://www.wealthsproutkids.com/blog/pt/SEU-SLUG`
- [ ] Hreflang `pt-BR` + `en` + `x-default` presentes
- [ ] GTM snippet no head e no body
- [ ] CSP meta tag presente
- [ ] Favicon usa a tag SVG emoji (não URL externa)
- [ ] `og:locale` = `pt_BR` (não `en_US`)
- [ ] `inLanguage: "pt-BR"` no JSON-LD BlogPosting
- [ ] Publisher logo: `https://www.wealthsproutkids.com/logo.png`
- [ ] Todos os três blocos JSON-LD presentes (BlogPosting, FAQPage, BreadcrumbList)
- [ ] BreadcrumbList aponta para `/blog/pt` (não `/blog`)
- [ ] `../../styles.css` linkado (dois níveis acima)
- [ ] `h2::before` CSS adicionado
- [ ] Hero: `<img class="blog-post-hero-img">` PRIMEIRO, depois `.legal-wrap`
- [ ] Back-link: `← Voltar ao Blog` apontando para `/blog/pt`
- [ ] H1 contém palavra-chave principal em português
- [ ] 6–10 seções H2 com IDs âncora
- [ ] Sumário (ToC) presente
- [ ] Parágrafos todos abaixo de ~380 chars
- [ ] Hero image baixada do Pexels e salva em `/blog/images/`
- [ ] Seção FAQ (4–6 Qs) coincide com FAQPage JSON-LD
- [ ] 2–3 links internos para outros artigos WealthSprout
- [ ] 2–3 links externos para fontes de autoridade
- [ ] Três CTAs inseridos: above-fold (Kit Gratuito), meio (faixa etária), final (botão duplo)
- [ ] Blocos de CTA copiados literalmente de `/blog/components/ctas.html`
- [ ] Todos os links de produtos usam os caminhos corretos
- [ ] Parágrafo de aviso legal incluído
- [ ] Rodapé copiado literalmente (com `../../main.js`)
- [ ] Card adicionado como primeira entrada em `blog/pt/index.html`
- [ ] Entrada de sitemap adicionada em `sitemap.xml`
- [ ] Todos os arquivos no mesmo commit
