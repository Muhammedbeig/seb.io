# SearchEngineBasics.io Contextual Internal Linking Plan

**Website:** https://searchenginebasics.io/
**Primary pillar:** Search Engine Basics
**Purpose:** Create a deliberate hub-and-spoke knowledge graph that helps readers move from foundational search-engine concepts to crawling, indexing, ranking, SERPs, algorithms, SEO, and traffic growth without keyword cannibalization.

---

## 1. Objectives

This plan has six goals:

1. Establish the homepage as the single strongest page for **search engine basics**.
2. Give every article one clear search intent and one primary parent pillar.
3. Pass contextual relevance and internal authority between related pages.
4. Prevent orphan pages and pages that are connected only through menus, cards, or footers.
5. Reduce keyword cannibalization between articles with similar titles.
6. Make internal links editable from the content panel wherever future editorial changes are likely.

Internal links must help a reader complete the next logical learning step. They must not be inserted simply to achieve a fixed number or keyword density.

---

## 2. Final Content Architecture

### Level 0: Primary Site Pillar

| Page | Recommended URL | Primary intent |
|---|---|---|
| Search Engine Basics | `/` | Explain what search engines are and how discovery, crawling, indexing, ranking, and results serving work together |

### Level 1: Supporting Pillars

| Pillar | Recommended URL | Primary intent |
|---|---|---|
| SEO Basics / Manual SEO | `/seo-basics/seo-basics-beginners-guide` | Teach the complete beginner SEO process and how to perform it manually |
| Web Indexing | `/indexing/web-indexing` | Explain how pages enter, remain in, and are retrieved from a search index |
| How to Rank on Google | `/ranking/how-to-rank-higher-on-google` | Provide the overall diagnostic and improvement framework for Google rankings |
| What Does SERP Stand For? | `/serp-basics/what-does-serp-stand-for` | Explain SERPs, result types, features, and visibility |
| What Is a Search Engine Algorithm? | `/algorithms/what-is-a-search-engine-algorithm` | Explain how search algorithms retrieve, evaluate, and order results |
| View Site as Google | `/crawling/how-to-view-your-site-as-googlebot` | Explain methods for seeing fetched and rendered content as Googlebot sees it |
| How to Increase Website Traffic | `/traffic/how-to-increase-website-traffic` | Explain a complete, channel-aware website traffic growth system |

### Level 2: Supporting Articles

