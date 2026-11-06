#!/usr/bin/env python3
"""Flag blog posts whose body still contains raw Markdown.

Articles are hand-authored HTML. When a post is drafted in Markdown and pasted
into the template without conversion, the browser prints the syntax literally
("**bold**", "- item") and runs the paragraphs together. This catches that
before it reaches production.

Usage: python3 scripts/check-markdown.py [files...]   (default: blog/**/*.html)
Exits 1 if anything is flagged.
"""
import glob
import os
import re
import sys

PATTERNS = [
    ('bold **',       re.compile(r'\*\*[^*\n]+\*\*')),
    ('italic *',      re.compile(r'(?<![\*\w])\*[^*\s][^*\n]*?\*(?!\*)')),
    ('heading ##',    re.compile(r'(?m)^[ \t]*#{2,4}[ \t]+\S')),
    ('bullet - ',     re.compile(r'(?m)^[ \t]*[-*+][ \t]+\S')),
    ('ordered 1.',    re.compile(r'(?m)^[ \t]*\d+\.[ \t]+\S')),
    ('blockquote >',  re.compile(r'(?m)^[ \t]*>[ \t]+\S')),
    ('rule ---',      re.compile(r'(?m)^[ \t]*(?:---+|\*\*\*+)[ \t]*$')),
    ('table |',       re.compile(r'(?m)^[ \t]*\|.+\|[ \t]*$')),
    ('link [](...)',  re.compile(r'\[[^\]\n]+\]\([^)\n]+\)')),
]


def article_text(html):
    """Return the article body with tags removed, or None if there is no article."""
    m = re.search(r'(?s)<article\b[^>]*>(.*?)</article>', html)
    if not m:
        return None, None
    body = m.group(1)
    text = re.sub(r'(?is)<(script|style)\b.*?</\1>', ' ', body)
    text = re.sub(r'(?s)<!--.*?-->', ' ', text)
    text = re.sub(r'(?s)<[^>]+>', '\x00', text)
    return body, text


def check(path):
    html = open(path, encoding='utf-8').read()
    body, text = article_text(html)
    if text is None:
        return []
    problems = []
    for label, pat in PATTERNS:
        n = len(pat.findall(text))
        if n:
            problems.append(f'{label} x{n}')
    # A body delivered as one long line has lost its block structure.
    if body.strip() and '\n' not in body.strip() and len(body) > 2000:
        problems.append('article body has no line breaks')
    return problems


def main(argv):
    files = argv[1:] or sorted(glob.glob('blog/**/*.html', recursive=True))
    flagged = []
    for f in files:
        if not os.path.exists(f):
            continue
        try:
            problems = check(f)
        except Exception as exc:                      # never fail the build on a read error
            print(f'::warning file={f}::could not scan: {exc}')
            continue
        if problems:
            flagged.append((f, problems))

    if not flagged:
        print(f'OK - no raw Markdown found in {len(files)} file(s).')
        return 0

    print(f'Raw Markdown found in {len(flagged)} file(s):\n')
    for f, problems in flagged:
        print(f'  {f}')
        print(f'      {", ".join(problems)}')
        # GitHub Actions surfaces this as an annotation on the file.
        print(f'::error file={f}::Raw Markdown in article body ({"; ".join(problems)}). '
              f'Convert the body to HTML before publishing.')
    print('\nArticle bodies must be HTML: <p>, <ul><li>, <strong>, <em>, <h2>/<h3>.')
    return 1


if __name__ == '__main__':
    sys.exit(main(sys.argv))
