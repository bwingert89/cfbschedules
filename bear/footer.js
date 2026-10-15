<!-- Paste into Bear's footer directive (Dashboard > Header and footer directives). The script does nothing on pages without the selector. -->
<script>window.CFB_SCHEDULE_BASE = "https://bwingert89.github.io/cfbschedules/";</script>
<script>
(function () {
  if (!document.getElementById("sel-season")) return;  // not the schedule page
  var BASE = window.CFB_SCHEDULE_BASE || "";           // where slates.json, graphs.json and logos/ live
  var fmtSp = function (v) { return v === null || v === undefined ? "" : (v < 0 ? "−" : "") + Math.abs(v).toFixed(1); };
  var esc = function (t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); };
  var byId = function (id) { return document.getElementById(id); };
  var SVG = "http://www.w3.org/2000/svg", XLINK = "http://www.w3.org/1999/xlink";

  // ---- the slate tables -------------------------------------------------------------------------
  var slateTable = function (rows) {
    if (!rows.length) return "<p>No non-conference FBS games.</p>";
    var body = rows.map(function (r) {
      var wk = r.week === null ? "—" : r.week + (r.block === "late" ? " (Swiss week)" : "");
      return "<tr><td>" + wk + "</td><td>" + esc(r.opponent) + "</td><td>" + esc(r.conference) + "</td><td class=\"num\">" + fmtSp(r.sp) +
        "</td><td class=\"num\">" + r.rank + "</td><td>" + r.venue + "</td><td class=\"num\">" + r.miles + "</td></tr>";
    }).join("");
    return "<table><thead><tr><th>week</th><th>opponent</th><th>conference</th><th class=\"num\">SP+</th><th class=\"num\">rank</th><th>venue</th><th class=\"num\">miles</th></tr></thead><tbody>" + body + "</tbody></table>";
  };
  var renderTables = function (data, season, team) {
    var S = data.seasons[season], T = S.teams[team];
    byId("slate-title").textContent = team + ", " + season + " · " + T.conference + " · season-final SP+ " + (T.sp >= 0 ? "+" : "−") + Math.abs(T.sp).toFixed(1) + ", ranked " + T.rank;
    byId("slate-actual").innerHTML = slateTable(T.actual);
    byId("slate-calendar").innerHTML = slateTable(T.calendar);
    var draws = T.draws.filter(function (d) { return d.share >= 0.03; });
    byId("draw-table").innerHTML = T.independent
      ? "<p>An independent keeps its whole real slate; there is no Swiss draw.</p>"
      : "<table><thead><tr><th>opponent</th><th>conference</th><th class=\"num\">SP+</th><th class=\"num\">share of seasons</th></tr></thead><tbody>" +
        draws.map(function (d) { return "<tr><td>" + esc(d.opponent) + "</td><td>" + esc(d.conference) + "</td><td class=\"num\">" + fmtSp(d.sp) + "</td><td class=\"num\">" + Math.round(d.share * 100) + "%</td></tr>"; }).join("") +
        "</tbody></table>";
    byId("moved-title").textContent = "What moved for " + team;
    byId("moved-note").textContent = T.independent
      ? team + " is an independent: every one of its games is pinned at its real week and real host, and it takes no part in the design."
      : T.league_moved + " of its " + T.league_games + " conference games change weeks so that week " + S.swiss_week + " is clear; the " + T.conference +
        " finale stays on rivalry weekend. Every other team in the league flexes the same way, which is what the \"conference games moved\" column above counts.";
    var own = T.conference, cols = S.conferences.filter(function (c) { return c !== own && S.pair_se.actual[own] && S.pair_se.actual[own][c] !== undefined; });
    if (!cols.length) {
      byId("pair-table").innerHTML = "<p>" + esc(own) + " is not a conference for this purpose (independents and leagues under four members have no gap row).</p>";
      byId("pair-note").textContent = team + "'s own rating standard error is " + T.team_se.actual.toFixed(1) + " points on the real schedule and " + T.team_se.calendar.toFixed(1) + " under the calendar.";
      return;
    }
    var short = { "American Athletic": "American", "Conference USA": "Conf. USA" };
    var head = cols.map(function (c) { return "<th class=\"num\">" + esc(short[c] || c) + "</th>"; }).join("");
    var a = cols.map(function (c) { return "<td class=\"num\">" + S.pair_se.actual[own][c].toFixed(2) + "</td>"; }).join("");
    var d = cols.map(function (c) { var x = S.pair_se.actual[own][c], y = S.pair_se.calendar[own][c]; return "<td class=\"num " + (y < x ? "better" : "worse") + "\">" + y.toFixed(2) + "</td>"; }).join("");
    byId("pair-table").innerHTML = "<table><thead><tr><th>" + esc(own) + " against</th>" + head + "</tr></thead><tbody><tr><td>actual, standard error (pts)</td>" + a + "</tr><tr><td>calendar, standard error (pts)</td>" + d + "</tr></tbody></table>";
    var gains = cols.map(function (c) { return S.pair_se.actual[own][c] - S.pair_se.calendar[own][c]; });
    var better = gains.filter(function (g) { return g > 0; }).length;
    var lo = Math.min.apply(null, gains), hi = Math.max.apply(null, gains);
    var pairs = better === cols.length ? "Every pair improves, by " + lo.toFixed(1) + " to " + hi.toFixed(1) + " points" : better + " of " + cols.length + " pairs improve (" + lo.toFixed(1) + " to " + hi.toFixed(1) + " points)";
    var se = T.team_se.calendar < T.team_se.actual ? "is pinned down more tightly too (its standard error falls from " : "is not pinned down more tightly (its standard error goes from ";
    byId("pair-note").textContent = pairs + ", and " + team + "'s own rating " + se + T.team_se.actual.toFixed(1) + " to " + T.team_se.calendar.toFixed(1) + " points).";
  };

  // ---- the graphs ---------------------------------------------------------------------------------
  var LOGO = 26, panels = {};
  var el = function (name, attrs, parent) {
    var e = document.createElementNS(SVG, name);
    for (var k in attrs) { if (k === "href") e.setAttributeNS(XLINK, "xlink:href", attrs[k]); else e.setAttribute(k, attrs[k]); }
    if (parent) parent.appendChild(e);
    return e;
  };
  var buildPanel = function (svg, G, which, onHover, onLeave, onClick) {
    var key = which === "actual" ? "a" : "k";
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 " + G.view[0] + " " + G.view[1]);
    var edgesG = el("g", { "class": "edges" }, svg), hotG = el("g", { "class": "hot-edges" }, svg), nodesG = el("g", { "class": "nodes" }, svg), labelG = el("g", { "class": "labels" }, svg);
    var nodes = G.nodes, edges = G.edges[which];
    var lines = edges.map(function (e) {
      var p = nodes[e[0]][key], q = nodes[e[1]][key];
      return el("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], "class": e[2] ? "same" : "bridge" }, edgesG);
    });
    var groups = nodes.map(function (n, i) {
      var g = el("g", { "class": "node", transform: "translate(" + n[key][0] + "," + n[key][1] + ")" }, nodesG);
      el("circle", { r: LOGO / 2 + 2, "class": "halo" }, g);
      if (n.logo !== null) el("image", { href: BASE + "logos/" + n.logo + ".png", x: -LOGO / 2, y: -LOGO / 2, width: LOGO, height: LOGO }, g);
      else el("circle", { r: LOGO / 2 - 4, "class": "dot" }, g);
      g.addEventListener("mouseenter", function (ev) { onHover(i, ev); });
      g.addEventListener("mouseleave", onLeave);
      g.addEventListener("click", function (ev) { ev.preventDefault(); onClick(i); });
      return g;
    });
    return { svg: svg, lines: lines, groups: groups, edges: edges, nodes: nodes, key: key, hotG: hotG, labelG: labelG };
  };
  var paint = function (P, i) {
    // i: the node index to feature (its non-conference games red, its opponents named), or -1 for nobody
    while (P.hotG.firstChild) P.hotG.removeChild(P.hotG.firstChild);
    while (P.labelG.firstChild) P.labelG.removeChild(P.labelG.firstChild);
    P.svg.classList.toggle("featured", i >= 0);
    P.groups.forEach(function (g) { g.classList.remove("sel", "opp", "mate"); });
    if (i < 0) return;
    P.groups[i].classList.add("sel");
    // the featured crest is drawn again, enlarged, in the top layer: moving the original node
    // under the pointer would detach it mid-click and the click would never fire
    var me0 = P.nodes[i], c = me0[P.key], big = LOGO * 1.9;
    el("circle", { cx: c[0], cy: c[1], r: big / 2 + 3, "class": "halo-big" }, P.labelG);
    if (me0.logo !== null) el("image", { href: BASE + "logos/" + me0.logo + ".png", x: c[0] - big / 2, y: c[1] - big / 2, width: big, height: big, "class": "big" }, P.labelG);
    else el("circle", { cx: c[0], cy: c[1], r: big / 2 - 6, "class": "dot" }, P.labelG);
    P.edges.forEach(function (e, idx) {
      if (e[0] !== i && e[1] !== i) return;
      var j = e[0] === i ? e[1] : e[0];
      var p = P.nodes[i][P.key], q = P.nodes[j][P.key];
      if (e[2]) {
        // a conference game: the edge at its usual weight but fully opaque, the opponent's crest brightened, no label
        el("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], "class": "hot league" }, P.hotG);
        P.groups[j].classList.add("mate");
        return;
      }
      el("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], "class": e[3] === "l" ? "hot swiss" : "hot" }, P.hotG);
      P.groups[j].classList.add("opp");
      var t = el("text", { x: q[0], y: q[1] - LOGO / 2 - 4, "class": "label" }, P.labelG);
      t.textContent = P.nodes[j].t + (e[3] === "l" ? " (Swiss)" : "");
    });
    var me = el("text", { x: c[0], y: c[1] - big / 2 - 8, "class": "label me" }, P.labelG);
    me.textContent = P.nodes[i].t;
  };

  // ---- wiring ---------------------------------------------------------------------------------------
  var selSeason = byId("sel-season"), selTeam = byId("sel-team"), hint = byId("picker-hint"), tip = byId("graph-tip");
  var fill = function (sel, values, chosen) {
    sel.innerHTML = values.map(function (v) { return "<option value=\"" + esc(v) + "\"" + (v === chosen ? " selected" : "") + ">" + esc(v) + "</option>"; }).join("");
  };
  var load = function (path) { return fetch(path).then(function (r) { if (!r.ok) throw new Error(path + " " + r.status); return r.json(); }); };

  // ---- who plays whom: the conference-pair matrices, with their own season selector ----------------
  var heatTable = function (P, which) {
    var names = P.names, short = P.short, power = P.power, k = names.length, A = P.actual, C = P.calendar, M = P[which], vmax = 1;
    for (var i = 0; i < k; i++) for (var j = 0; j < k; j++) if (i !== j) vmax = Math.max(vmax, A[i][j], C[i][j]);
    var head = "<tr><th></th>" + short.map(function (s, j) { return "<th class=\"" + (j === power - 1 ? "seam-r" : "") + "\">" + esc(s) + "</th>"; }).join("") + "</tr>";
    var rows = [];
    for (var r = 0; r < k; r++) {
      var cells = [];
      for (var c = 0; c < k; c++) {
        var seam = (c === power - 1 ? "seam-r " : "") + (r === power - 1 ? "seam-b " : ""), v = M[r][c];
        if (r === c) cells.push("<td class=\"diag " + seam + "\">" + v + "</td>");
        else if (v === 0) cells.push("<td class=\"heat zero " + seam + "\">·</td>");
        else { var t = v / vmax; cells.push("<td class=\"heat " + (t > 0.6 ? "hot " : "") + seam + "\" style=\"background:rgba(63,94,122," + t.toFixed(2) + ")\">" + v + "</td>"); }
      }
      rows.push("<tr><th class=\"" + (r === power - 1 ? "seam-b" : "") + "\">" + esc(short[r]) + "</th>" + cells.join("") + "</tr>");
    }
    return "<table class=\"heat\"><thead>" + head + "</thead><tbody>" + rows.join("") + "</tbody></table>";
  };
  var renderPairs = function (pairs, season) {
    var P = pairs.seasons[season], k = P.names.length;
    var between = ["actual", "calendar"].map(function (w) { var n = 0; for (var i = 0; i < k; i++) for (var j = i + 1; j < k; j++) n += P[w][i][j]; return n; });
    var empty = ["actual", "calendar"].map(function (w) { var n = 0; for (var i = 0; i < k; i++) for (var j = i + 1; j < k; j++) if (P[w][i][j] === 0) n++; return n; });
    byId("pairs-title-a").textContent = season + ", the real schedule: " + between[0] + " games between conferences";
    byId("pairs-title-k").textContent = season + ", the designed calendar: " + between[1] + " games between conferences";
    byId("pairs-actual").innerHTML = heatTable(P, "actual");
    byId("pairs-calendar").innerHTML = heatTable(P, "calendar");
    byId("pairs-note").textContent = "In " + season + " the real schedule leaves " + empty[0] + " conference pair" + (empty[0] === 1 ? "" : "s") + " without a game and the calendar " + empty[1] + "; the calendar adds " + (between[1] - between[0]) + " games between conferences.";
  };
  var selPairs = byId("sel-pairs-season");
  if (selPairs) {
    load(BASE + "pairs.json").then(function (pairs) {
      var seasons = Object.keys(pairs.seasons).map(Number).sort(function (x, y) { return y - x; });
      var chosen = seasons.indexOf(2024) >= 0 ? 2024 : seasons[0];
      fill(selPairs, seasons, chosen);
      selPairs.addEventListener("change", function () { renderPairs(pairs, Number(selPairs.value)); });
      renderPairs(pairs, chosen);
    }).catch(function (e) { selPairs.disabled = true; byId("pairs-note").textContent += " (The season selector could not load its data: " + e.message + ".)"; });
  }

  Promise.all([load(BASE + "slates.json"), load(BASE + "graphs.json")]).then(function (loaded) {
    var data = loaded[0], graphs = loaded[1];
    var seasons = Object.keys(data.seasons).map(Number).sort(function (x, y) { return y - x; });
    var current = { season: seasons.indexOf(2024) >= 0 ? 2024 : seasons[0], team: "Ohio State" };
    var teamsOf = function (s) { return Object.keys(data.seasons[s].teams).sort(); };
    var G = null, indexOf = {};
    var featureAll = function (team) { var i = team in indexOf ? indexOf[team] : -1; paint(panels.actual, i); paint(panels.calendar, i); };
    var showTip = function (i, ev) {
      var n = G.nodes[i], T = data.seasons[current.season].teams[n.t];
      tip.textContent = n.t + " · " + n.c + " · SP+ " + fmtSp(n.sp) + ", ranked " + n.r + (T && !T.independent && T.calendar.length ? " · click to select" : "");
      tip.style.display = "block";
      var box = byId("graphs").getBoundingClientRect();
      tip.style.left = Math.min(ev.clientX - box.left + 14, box.width - tip.offsetWidth - 8) + "px";
      tip.style.top = (ev.clientY - box.top + 14) + "px";
    };
    var select = function (team) {
      current.team = team;
      fill(selTeam, teamsOf(current.season), team);
      renderTables(data, current.season, team);
      featureAll(team);
    };
    var hover = function (i, ev) { featureAll(G.nodes[i].t); showTip(i, ev); };
    var leave = function () { tip.style.display = "none"; featureAll(current.team); };
    var click = function (i) { select(G.nodes[i].t); };
    var sync = function () {
      var teams = teamsOf(current.season);
      if (teams.indexOf(current.team) < 0) current.team = teams.indexOf("Iowa State") >= 0 ? "Iowa State" : teams[0];
      fill(selSeason, seasons, current.season);
      G = { view: graphs.view, nodes: graphs.seasons[current.season].nodes, edges: graphs.seasons[current.season].edges };
      indexOf = {}; G.nodes.forEach(function (n, i) { indexOf[n.t] = i; });
      panels.actual = buildPanel(byId("svg-actual"), G, "actual", hover, leave, click);
      panels.calendar = buildPanel(byId("svg-calendar"), G, "calendar", hover, leave, click);
      byId("graph-season-a").textContent = current.season + ", the real schedule";
      byId("graph-season-k").textContent = current.season + ", the designed calendar";
      select(current.team);
    };
    selSeason.addEventListener("change", function () { current.season = Number(selSeason.value); sync(); });
    selTeam.addEventListener("change", function () { select(selTeam.value); });
    byId("graphs").addEventListener("mouseleave", leave);
    sync();
  }).catch(function (e) {
    hint.textContent = "The selector's data could not be loaded (" + e.message + "); the tables show Ohio State, 2024, and the graphs are empty.";
    selSeason.disabled = true; selTeam.disabled = true;
  });
})();
</script>