| Parent pillar | Article | Recommended URL | Status/action |
|---|---|---|---|
| Search Engine Basics | Importance of Search Engines | `/basics/search-engine-importance` | Keep current URL |
| Search Engine Basics | Parts of a Search Engine | `/basics/parts-of-search-engine` | Keep current URL |
| Search Engine Basics | Browser or Search Engine | `/basics/browser-or-search-engine` | Keep current URL |
| Search Engine Basics | HTML Code for Creating a Search Engine | `/basics/html-code-for-creating-a-search-engine` | Keep current URL |
| Search Engine Basics | List of Search Engines | `/basics/popular-search-engines` | Keep current URL |
| SEO Basics | How to Know If Your SEO Is Working | `/seo-basics/how-to-know-if-your-seo-is-working` | Keep current URL |
| SEO Basics | How to Sell Search Engine Optimization | `/seo-basics/how-to-sell-search-engine-optimization` | Keep current URL |
| SEO Basics | Search Engine Positioning SEO | `/seo-basics/search-engine-positioning-seo` | Keep current URL |
| SEO Basics | How to Search Keywords on a Webpage | `/seo-basics/how-to-search-keywords-on-a-webpage` | Keep current URL |
| SEO Basics | SEO Terms | `/seo-basics/seo-terms` | Keep current URL |
| SEO Basics | Search Engine Optimization 101 | `/seo-basics/search-engine-optimization-101` | Publish as an action-based beginner checklist, not another definition of SEO |
| Web Indexing | Index Searching | `/indexing/index-searching` | Define as information retrieval from an index |
| SEO measurement | SEO Visibility Score | `/seo-basics/seo-visibility-score` | Move to SEO measurement rather than indexing |
| Web Indexing | How to Get My Website on Search Engines | `/indexing/how-to-get-my-website-on-search-engines` | Publish as discovery and inclusion guide |
| Web Indexing | URL Inspection Tools | `/indexing/url-inspection-tools` | Publish as tool and diagnostic comparison |
| Google ranking | How to Get Your Website on Google Search First Position | `/ranking/google-first-position` | Narrow to position-one feasibility and competitive requirements |
| Google ranking | Higher Google | `/ranking/how-to-appear-higher-on-google` | Rename naturally and make it a page-level diagnosis guide |
| SEO measurement | Measure SEO | `/seo-basics/how-to-measure-seo-performance` | Differentiate from “How to Know If Your SEO Is Working” by focusing on KPIs, baselines, and reporting |
| Google ranking | Search Engine Positioning Example | `/ranking/search-engine-positioning-examples` | Use worked examples and before/after scenarios |
| German SEO tools | Suchmaschinenoptimierung Tools | `/de/suchmaschinenoptimierung-tools` | Publish in German only, with correct `lang="de"` and hreflang support |
| SERP | SERP Features Monitor | `/serp-basics/serp-features-monitor` | Focus on tracking feature ownership and volatility |
| SERP | SEO SERP Tool | `/serp-basics/seo-serp-tool` | Focus on evaluating SERP-analysis tools and workflows |
| Local SEO | Local Search Optimization | `/seo-basics/local-search-optimization` | Move out of Algorithms and into SEO Basics |
| Algorithms | Search Algorithms | `/algorithms/search-algorithms` | Explain algorithm families and their purposes |
| Googlebot | Googlebot View | `/crawling/googlebot-view` | Focus narrowly on rendered HTML, screenshots, resources, and troubleshooting |
| Googlebot | Google WMT | `/crawling/google-webmaster-tools` | Explain the legacy name and its transition to Google Search Console |
| Website traffic | How Do You Promote a Website? | `/traffic/how-to-promote-a-website` | Cover promotion channels and selection criteria |
| Website traffic | Website Optimization | `/traffic/website-optimization-for-more-traffic` | Focus on conversion, technical, content, and UX improvements that support traffic growth |

---

## 3. Cannibalization Decisions

These decisions must be applied before publishing the remaining pages.

### “Search engine basics” versus “Basics” series

- The homepage owns **search engine basics** and broad “how search engines work” intent.
- `/basics` must be positioned as **Search Engine Fundamentals Learning Series**, not another competing search-engine-basics guide.
- Supporting articles should link to the homepage when explaining the entire search process.

### SEO Basics versus SEO 101

- The SEO Basics pillar owns the full conceptual roadmap.
- Search Engine Optimization 101 must be an implementation checklist for a beginner’s first setup.
- Do not repeat the same definitions, history, and full SEO framework on both pages.

### How to rank on Google versus “first position” and “higher Google”

- The pillar owns the complete ranking framework.
- “Google First Position” must focus on feasibility, competition, evidence, and why position one cannot be guaranteed.
- “How to Appear Higher on Google” must diagnose pages that already rank but need improvement.
- If either supporting draft repeats the pillar’s complete process, merge it into the pillar and redirect the unused URL.

### SEO measurement pages

- “How to Know If Your SEO Is Working” owns interpretation and diagnosis.
- “How to Measure SEO Performance” owns KPI definitions, calculations, baselines, dashboards, and reporting cadence.
- “SEO Visibility Score” owns the visibility metric, its calculation, limitations, and examples.
- These three pages must cross-link but must not reuse the same sections word for word.

### View Site as Google versus Googlebot View

- The pillar compares all available methods.
- Googlebot View is the hands-on rendered-page diagnostic.
- If the Googlebot View draft is only a shorter version of the pillar, merge and redirect it.

### Suchmaschinenoptimierung Tools

