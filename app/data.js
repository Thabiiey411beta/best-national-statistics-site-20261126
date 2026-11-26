/* South Africa in Numbers — data file.
   Every figure below was researched from the named official source and
   carries its release date in the SOURCES section of the site.
   Nothing here is estimated by this site: where a figure is derived
   (density, shares) it is arithmetic on the published numbers. */

const SA = {
  updated: "26 November 2026",
  population: {
    total: 63100945,
    totalDisplay: "63.1 million",
    growth: 1.23,
    medianAge: 28.7,
    under15: 25.6,
    age15to64: 66.7,
    age65plus: 7.1,
    lifeExpectancy: 66.9,
    lifeMale: 64.0,
    lifeFemale: 69.6,
    hiv: 8.15,          // million people living with HIV
    hivShare: 12.9,     // % of total population
    hiv15to49: 18.1,    // % prevalence, ages 15-49
    groups: [
      { name: "Black African", share: 81.8 },
      { name: "Coloured", share: 8.5 },
      { name: "White", share: 7.1 },
      { name: "Indian / Asian", share: 2.6 }
    ],
    source: "Stats SA, Mid-year population estimates 2025 (P0302), released 28 July 2025; median age: UN World Population Prospects 2024"
  },

  provinces: [
    { code: "GP",  name: "Gauteng",       capital: "Johannesburg",    pop: 16104933, share: 25.5, area: 18178,  unemp: 35.7, lu3: 41.0, largest: "Johannesburg" },
    { code: "KZN", name: "KwaZulu-Natal", capital: "Pietermaritzburg", pop: 12232247, share: 19.4, area: 94361,  unemp: 33.3, lu3: 49.2, largest: "Durban" },
    { code: "WC",  name: "Western Cape",  capital: "Cape Town",       pop: 7627688,  share: 12.1, area: 129462, unemp: 19.4, lu3: 25.2, largest: "Cape Town" },
    { code: "EC",  name: "Eastern Cape",  capital: "Bhisho",          pop: 7090788,  share: 11.2, area: 168966, unemp: 44.3, lu3: 51.8, largest: "Gqeberha" },
    { code: "LP",  name: "Limpopo",       capital: "Polokwane",       pop: 6366192,  share: 10.1, area: 125754, unemp: 30.2, lu3: 46.1, largest: "Polokwane" },
    { code: "MP",  name: "Mpumalanga",    capital: "Mbombela",        pop: 5076133,  share: 8.0,  area: 76495,  unemp: 37.8, lu3: 49.2, largest: "Mbombela" },
    { code: "NW",  name: "North West",    capital: "Mahikeng",        pop: 4183947,  share: 6.6,  area: 104882, unemp: 38.1, lu3: 55.0, largest: "Rustenburg" },
    { code: "FS",  name: "Free State",    capital: "Bloemfontein",    pop: 3039834,  share: 4.8,  area: 129825, unemp: 39.1, lu3: 46.5, largest: "Bloemfontein" },
    { code: "NC",  name: "Northern Cape", capital: "Kimberley",       pop: 1379183,  share: 2.2,  area: 372889, unemp: 30.0, lu3: 48.1, largest: "Kimberley" }
  ],
  provinceSources: "Population & share: Stats SA, Mid-year population estimates 2025 (P0302), 28 Jul 2025. Area: Stats SA Census 2022 provincial areas. Unemployment (official) & LU3: Stats SA, Quarterly Labour Force Survey Q3 2026 (P0211), 10 Nov 2026.",

  labour: {
    official: 33.7, employed: 16.8, unemployed: 8.578, labourForce: 25.4,
    youth15to24: 63.6, youth15to34: 47.3, lu2: 36.5, lu3: 44.0, lu4: 46.3,
    previous: 33.6, // Q2 2026
    trend: [
      { q: "Q2 2025", v: 33.2 }, { q: "Q3 2025", v: 31.9 }, { q: "Q4 2025", v: 31.4 },
      { q: "Q1 2026", v: 32.7 }, { q: "Q2 2026", v: 33.6 }, { q: "Q3 2026", v: 33.7 }
    ],
    source: "Stats SA, Quarterly Labour Force Survey, Q3 2026 (P0211), released 10 November 2026; earlier quarters from the same release series"
  },

  gdp: {
    nominalZar: "R8.04 trillion", nominalYear: 2025,
    nominalUsd2024: "$401 billion", perCapitaUsd2024: "$6,316",
    growth: [
      { y: "2020", v: -6.8 }, { y: "2021", v: 4.5 }, { y: "2022", v: 2.2 },
      { y: "2023", v: 0.6 }, { y: "2024", v: 0.5 }, { y: "2025", v: 0.9 }
    ],
    source: "Stats SA, GDP benchmarking & rebasing to 2022 (published 2026); nominal US$ and per-capita figures: World Bank, World Development Indicators, 2024"
  },

  cpi: {
    headline: 5.2, month: "October 2026", mom: 0.7, core: 4.2,
    goods: 5.3, services: 5.0, food: 1.4, transport: 15.2, fuel: 42.9,
    housing: 5.2, petrol95: 30.25, diesel: 35.62,
    series2025: [
      { m: "Jan", v: 3.2 }, { m: "Feb", v: 3.2 }, { m: "Mar", v: 2.7 }, { m: "Apr", v: 2.8 },
      { m: "May", v: 2.8 }, { m: "Jun", v: 3.0 }, { m: "Jul", v: 3.5 }, { m: "Aug", v: 3.3 },
      { m: "Sep", v: 3.4 }, { m: "Oct", v: 3.6 }, { m: "Nov", v: 3.5 }, { m: "Dec", v: 3.6 }
    ],
    series2026: [
      { m: "Jan", v: 3.5 }, { m: "Feb", v: 3.0 }, { m: "Mar", v: 3.1 }, { m: "Apr", v: 4.0 },
      { m: "May", v: 4.5 }, { m: "Jun", v: 5.0 }, { m: "Jul", v: 4.3 }, { m: "Aug", v: 4.4 },
      { m: "Sep", v: 4.5 }, { m: "Oct", v: 5.2 }
    ],
    source: "Stats SA, Consumer Price Index, October 2026 (P0141), released 18 November 2026"
  },

  money: {
    repo: 7.25, prime: 10.75, repoNote: "Held 19 Nov 2026, 4–3 vote, after two hikes earlier in 2026",
    source: "South African Reserve Bank, Monetary Policy Committee statement, 19 November 2026"
  },

  trade: {
    surplus2025: 201.6, surplus2024: 197.1, exports: "R2.1 trillion", imports: "R1.9 trillion",
    dec2025surplus: 23.2, dec2025exports: 164.3, dec2025imports: 141.1,
    destinations: [
      { name: "Africa", share: 26.7 }, { name: "European Union", share: 19.0 },
      { name: "China", share: 11.0 }, { name: "United States", share: 7.0 },
      { name: "Japan", share: 5.0 }, { name: "United Kingdom", share: 5.0 }
    ],
    source: "SARS, Merchandise Trade Statistics, December 2025 (released 30 January 2026); destination shares: Dept. of Trade, Industry & Competition briefing to Parliament, November 2026"
  },

  energy: {
    daysNoLoadshedding: 550, runSince: "16 May 2025", eaf: 68.13, surplusMw: 4274,
    hours2025: 26, loadReductionTarget: "March 2027",
    source: "Eskom operational update, 24 November 2026"
  },

  education: {
    matric: 87.3, matricPrev: 82.9, matricYear: 2024, passed: 615429,
    bachelor: 47.8, distinctions: 319651, maths: 69.1,
    topProvince: "Free State (91%)", lowestNote: "Eastern Cape, Limpopo and Mpumalanga each 85%",
    source: "Department of Basic Education, National Senior Certificate results 2024, announced 13 January 2025"
  },

  health: {
    maternal: 89, // deaths per 100,000 live births, 2020
    source: "Department of Health, Budget Vote 2026 (maternal mortality 2020); life expectancy & HIV: Stats SA MYPE 2025"
  }
};
