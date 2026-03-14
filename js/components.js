// ============================================================
// COMPONENTS — Render functions that return HTML strings
// ============================================================

// --- Founder Selector ---
function renderFounderSelector(state, profile) {
  var html = '<div class="card"><div class="card-label">I\'m currently running a...</div><div class="btn-row">';
  PROFILES.forEach(function(f) {
    html += '<button class="btn' + (state.fp === f.id ? ' on' : '') + '" data-fp="' + f.id + '">' + f.icon + ' ' + f.label + '</button>';
  });
  html += '</div>';
  if (profile) {
    html += '<div class="strat-box"><strong>Strategy:</strong> ' + profile.advice + '</div>';
  }
  html += '</div>';
  return html;
}

// --- Filter Bar ---
function renderFilterBar(state, comparableMigrations) {
  var filters = [
    ["all", "All", "#666"],
    ["revenue", "Revenue", PROBLEM_COLORS.revenue],
    ["efficiency", "Efficiency", PROBLEM_COLORS.efficiency],
    ["capability", "Capability", PROBLEM_COLORS.capability]
  ];

  var html = '<div class="filter-row"><div class="btn-row">';
  filters.forEach(function(f) {
    var on = state.pf === f[0];
    var style = on ? 'background:' + f[2] + ';color:#fff;border-color:' + f[2] : '';
    html += '<button class="btn" data-pf="' + f[0] + '" style="' + style + '">' + f[1] + '</button>';
  });
  html += '</div>';
  html += '<button class="btn' + (state.arrows ? ' on' : '') + '" data-toggle="arrows">\u2197 Arrows</button>';

  if (comparableMigrations.length > 1) {
    html += '<button class="btn' + (state.compare ? ' on-y' : '') + '" data-toggle="compare">\u2696\uFE0F Compare Paths</button>';
  }

  html += '<div class="legend">';
  Object.entries(STATUS_CONFIG).forEach(function(entry) {
    html += '<span><span class="legend-dot" style="background:' + entry[1].c + '"></span> ' + entry[1].l + '</span>';
  });
  html += '</div></div>';
  return html;
}