- Do not publish an English article solely to target this German query.
- Publish a genuinely German page under `/de/` only when the site supports German metadata, navigation, canonicals, and hreflang.
- Until then, keep this page in draft status.

---

## 4. Global Contextual Linking Rules

1. Every supporting article must link to its parent pillar within the first 25–35% of the body.
2. Every supporting article should link to two to five closely related sibling pages where those pages answer the reader’s next question.
3. Every supporting pillar should link to the homepage when it first introduces the complete search-engine pipeline.
4. Pillar pages should link to every direct child from relevant explanatory sections, not only from a card grid at the end.
5. Category pages must link to their pillar first and then every published article in the series.
6. Use descriptive anchors that read naturally. Do not repeatedly use an exact-match keyword.
7. Do not place several internal links next to each other in a single sentence.
8. Do not add links inside every heading or every paragraph.
9. Do not use “click here,” “read more,” or “this article” as the primary contextual anchor.
10. A normal supporting article will usually need four to eight useful contextual links. A long pillar may need eight to fifteen. Relevance decides the final count.
11. Footer, menu, breadcrumb, table-of-contents, tag, and related-card links do not replace links inside the main article text.
12. When an article is unpublished, do not create a live internal link to its future URL. Add the connection when the destination is published.

---

## 5. Primary Homepage Linking Plan

### Search Engine Basics — `/`

The homepage must provide the shortest path to every major concept.

| Source section | Destination | Suggested anchor examples |
|---|---|---|
| Definition and importance | `/basics/search-engine-importance` | why search engines are important; importance of search engines |
| Components overview | `/basics/parts-of-search-engine` | core parts of a search engine; search engine components |
| Search engine definition | `/basics/browser-or-search-engine` | browser and search engine difference; browser versus search engine |
| Practical example or interactive section | `/basics/html-code-for-creating-a-search-engine` | build a simple search engine; search engine HTML example |
| Search provider examples | `/basics/popular-search-engines` | popular search engines; compare search engines |
| Website-owner transition | `/seo-basics/seo-basics-beginners-guide` | SEO basics for beginners; practical SEO roadmap |
| Indexing stage | `/indexing/web-indexing` | how web indexing works; search engine indexing |
| Ranking stage | `/ranking/how-to-rank-higher-on-google` | how to rank higher on Google; Google ranking framework |
| Result presentation | `/serp-basics/what-does-serp-stand-for` | what a SERP is; search engine results page |
| Algorithm section | `/algorithms/what-is-a-search-engine-algorithm` | how search algorithms rank results; search engine algorithms |
| Rendering or diagnostics | `/crawling/how-to-view-your-site-as-googlebot` | see a page as Googlebot; view your site as Google |
| Outcomes and growth | `/traffic/how-to-increase-website-traffic` | increase qualified website traffic; website traffic growth |

Every supporting pillar should link back to `/` using a natural variation such as “search engine basics,” “how search engines work,” or “the complete search process.”

---

## 6. Search Engine Fundamentals Cluster

### Importance of Search Engines — `/basics/search-engine-importance`

Required contextual destinations:

- `/` — anchor: **how search engines work**
- `/basics/parts-of-search-engine` — anchor: **the parts that make search possible**
- `/basics/popular-search-engines` — anchor: **different search engines people use**
- `/seo-basics/seo-basics-beginners-guide` — anchor: **why SEO matters to website owners**
- `/traffic/how-to-increase-website-traffic` — anchor: **turn search visibility into website traffic**

### Parts of a Search Engine — `/basics/parts-of-search-engine`

Required contextual destinations:

- `/` — anchor: **complete search engine process**
- `/indexing/web-indexing` — anchor: **how the search index stores pages**
- `/algorithms/what-is-a-search-engine-algorithm` — anchor: **ranking and retrieval algorithms**
- `/crawling/how-to-view-your-site-as-googlebot` — anchor: **what a crawler receives from a page**
- `/basics/html-code-for-creating-a-search-engine` — anchor: **build a simplified search engine**

### Browser or Search Engine — `/basics/browser-or-search-engine`

Required contextual destinations:

