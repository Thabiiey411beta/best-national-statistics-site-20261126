/* South Africa in Numbers — interactions. Pure client-side JS, no network.
   Charts are hand-built SVG from the figures in data.js. */
(function () {
  "use strict";
  var fmt = new Intl.NumberFormat("en-ZA");
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- routing: one page, six sections reached by nav links ---------- */
  var PAGES = ["overview", "provinces", "economy", "people", "compare", "sources"];
  function route() {
    var h = (location.hash || "#overview").replace("#", "");
    if (PAGES.indexOf(h) < 0) h = "overview";
    PAGES.forEach(function (p) {
      var s = $("page-" + p);
      if (s) s.classList.toggle("active", p === h);
    });
    document.querySelectorAll("nav.main a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + h);
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* ---------- tiny SVG helpers ---------- */
  function svgEl(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function lineChart(host, series, opts) {
    var W = 640, H = 240, PL = 44, PR = 12, PT = 14, PB = 28;
    var vals = series.map(function (d) { return d.v; });
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var lo = Math.floor(Math.min(min, opts.floor || min) - 0.5), hi = Math.ceil(max + 0.5);
    var x = function (i) { return PL + i * (W - PL - PR) / (series.length - 1); };
    var y = function (v) { return PT + (hi - v) * (H - PT - PB) / (hi - lo); };
    var svg = svgEl("svg", { "class": "chart", viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.label });
    for (var g = lo; g <= hi; g += (opts.step || 1)) {
      svg.appendChild(svgEl("line", { x1: PL, x2: W - PR, y1: y(g), y2: y(g), "class": "gridline" }));
      var t = svgEl("text", { x: PL - 6, y: y(g) + 4, "text-anchor": "end", "class": "axis" });
      t.textContent = g + "%"; svg.appendChild(t);
    }
    var d = series.map(function (p, i) { return (i ? "L" : "M") + x(i).toFixed(1) + "," + y(p.v).toFixed(1); }).join(" ");
    svg.appendChild(svgEl("path", { d: d, fill: "none", stroke: "#0b3d2e", "stroke-width": 2.5, "stroke-linejoin": "round" }));
    series.forEach(function (p, i) {
      svg.appendChild(svgEl("circle", { cx: x(i), cy: y(p.v), r: 4, fill: "#e8a317", stroke: "#0b3d2e", "stroke-width": 1.5 }));
      var lbl = svgEl("text", { x: x(i), y: H - 8, "text-anchor": "middle", "class": "axis" });
      lbl.textContent = p.m; svg.appendChild(lbl);
      if (i === series.length - 1) {
        var v = svgEl("text", { x: x(i) - 4, y: y(p.v) - 10, "text-anchor": "end", "class": "axis", "font-weight": "bold", fill: "#0b3d2e" });
        v.textContent = p.v.toFixed(1) + "%"; svg.appendChild(v);
      }
    });
    host.innerHTML = ""; host.appendChild(svg);
  }
  function barChart(host, series, opts) {
    var W = 640, H = 250, PL = 40, PR = 8, PT = 18, PB = 28;
    var vals = series.map(function (d) { return d.v; });
    var min = Math.min(0, Math.min.apply(null, vals)), max = Math.max.apply(null, vals);
    var y0 = PT + (max - 0) * (H - PT - PB) / (max - min);
    var y = function (v) { return PT + (max - v) * (H - PT - PB) / (max - min); };
    var svg = svgEl("svg", { "class": "chart", viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": opts.label });
    svg.appendChild(svgEl("line", { x1: PL, x2: W - PR, y1: y0, y2: y0, stroke: "#9aa79e", "stroke-width": 1.5 }));
    var bw = (W - PL - PR) / series.length;
    series.forEach(function (p, i) {
      var bx = PL + i * bw + bw * 0.18, bwid = bw * 0.64;
      var top = Math.min(y(p.v), y0), hgt = Math.abs(y(p.v) - y0);
      svg.appendChild(svgEl("rect", {
        x: bx.toFixed(1), y: top.toFixed(1), width: bwid.toFixed(1), height: Math.max(hgt, 2).toFixed(1),
        rx: 3, fill: p.v < 0 ? "#c0392b" : (p.hot ? "#e8a317" : "#14664a")
      }));
      var vl = svgEl("text", { x: bx + bwid / 2, y: (p.v < 0 ? y0 + 16 : top - 6), "text-anchor": "middle", "class": "axis", "font-weight": "bold" });
      vl.style.fill = p.v < 0 ? "#ffffff" : "#1c2420";
      vl.textContent = (opts.signed && p.v > 0 ? "+" : "") + p.v.toFixed(1) + "%"; svg.appendChild(vl);
      var xl = svgEl("text", { x: bx + bwid / 2, y: H - 8, "text-anchor": "middle", "class": "axis" });
      xl.textContent = p.y || p.q; svg.appendChild(xl);
    });
    host.innerHTML = ""; host.appendChild(svg);
  }

  /* ---------- overview ---------- */
  function sparkline(host, series) {
    var W = 200, H = 44, vals = series.map(function (d) { return d.v; });
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var x = function (i) { return 4 + i * (W - 8) / (series.length - 1); };
    var y = function (v) { return 4 + (max - v) * (H - 10) / (max - min || 1); };
    var d = series.map(function (p, i) { return (i ? "L" : "M") + x(i).toFixed(1) + "," + y(p.v).toFixed(1); }).join(" ");
    host.innerHTML = '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="CPI sparkline"><path d="' + d + '" fill="none" stroke="#0b3d2e" stroke-width="2.5"/></svg>';
  }
  sparkline($("cpi-spark"), SA.cpi.series2026);
  barChart($("unemp-chart"), SA.labour.trend, { label: "Official unemployment rate by quarter" });

  var provSorted = SA.provinces.slice().sort(function (a, b) { return b.pop - a.pop; });
  $("prov-bars").innerHTML = provSorted.map(function (p) {
    var pct = (p.pop / provSorted[0].pop * 100).toFixed(1);
    return '<div class="bar-row"><span>' + p.name + '</span><span class="bar"><i style="width:' + pct + '%"></i></span><span class="num">' + (p.pop / 1e6).toFixed(1) + 'm</span></div>';
  }).join("");

  /* ---------- provinces ---------- */
  var provList = $("prov-list"), provDetail = $("prov-detail");
  SA.provinces.forEach(function (p) {
    var b = document.createElement("button");
    b.type = "button"; b.textContent = p.name;
    b.addEventListener("click", function () { showProvince(p.code); });
    b.dataset.code = p.code;
    provList.appendChild(b);
  });
  function showProvince(code) {
    var p = SA.provinces.filter(function (x) { return x.code === code; })[0];
    if (!p) return;
    provList.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.code === code);
    });
    var density = Math.round(p.pop / p.area);
    var vsNat = (p.unemp - SA.labour.official);
    provDetail.innerHTML =
      "<h3>" + p.name + " <span style='color:var(--muted);font-weight:400'>(" + p.code + ")</span></h3>" +
      "<p class='note'>Capital " + p.capital + " · largest city " + p.largest + " · " + fmt.format(p.area) + " km²</p>" +
      "<div class='detail-grid'>" +
      "<div class='stat'><b>" + (p.pop / 1e6).toFixed(2) + "m</b><span>people · " + p.share + "% of South Africa</span></div>" +
      "<div class='stat'><b>" + fmt.format(density) + "</b><span>people per km²</span></div>" +
      "<div class='stat'><b>" + p.unemp.toFixed(1) + "%</b><span>unemployment (official)</span></div>" +
      "<div class='stat'><b>" + p.lu3.toFixed(1) + "%</b><span>unemployment + potential labour force (LU3)</span></div>" +
      "</div>" +
      "<p style='margin-top:12px'>Unemployment in " + p.name + " is " + Math.abs(vsNat).toFixed(1) +
      " points " + (vsNat > 0 ? "above" : vsNat < 0 ? "below" : "equal to") +
      " the national rate of " + SA.labour.official.toFixed(1) + "%.</p>" +
      "<p class='source'><b>Sources:</b> " + SA.provinceSources + "</p>";
  }
  showProvince("GP");

  /* sortable province table */
  var sortKey = "pop", sortDir = -1;
  function renderProvTable() {
    var rows = SA.provinces.slice().sort(function (a, b) {
      var av = sortKey === "density" ? a.pop / a.area : a[sortKey];
      var bv = sortKey === "density" ? b.pop / b.area : b[sortKey];
      return (av - bv) * sortDir;
    });
    $("prov-table-body").innerHTML = rows.map(function (p) {
      return "<tr><td>" + p.name + "</td><td>" + fmt.format(p.pop) + "</td><td>" + p.share.toFixed(1) + "%</td>" +
        "<td>" + fmt.format(Math.round(p.pop / p.area)) + "</td><td>" + p.unemp.toFixed(1) + "%</td><td>" + p.lu3.toFixed(1) + "%</td></tr>";
    }).join("");
    document.querySelectorAll("#prov-table th button").forEach(function (b) {
      b.textContent = b.textContent.replace(/ [▲▼]$/, "") + (b.dataset.key === sortKey ? (sortDir === 1 ? " ▲" : " ▼") : "");
    });
  }
  document.querySelectorAll("#prov-table th button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (sortKey === b.dataset.key) sortDir *= -1;
      else { sortKey = b.dataset.key; sortDir = -1; }
      renderProvTable();
    });
  });
  renderProvTable();

  /* ---------- economy ---------- */
  barChart($("gdp-chart"), SA.gdp.growth, { label: "Real GDP growth by year", signed: true });
  var cpiYear = "2026";
  function renderCpi() {
    lineChart($("cpi-chart"), cpiYear === "2026" ? SA.cpi.series2026 : SA.cpi.series2025,
      { label: "Annual CPI inflation, " + cpiYear, floor: 2, step: 1 });
    $("cpi-note").textContent = cpiYear === "2026"
      ? "2026 to October: inflation climbed from 3.5% in January to 5.2% in October, driven by fuel — up 42.9% year on year."
      : "2025 average inflation was 3.2% for the year; the rate never left the 2.7%–3.6% band.";
    document.querySelectorAll("[data-cpi-year]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.cpiYear === cpiYear);
    });
  }
  document.querySelectorAll("[data-cpi-year]").forEach(function (b) {
    b.addEventListener("click", function () { cpiYear = b.dataset.cpiYear; renderCpi(); });
  });
  renderCpi();
  $("trade-bars").innerHTML = SA.trade.destinations.map(function (d) {
    return '<div class="bar-row"><span>' + d.name + '</span><span class="bar"><i class="gold" style="width:' + (d.share / 26.7 * 100).toFixed(1) + '%"></i></span><span class="num">' + d.share.toFixed(1) + '%</span></div>';
  }).join("");

  /* ---------- people ---------- */
  var age = [
    { name: "Under 15", v: SA.population.under15 },
    { name: "Ages 15–64", v: SA.population.age15to64 },
    { name: "65 and over", v: SA.population.age65plus }
  ];
  $("age-bars").innerHTML = age.map(function (a) {
    return '<div class="bar-row"><span>' + a.name + '</span><span class="bar"><i style="width:' + (a.v / 66.7 * 100).toFixed(1) + '%"></i></span><span class="num">' + a.v.toFixed(1) + '%</span></div>';
  }).join("");
  $("group-bars").innerHTML = SA.population.groups.map(function (g) {
    return '<div class="bar-row"><span>' + g.name + '</span><span class="bar"><i style="width:' + (g.share / 81.8 * 100).toFixed(1) + '%"></i></span><span class="num">' + g.share.toFixed(1) + '%</span></div>';
  }).join("");

  /* ---------- compare ---------- */
  var METRICS = {
    pop:    { label: "Population", fmt: function (p) { return fmt.format(p.pop); }, val: function (p) { return p.pop; } },
    unemp:  { label: "Unemployment (official)", fmt: function (p) { return p.unemp.toFixed(1) + "%"; }, val: function (p) { return p.unemp; }, lowerBetter: true },
    lu3:    { label: "Unemployment + potential labour force (LU3)", fmt: function (p) { return p.lu3.toFixed(1) + "%"; }, val: function (p) { return p.lu3; }, lowerBetter: true },
    density:{ label: "People per km²", fmt: function (p) { return fmt.format(Math.round(p.pop / p.area)); }, val: function (p) { return p.pop / p.area; } },
    share:  { label: "Share of national population", fmt: function (p) { return p.share.toFixed(1) + "%"; }, val: function (p) { return p.share; } }
  };
  var selA = $("cmp-a"), selB = $("cmp-b"), selM = $("cmp-metric");
  SA.provinces.forEach(function (p) {
    [selA, selB].forEach(function (s) {
      var o = document.createElement("option"); o.value = p.code; o.textContent = p.name; s.appendChild(o);
    });
  });
  Object.keys(METRICS).forEach(function (k) {
    var o = document.createElement("option"); o.value = k; o.textContent = METRICS[k].label; selM.appendChild(o);
  });
  selA.value = "GP"; selB.value = "WC"; selM.value = "unemp";
  function getProv(code) { return SA.provinces.filter(function (p) { return p.code === code; })[0]; }
  function renderCompare() {
    var a = getProv(selA.value), b = getProv(selB.value), m = METRICS[selM.value];
    if (a.code === b.code) {
      $("cmp-out").innerHTML = "<p class='verdict'>Pick two different provinces to compare.</p>";
      return;
    }
    var va = m.val(a), vb = m.val(b), mx = Math.max(va, vb);
    var win = va === vb ? null : (m.lowerBetter ? (va < vb ? a : b) : (va > vb ? a : b));
    var diff = Math.abs(va - vb);
    var diffTxt = selM.value === "pop"
      ? fmt.format(Math.round(diff)) + " more people"
      : selM.value === "density"
        ? fmt.format(Math.round(diff)) + " more people per km²"
        : diff.toFixed(1) + " percentage points";
    $("cmp-out").innerHTML =
      '<div class="compare-bars">' +
      [["A", a, va], ["B", b, vb]].map(function (row) {
        return '<div class="cmp"><span>' + row[1].name + '</span><span class="bar"><i style="width:' + (row[2] / mx * 100).toFixed(1) + '%;background:' + (row[0] === "A" ? "#14664a" : "#e8a317") + '"></i></span><span class="num">' + m.fmt(row[1]) + "</span></div>";
      }).join("") + "</div>" +
      (win
        ? "<p class='verdict'><b>" + win.name + " leads</b> on " + m.label.toLowerCase() + " — " + diffTxt + " " +
          (m.lowerBetter ? "lower" : "higher") + " than " + (win === a ? b.name : a.name) + ".</p>"
        : "<p class='verdict'>The two provinces are equal on this measure.</p>") +
      "<p class='source'><b>Sources:</b> " + SA.provinceSources + "</p>";
  }
  [selA, selB, selM].forEach(function (s) { s.addEventListener("change", renderCompare); });
  renderCompare();

  route();
})();