// --- Landscape Map (SVG) ---
function renderMap(state, filteredModels, visibleMigrations, profile) {
  var fids = new Set(filteredModels.map(function(m) { return m.id; }));

  var svg = '<svg viewBox="0 0 ' + SVG_WIDTH + ' ' + SVG_HEIGHT + '" style="width:100%;background:#fafbfc;border-radius:8px;border:1px solid #e5e7eb">';

  // Defs (arrow markers)
  svg += '<defs>';
  svg += '<marker id="a1" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><path d="M0,0 L6,2 L0,4" fill="#a78bfa"/></marker>';
  svg += '<marker id="a2" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><path d="M0,0 L6,2 L0,4" fill="#6366f1"/></marker>';
  svg += '<marker id="a3" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><path d="M0,0 L6,2 L0,4" fill="#f59e0b"/></marker>';
  svg += '</defs>';

  // Grid lines
  [0, 25, 50, 75, 100].forEach(function(v) {
    svg += '<line x1="' + tx(v) + '" y1="' + SVG_PAD.t + '" x2="' + tx(v) + '" y2="' + (SVG_HEIGHT - SVG_PAD.b) + '" stroke="#f0f0f0" stroke-width=".5"/>';
    svg += '<line x1="' + SVG_PAD.l + '" y1="' + ty(v) + '" x2="' + (SVG_WIDTH - SVG_PAD.r) + '" y2="' + ty(v) + '" stroke="#f0f0f0" stroke-width=".5"/>';
  });

  // Axis labels
  svg += '<text x="' + (SVG_PAD.l + 2) + '" y="' + (SVG_HEIGHT - 6) + '" font-size="8" fill="#ccc">\u2190 Human Delivery</text>';
  svg += '<text x="' + (SVG_WIDTH - SVG_PAD.r) + '" y="' + (SVG_HEIGHT - 6) + '" font-size="8" fill="#ccc" text-anchor="end">AI Delivery \u2192</text>';
  svg += '<text x="' + (SVG_WIDTH / 2) + '" y="' + (SVG_HEIGHT - 4) + '" font-size="8" fill="#bbb" text-anchor="middle" font-weight="600">DELIVERY BLEND</text>';
  svg += '<text x="6" y="' + (SVG_HEIGHT / 2) + '" font-size="8" fill="#bbb" text-anchor="middle" font-weight="600" transform="rotate(-90,6,' + (SVG_HEIGHT / 2) + ')">CONTEXT ACQUISITION</text>';

  // Migration arrows
  visibleMigrations.forEach(function(m, i) {
    var fr = getModel(m.from), to = getModel(m.to);
    if (!fr || !to || !fids.has(fr.id) || !fids.has(to.id)) return;
    var x1 = tx(fr.x), y1 = ty(fr.y), x2 = tx(to.x), y2 = ty(to.y);
    var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy), nx = dx / len, ny = dy / len;
    var isSel = state.arrow === i, isC = state.comp.includes(i);
    var dim = profile && !(profile.cur.includes(m.from) && profile.tgt.includes(m.to));

    // Invisible fat hit target
    svg += '<line x1="' + (x1 + nx * 12) + '" y1="' + (y1 + ny * 12) + '" x2="' + (x2 - nx * 12) + '" y2="' + (y2 - ny * 12) + '" stroke="transparent" stroke-width="14" style="cursor:pointer" data-arrow="' + i + '"/>';

    // Visible arrow
    var col = isC ? "#f59e0b" : isSel ? "#6366f1" : "#c4b5fd";
    var sw = isSel || isC ? 2.5 : 1;
    var mk = isC ? "url(#a3)" : isSel ? "url(#a2)" : "url(#a1)";
    var op = dim ? 0.15 : (isSel || isC ? 1 : 0.4);
    svg += '<line x1="' + (x1 + nx * 12) + '" y1="' + (y1 + ny * 12) + '" x2="' + (x2 - nx * 12) + '" y2="' + (y2 - ny * 12) + '" stroke="' + col + '" stroke-width="' + sw + '" marker-end="' + mk + '" opacity="' + op + '" style="pointer-events:none"/>';
  });

  // Model nodes
  filteredModels.forEach(function(m) {
    var cx = tx(m.x), cy = ty(m.y), sc = STATUS_CONFIG[m.status];
    var isSel = state.sel === m.id, dim = profile && !isHighlighted(m.id, profile);
    var op = dim ? 0.12 : 1;

    svg += '<g data-node="' + m.id + '" style="cursor:' + (state.compare ? 'default' : 'pointer') + '" opacity="' + op + '">';

    // Profile rings
    if (isCurrentNode(m.id, profile)) {
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="none" stroke="#6366f1" stroke-width="2.5"/>';
    }
    if (isTargetNode(m.id, profile)) {
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>';
    }

    // Node circle
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (isSel ? 11 : 9) + '" fill="' + (isSel ? sc.c : sc.bg) + '" stroke="' + sc.c + '" stroke-width="' + (isSel ? 2 : 1.5) + '"/>';

    // Interface icon
    svg += '<text x="' + cx + '" y="' + (cy + 1) + '" text-anchor="middle" dominant-baseline="middle" font-size="8">' + INTERFACE_ICONS[m.iface] + '</text>';

    // Label
    svg += '<foreignObject x="' + (cx - 40) + '" y="' + (cy + 12) + '" width="80" height="26" style="pointer-events:none;overflow:visible">';
    svg += '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:6.5px;font-weight:600;color:' + (dim ? '#ddd' : '#555') + ';text-align:center;line-height:1.2">' + m.name + '</div>';
    svg += '</foreignObject>';

    svg += '</g>';
  });

  svg += '</svg>';
  return svg;
}

// --- Action Plan (reusable) ---
function renderActionPlan(actions) {
  var html = '';
  ['team', 'gtm', 'ops', 'finance'].forEach(function(k) {
    html += '<div class="action-section"><div class="action-title">' + ACTION_ICONS[k] + ' ' + ACTION_LABELS[k] + '</div>';
    actions[k].forEach(function(a) {
      html += '<div class="action-item">\u2022 ' + a + '</div>';
    });
    html += '</div>';
  });
  return html;
}