- `/` — anchor: **search engine basics**
- `/basics/popular-search-engines` — anchor: **examples of search engines**
- `/serp-basics/what-does-serp-stand-for` — anchor: **results shown after a search**
- `/basics/html-code-for-creating-a-search-engine` — anchor: **how a search interface works**

### HTML Code for Creating a Search Engine — `/basics/html-code-for-creating-a-search-engine`

Required contextual destinations:

- `/basics/parts-of-search-engine` — anchor: **components of a real search engine**
- `/indexing/index-searching` — anchor: **searching an indexed collection**
- `/algorithms/search-algorithms` — anchor: **algorithms used to match results**
- `/` — anchor: **how full-scale search engines work**
- `/traffic/website-optimization-for-more-traffic` — anchor: **optimize an on-site search experience** when contextually relevant

### List of Search Engines — `/basics/popular-search-engines`

Required contextual destinations:

- `/` — anchor: **how web search engines work**
- `/basics/search-engine-importance` — anchor: **why search engines matter**
- `/basics/browser-or-search-engine` — anchor: **search engine versus browser**
- `/serp-basics/what-does-serp-stand-for` — anchor: **how search result pages differ**

---

## 7. SEO Basics Cluster

### SEO Basics / Manual SEO Pillar — `/seo-basics/seo-basics-beginners-guide`

Contextually link to:

- `/` when explaining how search engines discover, index, and rank pages.
- `/seo-basics/search-engine-optimization-101` in the beginner action-plan section.
- `/seo-basics/how-to-search-keywords-on-a-webpage` in keyword and on-page research sections.
- `/seo-basics/search-engine-positioning-seo` in ranking improvement sections.
- `/seo-basics/how-to-know-if-your-seo-is-working` in measurement sections.
- `/seo-basics/how-to-measure-seo-performance` in analytics and reporting sections.
- `/seo-basics/seo-visibility-score` in visibility measurement sections.
- `/seo-basics/seo-terms` when introducing unfamiliar terminology.
- `/seo-basics/local-search-optimization` in the local SEO section.
- `/seo-basics/how-to-sell-search-engine-optimization` only in a section written for consultants or agencies.
- `/indexing/web-indexing`, `/ranking/how-to-rank-higher-on-google`, and `/traffic/how-to-increase-website-traffic` as the next advanced learning paths.

### How to Know If Your SEO Is Working

Link to:

- SEO Basics pillar — **complete SEO process**
- `/seo-basics/how-to-measure-seo-performance` — **measure SEO performance consistently**
- `/seo-basics/seo-visibility-score` — **understand an SEO visibility score**
- `/serp-basics/serp-features-monitor` — **monitor changing SERP features**
- `/ranking/how-to-rank-higher-on-google` — **diagnose weak Google rankings**
- `/traffic/how-to-increase-website-traffic` — **connect rankings with qualified traffic**

### How to Sell Search Engine Optimization

Link to:

- SEO Basics pillar — **what a complete SEO service includes**
- `/seo-basics/how-to-know-if-your-seo-is-working` — **prove whether SEO is working**
- `/seo-basics/how-to-measure-seo-performance` — **report meaningful SEO KPIs**
- `/seo-basics/search-engine-positioning-seo` — **search positioning work**
- `/seo-basics/seo-terms` — **SEO terminology clients may hear**

### Search Engine Positioning SEO

Link to:

- SEO Basics pillar — **SEO fundamentals supporting positioning**
- `/ranking/how-to-rank-higher-on-google` — **complete Google ranking framework**
- `/ranking/search-engine-positioning-examples` — **worked search-positioning examples**
- `/seo-basics/how-to-search-keywords-on-a-webpage` — **inspect a page’s keyword targeting**
- `/serp-basics/seo-serp-tool` — **analyze the current result page**
- `/serp-basics/serp-features-monitor` — **track SERP feature changes**

### How to Search Keywords on a Webpage

Link to:

