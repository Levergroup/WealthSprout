#!/usr/bin/env bash
# Run this locally to fetch/replace hero images from Pexels.
# Usage: PEXELS_API_KEY=your_key bash fetch-blog-images.sh
#
# It will only download an image if a file with that name does NOT already
# exist in blog/images/ (or if you pass --force to overwrite everything).

set -euo pipefail

API_KEY="${PEXELS_API_KEY:-}"
IMAGES_DIR="$(dirname "$0")/blog/images"
FORCE="${1:-}"

if [[ -z "$API_KEY" ]]; then
  echo "Set PEXELS_API_KEY first:  export PEXELS_API_KEY=your_key"
  exit 1
fi

pexels_search() {
  local query="$1"
  curl -s "https://api.pexels.com/v1/search?query=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$query")&per_page=1&orientation=landscape" \
    -H "Authorization: $API_KEY" | \
    python3 -c "import sys,json; d=json.load(sys.stdin); p=d['photos'][0]; print(p['src']['large2x'])" 2>/dev/null
}

download() {
  local filename="$1"
  local query="$2"
  local dest="$IMAGES_DIR/$filename"

  if [[ -f "$dest" && "$FORCE" != "--force" ]]; then
    echo "SKIP  $filename (already exists)"
    return
  fi

  echo -n "FETCH $filename ... "
  local url
  url=$(pexels_search "$query")
  if [[ -z "$url" ]]; then
    echo "NOT FOUND (query: $query)"
    return
  fi
  curl -s -L -o "$dest" "$url"
  echo "done"
}

# Map: filename -> Pexels search query
download "best-kids-bank-accounts-hero.jpg"                          "parent child debit card piggy bank"
download "3-jar-money-system-hero.jpg"                               "three jars coins children saving"
download "compound-interest-calculator-for-kids-hero.jpg"            "child calculator math money"
download "compound-interest-for-kids-hero.jpg"                       "money growth plant investment"
download "debit-cards-for-kids-hero.jpg"                             "child debit card shopping"
download "financial-literacy-for-teens-workbook-hero.jpg"            "teenager studying financial workbook"
download "financial-literacy-printable-for-kids-hero.jpg"            "child coloring printable worksheet"
download "financial-literacy-stats-for-parents-hero.jpg"             "parent reading financial report"
download "financial-literacy-workbook-for-kids-hero.jpg"             "child writing workbook desk"
download "financial-literacy-workbook-for-kids-pdf-hero.jpg"         "kids learning workbook table"
download "first-job-money-tips-for-teens-hero.jpg"                   "teenager first job workplace"
download "how-to-build-credit-as-a-teenager-hero.jpg"                "teenager credit card wallet"
download "how-to-make-money-as-a-kid-hero.jpg"                       "child lemonade stand entrepreneur"
download "how-to-open-a-bank-account-for-a-child-hero.jpg"           "parent child bank teller"
download "how-to-open-bank-account-for-kids-hero.jpg"                "family bank account opening"
download "how-to-talk-to-kids-about-money-hero.jpg"                  "parent talking to child about money"
download "how-to-teach-a-16-year-old-about-money-hero.jpg"           "sixteen year old teen money budget"
download "how-to-teach-a-5-year-old-about-money-hero.jpg"            "young child coins piggy bank play"
download "how-to-teach-kids-about-budgeting-hero.jpg"                "child budget notebook coins"
download "how-to-teach-kids-about-credit-cards-hero.jpg"             "parent explaining credit card child"
download "how-to-teach-kids-about-debt-hero.jpg"                     "parent child discussing bills debt"
download "how-to-teach-kids-about-earning-money-hero.jpg"            "child doing chores earning money"
download "how-to-teach-kids-about-entrepreneurship-hero.jpg"         "child small business lemonade stand"
download "how-to-teach-kids-about-giving-hero.jpg"                   "child donating coins charity"
download "how-to-teach-kids-about-giving-money-hero.jpg"             "child putting money in donation box"
download "how-to-teach-kids-about-insurance-hero.jpg"                "family protection umbrella insurance"
download "how-to-teach-kids-about-investing-hero.jpg"                "child investing stocks growth"
download "how-to-teach-kids-about-money-hero.jpg"                    "parent teaching child money coins"
download "how-to-teach-kids-about-money-without-an-allowance-hero.jpg" "child learning money no allowance"
download "how-to-teach-kids-about-saving-money-hero.jpg"             "child putting coin in piggy bank"
download "how-to-teach-kids-about-spending-wisely-hero.jpg"          "child shopping wisely budget"
download "how-to-teach-kids-about-stocks-hero.jpg"                   "teenager looking at stock chart"
download "how-to-teach-kids-about-taxes-hero.jpg"                    "parent child taxes paperwork"
download "kids-budget-worksheet-printable-hero.jpg"                  "child budget worksheet pencil"
download "kids-investing-workbook-hero.jpg"                           "child investing workbook writing"
download "kids-money-quiz-hero.jpg"                                   "child quiz pencil test money"
download "kids-money-workbook-pdf-hero.jpg"                           "child workbook pdf printing"
download "money-activities-for-10-year-olds-hero.jpg"                "ten year old money activity game"
download "money-activities-for-5-year-olds-hero.jpg"                 "five year old counting coins"
download "money-goals-for-kids-hero.jpg"                             "child writing money goals list"
download "money-lesson-kids-printable-hero.jpg"                      "child lesson printable activity"
download "money-lessons-for-5-year-olds-hero.jpg"                    "toddler learning coins piggy bank"
download "money-lessons-for-9-year-olds-hero.jpg"                    "nine year old money lesson"
download "money-management-for-kids-printable-hero.jpg"              "child managing money printable"
download "money-management-for-teenagers-hero.jpg"                   "teenager managing money budget"
download "money-personality-quiz-for-kids-hero.jpg"                  "child personality quiz fun"
download "needs-vs-wants-worksheet-for-kids-hero.jpg"                "child needs wants worksheet"
download "roth-ira-for-minors-hero.jpg"                              "teenager retirement savings investment"
download "roth-ira-for-teenagers-hero.jpg"                           "teen roth ira retirement planning"
download "savings-goal-calculator-for-kids-hero.jpg"                 "child savings goal calculator"
download "savings-goal-worksheet-for-kids-hero.jpg"                  "child savings goal worksheet"
download "teach-7-year-old-about-money-hero.jpg"                     "seven year old learning money coins"
download "teach-8-year-old-about-money-hero.jpg"                     "eight year old counting money"
download "teach-kids-about-money-this-weekend-hero.jpg"              "family weekend money activity"
download "teaching-kids-to-save-money-hero.jpg"                      "parent teaching saving piggy bank"
download "teen-financial-education-workbook-hero.jpg"                "teenager financial education book"
download "teen-money-management-workbook-hero.jpg"                   "teenager money workbook studying"
download "what-should-a-13-year-old-know-about-money-hero.jpg"       "thirteen year old money knowledge"
download "what-should-a-16-year-old-know-about-money-hero.jpg"       "sixteen year old financial literacy"

echo ""
echo "Done. Run with --force to re-download existing images."
