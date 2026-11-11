#!/usr/bin/env python3
"""Keep every sitemap URL on the canonical https://www.wealthsproutkids.com host.

Non-www URLs 301-redirect to www and every page's canonical tag is the www
form, so a non-www <loc> points search engines at a redirect. Entries appended
by the Abacus SEO workflow go through this same check.

    python3 scripts/check-sitemap.py          # verify, exit 1 on any problem
    python3 scripts/check-sitemap.py --fix    # normalize + de-duplicate in place
"""
import re
import sys
import xml.etree.ElementTree as ET

CANON = 'https://www.wealthsproutkids.com'
SITEMAP = 'sitemap.xml'

# Any host spelling that should be rewritten to the canonical one.
WRONG_HOST = re.compile(
    r'https?://(?:www\.)?wealthsproutkids\.com'
    r'|http://www\.wealthsproutkids\.com'
)


def normalize(url):
    url = url.strip()
    return WRONG_HOST.sub(CANON, url, count=1)


def main(argv):
    fix = '--fix' in argv
    path = SITEMAP
    raw = open(path, encoding='utf-8').read()

    try:
        ET.fromstring(raw)
    except ET.ParseError as exc:
        print(f'ERROR: {path} is not well-formed XML: {exc}')
        return 1

    locs = re.findall(r'<loc>\s*([^<]+?)\s*</loc>', raw)
    bad = [u for u in locs if not u.startswith(CANON + '/') and u != CANON + '/']
    seen, dupes = set(), []
    for u in (normalize(x) for x in locs):
        if u in seen:
            dupes.append(u)
        seen.add(u)

    if not fix:
        if not bad and not dupes:
            print(f'OK - {len(locs)} URLs, all on {CANON}, no duplicates.')
            return 0
        if bad:
            print(f'{len(bad)} <loc> not on the canonical host:\n')
            for u in bad:
                print(f'  {u}')
                print(f'::error file={path}::<loc> must start with {CANON}/ - found {u}')
        if dupes:
            print(f'\n{len(dupes)} duplicate <loc>:\n')
            for u in sorted(set(dupes)):
                print(f'  {u}')
                print(f'::error file={path}::duplicate <loc> {u}')
        print(f'\nRun: python3 scripts/check-sitemap.py --fix')
        return 1

    # --fix: rewrite hosts, then drop <url> blocks whose <loc> repeats.
    fixed = re.sub(r'(<loc>\s*)([^<]+?)(\s*</loc>)',
                   lambda m: m.group(1) + normalize(m.group(2)) + m.group(3), raw)

    kept = set()

    def dedupe(match):
        block = match.group(0)
        m = re.search(r'<loc>\s*([^<]+?)\s*</loc>', block)
        if not m:
            return block
        url = m.group(1)
        if url in kept:
            return ''
        kept.add(url)
        return block

    fixed = re.sub(r'(?s)\s*<url>.*?</url>', dedupe, fixed)
    # dedupe() can leave blank runs where blocks were removed
    fixed = re.sub(r'\n{3,}', '\n\n', fixed)
    fixed = re.sub(r'(?s)(<urlset[^>]*>)\s*', r'\1\n', fixed)
    fixed = re.sub(r'(?s)\s*(</urlset>)', r'\n\1', fixed)

    try:
        ET.fromstring(fixed)
    except ET.ParseError as exc:
        print(f'ERROR: refusing to write, result would not be well-formed XML: {exc}')
        return 1

    if fixed != raw:
        open(path, 'w', encoding='utf-8').write(fixed)
    after = re.findall(r'<loc>\s*([^<]+?)\s*</loc>', fixed)
    print(f'Fixed: {len(locs)} URLs in, {len(after)} out '
          f'({len(bad)} host rewrites, {len(dupes)} duplicates removed).')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