- SEO Basics pillar — **manual on-page SEO workflow**
- `/seo-basics/seo-terms` — **keyword and SEO definitions**
- `/indexing/url-inspection-tools` — **inspect the indexed version of a URL**
- `/crawling/how-to-view-your-site-as-googlebot` — **compare browser content with Googlebot’s view**
- `/seo-basics/search-engine-positioning-seo` — **use the findings to improve positioning**

### SEO Terms

The glossary can link individual definitions to authoritative pillar pages. Do not turn every term into a link.

Priority destinations:

- Search engine → `/`
- SEO → SEO Basics pillar
- Crawling/Googlebot → View Site as Google pillar
- Index/indexing/canonical → Web Indexing pillar
- Ranking → How to Rank on Google pillar
- SERP → What Does SERP Stand For pillar
- Algorithm/PageRank → Search Engine Algorithm pillar
- Organic traffic → Website Traffic pillar
- Search visibility → SEO Visibility Score

### Search Engine Optimization 101

Link to:

- SEO Basics pillar — **learn the complete SEO framework**
- `/indexing/how-to-get-my-website-on-search-engines` — **get a new site discovered**
- `/seo-basics/how-to-search-keywords-on-a-webpage` — **check page keywords**
- `/indexing/url-inspection-tools` — **inspect the first important URLs**
- `/seo-basics/how-to-know-if-your-seo-is-working` — **check early SEO progress**

### SEO Visibility Score

Link to:

- `/seo-basics/how-to-know-if-your-seo-is-working`
- `/seo-basics/how-to-measure-seo-performance`
- `/serp-basics/seo-serp-tool`
- `/serp-basics/serp-features-monitor`
- `/ranking/how-to-rank-higher-on-google`

### How to Measure SEO Performance

Link to:

- `/seo-basics/how-to-know-if-your-seo-is-working`
- `/seo-basics/seo-visibility-score`
- `/traffic/how-to-increase-website-traffic`
- `/serp-basics/serp-features-monitor`
- `/ranking/search-engine-positioning-examples`

### Local Search Optimization

Link to:

- SEO Basics pillar
- `/ranking/how-to-rank-higher-on-google`
- `/seo-basics/how-to-measure-seo-performance`
- `/traffic/how-to-increase-website-traffic`
- `/serp-basics/what-does-serp-stand-for`

---

## 8. Web Indexing Cluster

### Web Indexing Pillar — `/indexing/web-indexing`

Contextually link to:

- `/` — **where indexing fits in the search process**
- `/indexing/index-searching` — **how a search system retrieves indexed documents**
- `/indexing/how-to-get-my-website-on-search-engines` — **help search engines discover a website**
- `/indexing/url-inspection-tools` — **inspect whether a URL is indexed**
- `/crawling/how-to-view-your-site-as-googlebot` — **check the rendered content before indexing**
- `/ranking/how-to-rank-higher-on-google` — **what happens after a page becomes indexable**

### Index Searching

Link to:

- Web Indexing pillar — **how a web search index is built**
- `/basics/parts-of-search-engine` — **the index and retrieval components**
- `/algorithms/search-algorithms` — **algorithms that retrieve matching documents**
- `/algorithms/what-is-a-search-engine-algorithm` — **how retrieved candidates are ranked**

### How to Get My Website on Search Engines

Link to:

- Web Indexing pillar — **website indexing process**
- `/crawling/how-to-view-your-site-as-googlebot` — **confirm crawlers can see the page**
- `/indexing/url-inspection-tools` — **inspect an important URL**
- `/crawling/google-webmaster-tools` — **use the modern Search Console workflow**
- `/ranking/how-to-rank-higher-on-google` — **improve visibility after indexing**

### URL Inspection Tools

Link to:

- Web Indexing pillar — **understand indexing status**
- `/indexing/how-to-get-my-website-on-search-engines` — **submit and monitor a new website**
- `/crawling/how-to-view-your-site-as-googlebot` — **see what Google can render**
- `/crawling/googlebot-view` — **inspect rendered HTML and resources**
- `/crawling/google-webmaster-tools` — **Google Webmaster Tools and Search Console**

