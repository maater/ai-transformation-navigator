// ============================================================
// HELPERS — Pure utility functions for data lookups & layout
// ============================================================

// SVG coordinate system
const SVG_WIDTH = 660;
const SVG_HEIGHT = 460;
const SVG_PAD = {l:48, r:22, t:22, b:42};

function tx(x) { return SVG_PAD.l + (x / 100) * (SVG_WIDTH - SVG_PAD.l - SVG_PAD.r); }
function ty(y) { return SVG_PAD.t + ((100 - y) / 100) * (SVG_HEIGHT - SVG_PAD.t - SVG_PAD.b); }

// Data lookups
function getModel(id) { return MODELS.find(m => m.id === id); }

function getProfile(state) {
  return state.fp ? PROFILES.find(f => f.id === state.fp) : null;
}

function getVisibleMigrations(state, profile) {
  if (!state.arrows) return [];
  if (!profile) return MIGRATIONS;
  return MIGRATIONS.filter(m => profile.cur.includes(m.from) || profile.tgt.includes(m.to));
}

function getComparableMigrations(profile) {
  if (!profile) return [];
  return MIGRATIONS.filter(m => profile.cur.includes(m.from) && profile.tgt.includes(m.to));
}

function getFilteredModels(filter) {
  return MODELS.filter(m => filter === "all" || m.problems.includes(filter));
}

function isHighlighted(id, profile) {
  return !profile || profile.cur.includes(id) || profile.tgt.includes(id);
}

function isCurrentNode(id, profile) {
  return profile && profile.cur.includes(id);
}

function isTargetNode(id, profile) {
  return profile && profile.tgt.includes(id);
}
