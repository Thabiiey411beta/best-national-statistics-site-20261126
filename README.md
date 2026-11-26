# South Africa in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Thabiiey411beta/best-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Thabiiey411beta/best-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for **South Africa**, built for the make.fun bounty
[best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
("Make the best national statistics site"). Every figure is real, from the named
official source, with its release date on the page. Figures current to 26 November 2026.

## What the site shows

- **Overview** — six headline indicators: population 63.1m, unemployment 33.7%
  (Q3 2026), CPI 5.2% (Oct 2026), GDP R8.04 trillion, repo rate 7.25%, life
  expectancy 66.9 years; plus an inflation sparkline, the quarterly unemployment
  trend, provincial populations and a latest-releases list.
- **Provinces** — pick any of the nine provinces for population, share, density,
  capital, unemployment and LU3; a sortable table of all nine.
- **Economy** — real GDP growth 2020–2025 (rebased series), CPI month-by-month
  with a 2025/2026 toggle, prices, repo/prime rates, 2025 trade (R201.6bn surplus),
  export destinations, and Eskom's 550 days without load shedding.
- **People** — age structure, population groups, health (life expectancy, HIV),
  matric 2024 (87.3% pass, a record) and work.
- **Compare** — pick two provinces and a measure (population, unemployment, LU3,
  density, share) and get a side-by-side verdict.
- **Sources & dates** — every figure traced to its publication and release date.

## How it runs

Static files under `app/` — `index.html`, `styles.css`, `data.js`, `app.js`.
No build step, no network requests, no external fonts or libraries; charts are
hand-built SVG. `main.ts` (Node 22, standard library only) copies `app/` to
`$MAKEFUN_OUTPUT_DIR`, after checking the entrypoint and its files exist and
that no shipped file references an outside URL:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Headline figures and sources

| Figure | Source |
|---|---|
| Population 63.1m, mid-2025 | Stats SA, Mid-year population estimates 2025 (P0302), 28 Jul 2025 |
| Unemployment 33.7%, Q3 2026 | Stats SA, QLFS Q3 2026 (P0211), 10 Nov 2026 |
| CPI 5.2%, Oct 2026 | Stats SA, Consumer Price Index Oct 2026 (P0141), 18 Nov 2026 |
| GDP R8.04tn, growth +0.9% (2025) | Stats SA, GDP benchmarking & rebasing to 2022 (2026) |
| Repo 7.25%, prime 10.75% | SARB, MPC statement, 19 Nov 2026 |
| Trade surplus R201.6bn (2025) | SARS, Merchandise Trade Statistics, Dec 2025, 30 Jan 2026 |
| 550 days without load shedding | Eskom operational update, 24 Nov 2026 |
| Matric 87.3% (2024) | Dept. of Basic Education, NSC results 2024, 13 Jan 2025 |

This is an independent site, not affiliated with Statistics South Africa or any
source named above. Figures are shown as published; where Stats SA later revised
a series (GDP), the revised series is used and the revision is noted on the page.