---

## 9. Google Ranking Cluster

### How to Rank on Google Pillar — `/ranking/how-to-rank-higher-on-google`

Contextually link to:

- `/` when explaining crawling, indexing, and ranking as separate stages.
- Web Indexing pillar in the eligibility section.
- SEO Basics pillar in the optimization section.
- `/ranking/google-first-position` in the competition and feasibility section.
- `/ranking/how-to-appear-higher-on-google` in the striking-distance section.
- `/ranking/search-engine-positioning-examples` in the examples section.
- `/seo-basics/how-to-measure-seo-performance` in the measurement section.
- SERP pillar in the result-layout and click-through section.
- Algorithms pillar in the ranking-systems section.
- Website Traffic pillar when distinguishing rankings from useful traffic.

### Google First Position

Link to:

- How to Rank on Google pillar — **complete ranking improvement framework**
- Web Indexing pillar — **confirm the page is eligible for ranking**
- `/seo-basics/search-engine-positioning-seo` — **improve an existing search position**
- `/serp-basics/seo-serp-tool` — **evaluate the position-one competitors**
- `/seo-basics/how-to-measure-seo-performance` — **measure gains beyond one keyword**

### How to Appear Higher on Google

Link to:

- How to Rank on Google pillar
- `/seo-basics/search-engine-positioning-seo`
- `/seo-basics/how-to-search-keywords-on-a-webpage`
- `/indexing/url-inspection-tools`
- `/serp-basics/serp-features-monitor`

### Search Engine Positioning Examples

Link to:

- How to Rank on Google pillar
- `/seo-basics/search-engine-positioning-seo`
- `/seo-basics/how-to-measure-seo-performance`
- `/seo-basics/seo-visibility-score`
- `/serp-basics/seo-serp-tool`

### Suchmaschinenoptimierung Tools

When the German section is ready, link to German equivalents rather than placing numerous German anchors inside English articles. One natural cross-language link may appear in an international-resource section. Add reciprocal hreflang annotations between true language equivalents only.

---

## 10. SERP Cluster

### What Does SERP Stand For? — `/serp-basics/what-does-serp-stand-for`

Contextually link to:

- `/` — **how search engines produce results**
- `/serp-basics/serp-features-monitor` — **monitor SERP features**
- `/serp-basics/seo-serp-tool` — **analyze a live SERP**
- `/ranking/how-to-rank-higher-on-google` — **improve organic ranking visibility**
- `/algorithms/what-is-a-search-engine-algorithm` — **how results are selected and ordered**

### SERP Features Monitor

Link to:

- SERP pillar
- `/serp-basics/seo-serp-tool`
- `/seo-basics/how-to-know-if-your-seo-is-working`
- `/seo-basics/seo-visibility-score`
- `/ranking/search-engine-positioning-examples`

### SEO SERP Tool

Link to:

- SERP pillar
- `/serp-basics/serp-features-monitor`
- `/seo-basics/how-to-search-keywords-on-a-webpage`
- `/seo-basics/search-engine-positioning-seo`
- `/ranking/google-first-position`

---

## 11. Search Algorithms Cluster

### Search Engine Algorithm Pillar — `/algorithms/what-is-a-search-engine-algorithm`

Contextually link to:

- `/` — **the full search-engine pipeline**
- `/algorithms/search-algorithms` — **major types of search algorithms**
- `/basics/parts-of-search-engine` — **where algorithms fit in the system**
- Web Indexing pillar — **the collection algorithms search**
- Google Ranking pillar — **practical ranking improvements**
- SERP pillar — **how ordered results are presented**

### Search Algorithms

Link to:

- Search Engine Algorithm pillar
- `/basics/parts-of-search-engine`
- `/indexing/index-searching`
- Web Indexing pillar
- SERP pillar

Local Search Optimization does not belong in this cluster. It should link to the algorithm pillar only when explaining local ranking systems.

---

## 12. Googlebot and Crawling Cluster