// --- Timeline Box (reusable) ---
function renderTimeline(timeline, color) {
  var html = '<div class="tl-box"><div style="font-weight:700;color:#166534;font-size:10px;margin-bottom:6px">\u{1F4C5} Transformation Timeline</div>';
  Object.entries(timeline).forEach(function(entry) {
    var style = color ? 'color:' + color : 'color:#15803d';
    html += '<div class="tl-phase" style="' + style + '">' + TIMELINE_LABELS[entry[0]] + '</div>';
    html += '<div class="tl-desc">' + entry[1] + '</div>';
  });
  html += '</div>';
  return html;
}

// --- Empty Panel ---
function renderEmptyPanel() {
  return '<div class="empty-panel"><div style="font-size:24px">\u{1F9ED}</div><div style="font-size:11px">Select your context above, then click nodes or arrows to explore</div><div style="font-size:9px;color:#ddd">27 models \u00B7 24 migration paths \u00B7 action plans & timelines</div></div>';
}

// --- Node Detail ---
function renderNodeDetail(model, visibleMigrations) {
  var sc = STATUS_CONFIG[model.status];
  var html = '<div class="detail-card" style="border-color:' + sc.c + ';background:' + sc.bg + '">';

  // Header
  html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3px">';
  html += '<h3 style="margin:0">' + model.name + '</h3>';
  html += '<span class="tag" style="background:' + sc.c + ';color:#fff;white-space:nowrap;margin-left:4px">' + sc.l + '</span></div>';

  // Subtitle & examples
  html += '<div style="font-size:10px;color:#888;margin-bottom:4px;font-style:italic">' + model.subtitle + '</div>';
  html += '<div style="font-size:10px;color:#666;margin-bottom:6px">' + model.examples + '</div>';

  // Tags
  html += '<div style="display:flex;gap:3px;flex-wrap:wrap;margin-bottom:6px">';
  model.problems.forEach(function(pr) {
    html += '<span class="tag" style="background:' + PROBLEM_COLORS[pr] + ';color:#fff">' + pr + '</span>';
  });
  html += '<span class="tag" style="background:#f1f5f9;color:#666">' + INTERFACE_ICONS[model.iface] + ' ' + model.iface + '</span>';
  html += '<span class="tag" style="background:#f1f5f9;color:#666">\u{1F4B0} ' + PRICING_LABELS[model.pricing] + '</span>';
  html += '<span class="tag" style="background:#f1f5f9;color:#666">\u{1F3AD} ' + model.archetype + '</span></div>';

  // Description
  html += '<p style="font-size:10px;color:#444;line-height:1.5;margin:0 0 6px">' + model.description + '</p>';

  // Best for
  html += '<div class="best-box"><div class="label">Best suited for</div><div class="val">' + model.bestFor + '</div></div>';

  // Migration links
  var outs = MIGRATIONS.filter(function(a) { return a.from === model.id; });
  var ins = MIGRATIONS.filter(function(a) { return a.to === model.id; });
  if (outs.length || ins.length) {
    html += '<div style="font-size:8px;font-weight:700;color:#999;text-transform:uppercase;margin-bottom:3px">Migration paths</div>';
    outs.forEach(function(a) {
      var to = getModel(a.to);
      var mi = visibleMigrations.indexOf(a);
      html += '<div class="mig-link" data-miglink="' + mi + '">\u2192 ' + to.name + '</div>';
    });
    ins.forEach(function(a) {
      var fr = getModel(a.from);
      html += '<div class="mig-from">\u2190 from ' + fr.name + '</div>';
    });
  }

  html += '</div>';
  return html;
}

