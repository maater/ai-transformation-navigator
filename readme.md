# AI-First Transformation Navigator

An interactive strategic tool that maps 27 AI-era value delivery models, shows how they're evolving, and provides actionable transformation playbooks for founders navigating the AI transition.

**Live demo:** [Your GitHub Pages URL here]

---

## What This Is

This is not a generic "AI landscape" chart. It's a **strategic navigation tool** built from a specific analytical framework about how AI is restructuring the entire landscape of B2B value delivery — from consultancies to SaaS to agencies to entirely new models that don't have names yet.

The tool answers one question for founders: **"Given where I am today, where should I go, and what does the journey look like quarter by quarter?"**

---

## How We Got Here — The Intellectual Journey

### The Core Insight

The conversation that produced this tool started with a deceptively simple question: *"Is there a difference between an AI-first agency and service-as-software?"*

Working through that question revealed that the commonly used categories in the AI business model discourse are **packaging distinctions masquerading as structural differences.** Whether you call yourself an "agency" or "service-as-software" is a choice about how you present and price — not a description of your operational architecture.

### The Four Dimensions

We identified four dimensions that actually matter structurally:

1. **Delivery Blend** (X-axis on the map): The ratio of human to AI in actual production. This is a continuous slider from 0% to 100% AI, varying task-by-task within a single company.

2. **Context Acquisition** (Y-axis on the map): How do you learn enough about the customer's specific situation to deliver customized outcomes? Ranges from purely programmatic (data ingestion, API connections) to deeply human-embedded (consultants who live inside the client's business).

3. **Customer Experience Interface** (shown as node icons): Human, GUI, hybrid, or invisible. This is a *presentation choice* driven by the customer's trust threshold, not by the delivery engine.

4. **Value Capture Model** (shown as metadata): Project, retainer, subscription, or outcome-based pricing.

The key realization: **dimensions 1 and 2 are structural** (they determine what your business actually is), while **dimensions 3 and 4 are tactical** (they determine how you package and sell it). The map uses the structural dimensions as axes and the tactical dimensions as visual properties.

### The Customization Thesis (CAS)

A critical insight that shaped the map: the entire SaaS era was built on a trade-off — **you get scale by sacrificing customization.** Salesforce doesn't work the way your business works; you bend your processes to fit.

AI dissolves this trade-off. The marginal cost of customization approaches zero. This means:

- The **"tool" row weakens** across the board (tools require customer adaptation)
- The **"outcome" row strengthens** (outcome delivery becomes scalable via AI customization)
- Everything converges toward **deeply personalized outcome delivery at scale** — what we call the "Contextual Outcome Engine"

This is the "hole not hammer" thesis: customers never wanted tools. They wanted outcomes. They accepted tools because custom outcomes were too expensive. That constraint is lifting.

### Where Human-in-the-Loop Goes

Human involvement doesn't disappear — it **migrates up the abstraction stack:**

- **Phase 1:** Human as doer, AI as assistant (where most companies are today)
- **Phase 2:** AI as doer, human as reviewer (where AI-first agencies are)
- **Phase 3:** AI as doer, human at the exceptions (confidence calibration becomes the critical capability)
- **Phase 4:** Human at the design layer, not the delivery layer (service-as-software arrives)

These phases don't progress uniformly — a single company might have some functions at Phase 4 and others at Phase 1.

### The Boundary Filter

Not everything belongs on this map. The filter test: **"Does this company's business model involve delivering knowledge work, professional services, or software-enabled outcomes to solve a business customer's problem?"**

This excludes:
- Infrastructure providers (AWS, Azure) — they're the substrate, not the solution
- Hardware companies (Nvidia, ARM) — component suppliers in the value chain
- Horizontal productivity platforms (Office 365) — too foundational
- B2C models
- Heavily physical/unique models (SpaceX)

### Models That Aren't Being Discussed Yet

Several nodes on the map represent business models we identified as **structurally implied by the framework but not yet named** in mainstream discourse:

- **Continuous Context Broker** (#16): Sells context fidelity as a service — maintains the "orientation fabric" that makes every other tool/service work better
- **Outcome Marketplace / Router** (#17): Routes problems to optimal AI+human blend dynamically
- **AI-Native Cooperative / Guild** (#18): Independent experts sharing AI infrastructure and collective intelligence
- **Embedded Intelligence / B2B2B** (#19): Invisible AI layer inside other products
- **Autonomous BU-as-a-Service** (#20): We ARE your entire business function
- **Predictive Venture Builder** (#21): AI finds and validates opportunities, humans execute
- **Human Premium / Artisanal** (#22): Contrarian bet — deliberately human as a luxury differentiator

---

## What The Tool Does

### 1. Founder Context Selection
Seven founder profiles (Consultancy/Agency, Dev Shop, SaaS Product, Data/Analytics, Platform/Marketplace, Starting from Scratch, Freelancer/Solo). Selecting one:
- Highlights "you are here" nodes (solid blue ring)
- Highlights target nodes (dashed green ring)
- Dims irrelevant models
- Filters migration arrows to relevant paths
- Shows a strategic read specific to that profile

### 2. Interactive Landscape Map
27 nodes plotted on two structural axes:
- X: Delivery Blend (Human → AI)
- Y: Context Acquisition (Programmatic → Human-Embedded)

Each node shows interface type as an icon, is colored by status (Legacy/Current/Emerging/Frontier), and carries metadata (pricing model, archetype, problem types).

### 3. Migration Paths with Action Plans
24 directional arrows showing how models evolve. Each arrow contains:
- **Reasoning**: Why this migration path exists and what forces drive it
- **Team actions**: Hire, freeze, restructure, upskill, downsize
- **Go-to-Market actions**: Rebrand, reprice, reposition, shift channels
- **Operations actions**: Build AI systems, automate, restructure delivery
- **Finance actions**: Bootstrap, raise small round, raise venture, cut costs
- **12-month timeline**: Months 1-3, 4-6, 7-12 phased playbook

### 4. Compare Mode
When a founder profile has multiple viable target paths, Compare Mode allows side-by-side comparison of up to 3 migration paths — showing what each requires across team, GTM, ops, finance, and timeline.

### 5. Problem Type Filtering
Toggle between Revenue, Efficiency, and Capability views to see which models serve which problem types.

---

## Data Model

### Node (Value Delivery Model)
```
{
  id: number,
  name: string,              // Value exchange statement ("We Grow Your Revenue, AI Does the Work")
  subtitle: string,          // Industry jargon label ("AI-First Agency (Revenue)")
  examples: string,          // Named company examples
  x: number,                 // 0-100, position on Delivery Blend axis
  y: number,                 // 0-100, position on Context Acquisition axis
  status: "legacy" | "current" | "emerging" | "frontier",
  iface: "human" | "gui" | "hybrid" | "none",
  pricing: "project" | "retainer" | "subscription" | "outcome",
  archetype: string,         // Brand archetype (Sage, Hero, Magician, etc.)
  problems: string[],        // ["revenue", "efficiency", "capability"]
  description: string,       // What this model actually is
  bestFor: string            // Ideal use case
}
```

### Migration Path
```
{
  from: number,              // Source node ID
  to: number,                // Target node ID
  reasoning: string,         // Why this path exists
  actions: {
    team: string[],          // People/hiring actions
    gtm: string[],           // Go-to-market actions
    ops: string[],           // Operational changes
    finance: string[],       // Funding/financial strategy
    timeline: {
      m1_3: string,          // Months 1-3 plan
      m4_6: string,          // Months 4-6 plan
      m7_12: string          // Months 7-12 plan
    }
  }
}
```

### Founder Profile
```
{
  id: string,
  label: string,
  icon: string,
  cur: number[],             // "You are here" node IDs
  tgt: number[],             // "Where to go" node IDs
  advice: string             // Strategic read for this profile
}
```

---

## Technical Architecture

### Current State: Single HTML File
The tool is currently a single `index.html` file with:
- **Zero dependencies** — no React, no build step, no npm
- **Vanilla JavaScript** with a simple reactive render pattern
- **Inline CSS** with a minimal class-based system
- **SVG** for the map rendering (viewBox-based, responsive)
- **~600 lines of JS** including all data

### How The Code Works

**State management:** A simple `state` object holds all UI state (selected node, selected arrow, filters, compare items). Every interaction updates state and calls `render()` which rebuilds the entire DOM. This is intentionally simple — no virtual DOM diffing, just full re-renders. Performance is fine because the DOM is small.

```javascript
let state = {
  sel: null,      // Selected node ID
  arrow: null,    // Selected arrow index
  pf: "all",      // Problem filter
  fp: null,       // Founder profile ID
  arrows: true,   // Show migration arrows
  compare: false, // Compare mode on/off
  comp: []        // Array of arrow indices being compared
};
```

**Rendering:** The `render()` function builds three things:
1. SVG map (nodes + arrows) via string concatenation
2. Detail panel HTML (varies by selection state)
3. Control bar (founder selector, filters)

Then injects via `innerHTML` and re-attaches event listeners.

**Map coordinate system:**
- SVG viewBox is 660×460
- Padding: left 48, right 22, top 22, bottom 42
- `tx(x)` and `ty(y)` convert 0-100 data coordinates to SVG coordinates
- Y-axis is inverted (high values = top of map)

**Arrow hit detection:** Each arrow has an invisible fat line (stroke-width 14, transparent) overlaying the visible thin line for click/hover targeting.

**Node rendering order:** Arrows render first (below), then nodes (above). Profile rings (current/target indicators) render before the node circle.

### Recommended Refactor Path (for Claude Code)

When converting to a proper project, the priorities are:

1. **Separate data from code.** Move `M` (models), `MIG` (migrations), and `FP` (founder profiles) into `src/data/models.ts`, `src/data/migrations.ts`, `src/data/profiles.ts`. This is the #1 priority because the team will iterate on content separately from UI.

2. **Convert to React + Vite.** The render pattern already maps cleanly to React components:
   - `<App />` — state management, layout
   - `<FounderSelector />` — profile picker + strategy text
   - `<FilterBar />` — problem filter, arrow toggle, compare toggle, legend
   - `<LandscapeMap />` — SVG map with nodes and arrows
   - `<DetailPanel />` — node detail, migration detail, or compare view
   - `<ActionPlan />` — team/gtm/ops/finance sections
   - `<Timeline />` — 3-phase timeline display
   - `<CompareView />` — side-by-side migration comparison

3. **Add TypeScript types** for the data model (Node, Migration, FounderProfile). The data structures are already well-defined — just need interface declarations.

4. **Set up GitHub Pages deployment** via GitHub Actions — push to main auto-deploys.

5. **Add a data validation layer** — ensure all migration `from`/`to` IDs reference valid nodes, all founder profile node IDs exist, etc. This prevents data entry errors as the team adds content.

### Potential Future Features

- **Custom founder input**: Instead of 7 preset profiles, let users describe their current model and get AI-powered positioning suggestions (would require API integration)
- **Export transformation plan**: Generate a PDF or doc of the selected migration path's action plan
- **Team collaboration**: Multiple team members can annotate or vote on preferred migration paths
- **Progress tracking**: Mark action items as complete, track transformation progress over time
- **Industry vertical overlays**: Show which models are most relevant for specific industries
- **Embeddable widget**: Allow the map to be embedded in blog posts or presentations

---

## Terminology Reference

Terms used throughout the data that may need context:

| Term | Meaning |
|------|---------|
| **Delivery Blend** | Ratio of human to AI in actual production work |
| **Context Acquisition** | How a business learns enough about the customer to deliver customized outcomes |
| **CAS** | Customization at Scale — AI-driven low marginal cost delivery of personalized outcomes |
| **Orientation Fabric** | The context layer that maintains business understanding across decision boundaries |
| **Services Wedge** | Strategy of starting with services to acquire context and revenue, then progressively automating toward product |
| **Hole Not Hammer** | Customers want outcomes (holes), not tools (hammers). They accepted hammers because custom holes were too expensive |
| **Confidence Calibration** | A system's ability to know what it doesn't know — critical for determining when AI can act autonomously |
| **Progressive Autonomy** | Migration from human-supervised AI to fully autonomous: suggest → act with approval → autonomous |
| **OODA Loop** | Observe-Orient-Decide-Act decision cycle. The orient phase is where context fidelity matters most |
| **B2E** | Business-to-Entrepreneur — serving startup founders, solopreneurs, people wanting to start or scale |

---

## Contributing

### Adding a New Value Delivery Model
1. Add an entry to the models array with all required fields
2. Position it on the map (x: 0-100 for delivery blend, y: 0-100 for context acquisition)
3. Assign status, interface type, pricing model, archetype, and problem types
4. Write the description and bestFor text
5. Consider whether it needs migration paths to/from existing models

### Adding a Migration Path
1. Add an entry to the migrations array with `from` and `to` node IDs
2. Write the reasoning (why this path exists, what forces drive it)
3. Fill in all five action categories (team, gtm, ops, finance, timeline)
4. Consider whether any founder profiles should reference this path

### Adding a Founder Profile
1. Add an entry to the profiles array
2. Identify which existing nodes represent "you are here" (cur) and "where to go" (tgt)
3. Write strategic advice specific to this profile
4. Ensure migration paths exist between cur and tgt nodes

---

## License

[Choose your license]

## Credits

Built through an iterative analytical conversation exploring how AI is restructuring B2B value delivery models. The framework, taxonomy, and action plans were developed collaboratively, synthesizing patterns from case studies across consultancies, SaaS companies, agencies, dev shops, and emerging AI-native business models.