### View Site as Google Pillar — `/crawling/how-to-view-your-site-as-googlebot`

Contextually link to:

- `/` — **where crawling and rendering fit in search**
- `/crawling/googlebot-view` — **run a detailed Googlebot-view test**
- `/crawling/google-webmaster-tools` — **use the modern Search Console tools**
- Web Indexing pillar — **how rendered content reaches the index**
- `/indexing/url-inspection-tools` — **compare URL inspection tools**
- `/indexing/how-to-get-my-website-on-search-engines` — **help a website get discovered**

### Googlebot View

Link to:

- View Site as Google pillar
- `/indexing/url-inspection-tools`
- Web Indexing pillar
- `/basics/parts-of-search-engine`
- `/crawling/google-webmaster-tools`

### Google WMT / Google Webmaster Tools

Link to:

- View Site as Google pillar
- `/indexing/url-inspection-tools`
- `/indexing/how-to-get-my-website-on-search-engines`
- `/seo-basics/how-to-know-if-your-seo-is-working`
- `/seo-basics/how-to-measure-seo-performance`

---

## 13. Website Traffic Cluster

### How to Increase Website Traffic Pillar — `/traffic/how-to-increase-website-traffic`

Contextually link to:

- SEO Basics pillar — **build sustainable organic visibility**
- Google Ranking pillar — **improve Google rankings**
- `/traffic/how-to-promote-a-website` — **promote a website through the right channels**
- `/traffic/website-optimization-for-more-traffic` — **optimize the site for traffic and engagement**
- `/seo-basics/how-to-know-if-your-seo-is-working` — **judge traffic quality and outcomes**
- `/seo-basics/how-to-measure-seo-performance` — **measure organic growth accurately**

### How Do You Promote a Website?

Link to:

- Website Traffic pillar
- `/traffic/website-optimization-for-more-traffic`
- SEO Basics pillar
- `/seo-basics/local-search-optimization`
- `/seo-basics/how-to-measure-seo-performance`

### Website Optimization for More Traffic

Link to:

- Website Traffic pillar
- SEO Basics pillar
- Web Indexing pillar
- Google Ranking pillar
- `/serp-basics/seo-serp-tool`
- `/seo-basics/how-to-know-if-your-seo-is-working`

---

## 14. Cross-Cluster Bridge Map

| From cluster | Link to cluster | Use when discussing |
|---|---|---|
| Search Engine Basics | Crawling | Discovery, fetching, rendering, Googlebot |
| Search Engine Basics | Indexing | Storage, canonical selection, index eligibility |
| Search Engine Basics | Algorithms | Retrieval, evaluation, ranking systems |
| Search Engine Basics | SERP | Results presentation and search features |
| SEO Basics | Indexing | Technical eligibility and index coverage |
| SEO Basics | Ranking | Page improvement and competitive visibility |
| SEO Basics | Traffic | Business outcomes and qualified visits |
| Crawling | Indexing | Rendered HTML, blocked resources, canonical processing |
| Indexing | Ranking | Eligibility versus competitiveness |
| Algorithms | SERP | How ordered candidates become visible results |
| Ranking | SERP | Position, result format, CTR, SERP features |
| Ranking | Traffic | Why rankings do not automatically produce useful visits |
| SERP | Measurement | Visibility, feature ownership, impressions, clicks |

---

## 15. Anchor Text Standards

Use a varied mix of anchors.

### Exact or close-match anchors

Use sparingly where the phrase fits naturally:

- search engine basics
- web indexing
- how to rank higher on Google
- search engine algorithm
- SEO basics
- SERP features

### Partial-match anchors

Preferred for most links:

- how search engines discover pages
- why a URL may not enter the index
- diagnose weak Google visibility
- understand modern result-page features
- inspect what Googlebot can render

### Natural or sentence anchors

Use when directing the reader to the next step:

- see how the indexing stage works in detail
- compare the main ways to inspect a URL
- follow the complete beginner SEO workflow
- learn what happens after a crawler fetches the page

Do not use the same exact anchor every time a destination is linked.

