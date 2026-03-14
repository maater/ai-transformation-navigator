// ============================================================
// APP — State management, render orchestrator, event binding
// ============================================================

var state = {
  sel: null,      // Selected node ID
  arrow: null,    // Selected arrow index
  pf: "all",      // Problem filter
  fp: null,       // Founder profile ID
  arrows: true,   // Show migration arrows
  compare: false, // Compare mode on/off
  comp: []        // Arrow indices being compared (max 3)
};

function render() {
  var profile = getProfile(state);
  var filteredModels = getFilteredModels(state.pf);
  var visibleMigrations = getVisibleMigrations(state, profile);
  var comparableMigrations = getComparableMigrations(profile);

  var html = '';
  html += '<h1>AI-First Transformation Navigator</h1>';
  html += '<p class="sub">Select your context \u2192 see where you are & where to go \u2192 explore action plans for each migration path</p>';
  html += renderFounderSelector(state, profile);
  html += renderFilterBar(state, comparableMigrations);
  html += '<div class="main">';
  html += '<div class="map-wrap">' + renderMap(state, filteredModels, visibleMigrations, profile) + '</div>';
  html += '<div class="panel">' + renderDetailPanel(state, visibleMigrations, profile) + '</div>';
  html += '</div>';

  document.getElementById('app').innerHTML = html;

  // --- Event Binding ---

  // Founder profile buttons
  document.querySelectorAll('[data-fp]').forEach(function(el) {
    el.onclick = function() {
      var id = el.dataset.fp;
      state.fp = state.fp === id ? null : id;
      state.sel = null;
      state.arrow = null;
      state.compare = false;
      state.comp = [];
      render();
    };
  });

  // Problem filter buttons
  document.querySelectorAll('[data-pf]').forEach(function(el) {
    el.onclick = function() {
      state.pf = el.dataset.pf;
      render();
    };
  });

  // Arrow toggle
  var arrowBtn = document.querySelector('[data-toggle="arrows"]');
  if (arrowBtn) {
    arrowBtn.onclick = function() {
      state.arrows = !state.arrows;
      render();
    };
  }

  // Compare toggle
  var compareBtn = document.querySelector('[data-toggle="compare"]');
  if (compareBtn) {
    compareBtn.onclick = function() {
      state.compare = !state.compare;
      state.comp = [];
      state.arrow = null;
      state.sel = null;
      render();
    };
  }

  // Arrow clicks
  document.querySelectorAll('[data-arrow]').forEach(function(el) {
    el.onclick = function() {
      var i = +el.dataset.arrow;
      if (state.compare) {
        if (state.comp.includes(i)) {
          state.comp = state.comp.filter(function(x) { return x !== i; });
        } else if (state.comp.length < 3) {
          state.comp.push(i);
        }
      } else {
        state.arrow = state.arrow === i ? null : i;
        state.sel = null;
      }
      render();
    };
  });

  // Node clicks
  document.querySelectorAll('[data-node]').forEach(function(el) {
    el.onclick = function() {
      if (state.compare) return;
      var id = +el.dataset.node;
      state.sel = state.sel === id ? null : id;
      state.arrow = null;
      render();
    };
  });

  // Migration links in detail panel
  document.querySelectorAll('[data-miglink]').forEach(function(el) {
    el.onclick = function(e) {
      e.stopPropagation();
      var i = +el.dataset.miglink;
      if (i >= 0) {
        state.arrow = i;
        state.sel = null;
        render();
      }
    };
  });
}

// Initial render
render();