// --- Migration Detail ---
function renderMigrationDetail(migration) {
  var fr = getModel(migration.from), to = getModel(migration.to);
  var html = '<div class="detail-card" style="border-color:#6366f1;background:#fff">';

  // Header
  html += '<div style="font-size:9px;font-weight:700;color:#6366f1;text-transform:uppercase;margin-bottom:4px">Migration Path</div>';
  html += '<div style="display:flex;align-items:center;gap:4px;margin-bottom:8px;flex-wrap:wrap">';
  html += '<span style="padding:2px 6px;border-radius:6px;background:' + STATUS_CONFIG[fr.status].bg + ';border:1px solid ' + STATUS_CONFIG[fr.status].c + ';font-size:10px;font-weight:600">' + fr.name + '</span>';
  html += '<span style="color:#6366f1;font-weight:700;font-size:11px">\u2192</span>';
  html += '<span style="padding:2px 6px;border-radius:6px;background:' + STATUS_CONFIG[to.status].bg + ';border:1px solid ' + STATUS_CONFIG[to.status].c + ';font-size:10px;font-weight:600">' + to.name + '</span></div>';

  // Reasoning
  html += '<p style="color:#555;line-height:1.4;margin:0 0 10px;font-size:11px">' + migration.reasoning + '</p>';

  // Action plan
  html += '<div style="font-size:9px;font-weight:700;color:#333;text-transform:uppercase;margin-bottom:6px;border-top:1px solid #e5e7eb;padding-top:8px">Action Plan</div>';
  html += renderActionPlan(migration.actions);

  // Timeline
  html += renderTimeline(migration.actions.timeline);

  html += '</div>';
  return html;
}

// --- Compare View ---
function renderCompareView(state, visibleMigrations) {
  var colors = ["#6366f1", "#22c55e", "#f59e0b"];
  var html = '<div class="compare-header">\u2696\uFE0F <strong>Comparing ' + state.comp.length + ' path' + (state.comp.length > 1 ? 's' : '') + '</strong> \u2014 click arrows to add/remove (max 3)</div>';

  state.comp.forEach(function(idx, ci) {
    var m = visibleMigrations[idx];
    if (!m) return;
    var fr = getModel(m.from), to = getModel(m.to), col = colors[ci];

    html += '<div class="compare-card" style="border-color:' + col + '">';
    html += '<div style="font-weight:700;color:' + col + ';margin-bottom:4px;font-size:12px">' + fr.name + ' \u2192 ' + to.name + '</div>';
    html += '<p style="color:#555;line-height:1.4;margin:0 0 8px">' + m.reasoning + '</p>';

    // Actions
    ['team', 'gtm', 'ops', 'finance'].forEach(function(k) {
      html += '<div style="margin-bottom:6px"><div style="font-weight:600;color:#888;font-size:9px">' + ACTION_ICONS[k] + ' ' + ACTION_LABELS[k] + '</div>';
      m.actions[k].forEach(function(a) {
        html += '<div style="color:#444;padding-left:10px;font-size:10px;line-height:1.4">\u2022 ' + a + '</div>';
      });
      html += '</div>';
    });

    // Timeline
    html += '<div style="margin-top:6px;padding:6px 8px;background:#f8fafc;border-radius:6px"><div style="font-weight:600;color:#888;font-size:9px;margin-bottom:4px">\u{1F4C5} Timeline</div>';
    Object.entries(m.actions.timeline).forEach(function(entry) {
      html += '<div style="margin-bottom:4px"><span style="font-weight:600;color:' + col + ';font-size:9px">' + TIMELINE_LABELS[entry[0]] + ': </span><span style="color:#444;font-size:10px">' + entry[1] + '</span></div>';
    });
    html += '</div></div>';
  });

  return html;
}

// --- Detail Panel (router) ---
function renderDetailPanel(state, visibleMigrations, profile) {
  // Compare mode
  if (state.compare && state.comp.length > 0) {
    return renderCompareView(state, visibleMigrations);
  }

  // Selected arrow
  if (state.arrow !== null && visibleMigrations[state.arrow]) {
    return renderMigrationDetail(visibleMigrations[state.arrow]);
  }

  // Selected node
  if (state.sel !== null) {
    var model = getModel(state.sel);
    if (model) return renderNodeDetail(model, visibleMigrations);
  }

  // Empty state
  return renderEmptyPanel();
}