---

## 16. Panel Requirements for Internal Links

Future editorial changes should be manageable without a code deployment.

Each article record should support:

- `parent_pillar_id`: one primary parent pillar.
- `related_article_ids`: ordered list of manually selected related pages.
- `related_heading`: editable related-content module heading.
- `related_intro`: optional short module introduction.
- Rich-text contextual links inside the article body.
- Draft-safe behavior that hides links to unpublished pages.
- A redirect field for merged or retired article URLs.
- A report showing pages with no inbound contextual links.
- A report showing broken internal URLs.

Do not automatically inject exact-match links into arbitrary paragraphs. Related cards may be automated, but contextual body links must remain editorial.

---

## 17. Social Settings Requirements

The following links should be stored in panel-managed site settings rather than hard-coded into public components:

- TikTok: `https://www.tiktok.com/@searchenginebasics.io`
- X: `https://x.com/searchenginebas`
- Instagram: `https://www.instagram.com/searchenginebasics.io/`
- Facebook: `https://web.facebook.com/profile.php?id=61594221773518`

Panel fields used by the current codebase:

- `tiktok_link`
- `x_link`
- `instagram_link`
- `facebook_link`

Implementation requirements:

1. Validate that each value is an HTTPS URL.
2. Allow an empty value to hide an icon cleanly.
3. Use the same values in the website footer/header and Organization `sameAs` schema.
4. Add accessible platform labels to icon links.
5. Open external social links safely with `rel="noopener noreferrer"`.

---

## 18. Technical SEO Remediation That Must Accompany Linking

Internal linking will not work correctly until canonical signals are repaired.

1. Add self-referencing canonicals to `/blog`, `/series`, `/authors`, and every author profile.
2. Stop canonicalizing privacy, terms, blog, series, and author pages to `/`.
3. Redirect every `www` URL to the equivalent non-`www` URL with a permanent path-preserving redirect.
4. Keep only canonical, indexable, HTTP-200 URLs in the XML sitemap.
5. Confirm retired `/search-engine-crawling/` URLs return true HTTP 404/410 responses or redirect to exact replacements.
6. Add a visible writer byline and optional reviewer attribution to each article.
7. Point Article `author` schema to a self-canonical Person/ProfilePage entity.
8. Add distinct metadata to category hubs currently using generic titles or missing descriptions.
9. Reduce unnecessary homepage JavaScript and defer noncritical interactive code.

---

## 19. Publishing Workflow

For every new article:

1. Confirm that its intent does not duplicate an existing page.
2. Assign one parent pillar in the panel.
3. Add a contextual link from the parent pillar to the new article.
4. Add a contextual link from the new article back to its parent.
5. Add two to five sibling or cross-cluster links.
6. Add at least one contextual inbound link from an older relevant article.
7. Confirm the breadcrumb matches the chosen cluster.
8. Confirm the canonical is self-referencing.
9. Confirm the URL appears in the sitemap only after publication.
10. Inspect the rendered page and all internal destinations.
11. Request indexing for priority pages only after all links and metadata are correct.

---

## 20. Monthly Internal-Link Audit

Check the following every month:

- Pages with zero contextual inbound links.
- Pages linked only from navigation or the footer.
- Broken internal links and redirect chains.
- Links pointing to noncanonical URLs.
- Multiple articles targeting the same query and intent.
- Pillars that do not link to all published child articles.
- Child articles that do not link back to their parent pillar.
- Overused exact-match anchors.
- Old articles that could support newly published pages.
- Important pages more than three clicks from the homepage.

---

## 21. Completion Standard

The internal-link system is complete when:

- Every article has one documented search intent.
- Every article has one parent pillar.
- Every pillar links contextually to every direct child.
- Every child links contextually to its pillar.
- Every child has at least two meaningful sibling or cross-cluster connections.
- No published page is orphaned.
- No internal link points to a redirect, 404, noncanonical hostname, or unpublished URL.
- The panel can update social profiles, parent relationships, related-content modules, and redirects without editing source code.
