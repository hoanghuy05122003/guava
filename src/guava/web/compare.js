/**
 * 🍈 Guava Studio — ⚖️ Compare Models.
 * Two models side by side: overall metrics with the difference, per-class metrics,
 * both confusion matrices, and one-click jumps to the images where they disagree
 * (opened in the grid's "Label ⟷ Prediction" view so the boxes can be compared).
 * Loaded last; reuses app.js / model.js / editor.js globals.
 */

const cmpUi = { data: null, busy: false };
CMP_LABELS.disagree = (a, b) => `${a} and ${b} disagree`;

const CMP_METRICS = [
  ["mAP50", "mAP@50", true, pct],
  ["mAP50_95", "mAP@50:95", true, pct],
  ["precision", "Precision", true, pct],
  ["recall", "Recall", true, pct],
  ["f1", "F1", true, pct],
  ["tp", "TP (found)", true, (v) => v ?? "–"],
  ["fp", "FP (false alarms)", false, (v) => v ?? "–"],
  ["fn", "FN (missed)", false, (v) => v ?? "–"],
];

async function openCompare() {
  const body = document.getElementById("compare-body");
  body.innerHTML = `<div class="lb-empty">Loading…</div>`;
  await loadDatasetInfo();
  const models = modelUi.predModels || [];
  if (models.length < 2) {
    body.innerHTML = `
      <div class="cmp-empty">
        <div style="font-size:40px;">⚖️</div>
        <h3>${models.length ? "Only one model has predictions" : "No model predictions yet"}</h3>
        <p>Comparing needs predictions from <b>two models</b> on this dataset. Open <b>🤖 Run Model</b>, pick a weights file and run it;
        then run it again with another weights file. Each run is kept as its own model (A, B, …), so nothing is overwritten.</p>
        <div style="display:flex; gap:8px; justify-content:center; margin-top:12px;">
          <button class="primary-btn" onclick="closeModal('compare'); openModal('model');">🤖 Run Model</button>
          ${models.length ? `<button class="secondary-btn" onclick="closeModal('compare'); openModal('eval');">📈 Evaluate ${escapeHtml(models[0].name)}</button>` : ""}
        </div>
      </div>`;
    return;
  }
  if (models.some((m) => !m.eval) || (state.info && state.info.eval_stale)) {
    body.innerHTML = `<div class="lb-empty">Evaluating every model with the same settings…</div>`;
    await reevaluateAll(false);
  }
  await refreshCompare();
}

async function reevaluateAll(rerender = true) {
  try {
    await api("/api/eval/run", {});
    await loadDatasetInfo();
    await loadSamples();
  } catch (e) {
    toast(e.message, true);
  }
  if (rerender) await refreshCompare();
}

async function refreshCompare() {
  try {
    await loadCompare();  // model.js: fills modelUi.compare for state.cmp.a / state.cmp.b
    cmpUi.data = modelUi.compare;
    renderCompareModal();
  } catch (e) {
    document.getElementById("compare-body").innerHTML = `<div class="ep-warn">${escapeHtml(e.message)}</div>`;
  }
}

function cmpSwatch(name) {
  return `<span class="model-swatch" style="background:${modelColor(name)}">${modelLetter(name)}</span>`;
}

function deltaCell(a, b, higherBetter, isPct) {
  if (a === undefined || a === null || b === undefined || b === null) return `<td class="na">–</td>`;
  const d = b - a;
  if (Math.abs(d) < 1e-9) return `<td class="delta same">=</td>`;
  const good = higherBetter ? d > 0 : d < 0;
  const txt = isPct ? `${d > 0 ? "+" : ""}${(d * 100).toFixed(1)} pt` : `${d > 0 ? "+" : ""}${d}`;
  return `<td class="delta ${good ? "better" : "worse"}" title="${good ? "B is better" : "A is better"}">${txt} ${good ? "▲B" : "▲A"}</td>`;
}

function confusionHtml(rep, model) {
  const cm = (rep && rep.confusion) || { labels: [], matrix: [] };
  if (!cm.labels.length) return `<div class="lb-empty">No confusion matrix.</div>`;
  const max = Math.max(1, ...cm.matrix.flat());
  const short = (s) => (s.length > 14 ? `${s.slice(0, 13)}…` : s);
  return `
    <table class="cm-table">
      <thead><tr><th class="cm-corner">GT ↓ · Pred →</th>${cm.labels.map((l) => `<th class="col" title="${escapeHtml(l)}">${escapeHtml(short(l))}</th>`).join("")}</tr></thead>
      <tbody>${cm.matrix.map((row, i) => `
        <tr><th style="text-align:right" title="${escapeHtml(cm.labels[i])}">${escapeHtml(short(cm.labels[i]))}</th>${row.map((v, j) => {
          const diag = i === j;
          const alpha = v ? 0.15 + 0.75 * (v / max) : 0;
          const color = diag ? `rgba(16,185,129,${alpha})` : `rgba(239,68,68,${alpha})`;
          return `<td class="${v ? "" : "zero"}" style="background:${color}" data-model="${escapeHtml(model)}" data-gt="${escapeHtml(cm.labels[i])}" data-pred="${escapeHtml(cm.labels[j])}" title="${escapeHtml(model)}: GT ${escapeHtml(cm.labels[i])} → Pred ${escapeHtml(cm.labels[j])}: ${v}">${v || "·"}</td>`;
        }).join("")}</tr>`).join("")}</tbody>
    </table>`;
}

function renderCompareModal() {
  const body = document.getElementById("compare-body");
  const d = cmpUi.data;
  if (!d) {
    body.innerHTML = `<div class="ep-warn">Could not load the comparison.</div>`;
    return;
  }
  const a = state.cmp.a, b = state.cmp.b;
  const ra = (d.reports || {})[a] || {}, rb = (d.reports || {})[b] || {};
  const oa = ra.overall || {}, ob = rb.overall || {};
  const st = d.settings || {};
  const counts = d.counts || {};
  const classification = ra.type === "classification" || rb.type === "classification";

  const metrics = classification ? [["accuracy", "Accuracy", true, pct], ["correct", "Correct images", true, (v) => v ?? "–"]] : CMP_METRICS;
  const overall = metrics.map(([k, label, hi, fmt]) => {
    const va = oa[k], vb = ob[k];
    const best = va === undefined || vb === undefined || va === vb ? "" : ((hi ? vb > va : vb < va) ? "b" : "a");
    return `<tr><th>${label}</th><td class="${best === "a" ? "best" : ""}">${fmt(va)}</td><td class="${best === "b" ? "best" : ""}">${fmt(vb)}</td>${deltaCell(va, vb, hi, fmt === pct)}</tr>`;
  }).join("");

  const ca = Object.fromEntries((ra.classes || []).map((c) => [c.label, c]));
  const cb = Object.fromEntries((rb.classes || []).map((c) => [c.label, c]));
  const labels = [...new Set([...Object.keys(ca), ...Object.keys(cb)])];
  const perClass = labels.map((l) => {
    const x = ca[l] || {}, y = cb[l] || {};
    const cell = (v, other, hi = true) => `<td class="${v !== undefined && other !== undefined && v !== other && (hi ? v > other : v < other) ? "best" : ""}">${pct(v)}</td>`;
    return `<tr class="clickable" data-label="${escapeHtml(l)}">
      <td><span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(l)}"></span> ${escapeHtml(l)}</td>
      <td>${x.support ?? y.support ?? "–"}</td>
      ${cell(x.precision, y.precision)}${cell(x.recall, y.recall)}${cell(x.ap50, y.ap50)}
      <td class="sep"></td>
      ${cell(y.precision, x.precision)}${cell(y.recall, x.recall)}${cell(y.ap50, x.ap50)}
      ${deltaCell(x.ap50, y.ap50, true, true)}
      <td>${x.fn ?? "–"} / ${y.fn ?? "–"}</td><td>${x.fp ?? "–"} / ${y.fp ?? "–"}</td>
    </tr>`;
  }).join("");

  const jump = (mode, icon, text, n) => `<button class="secondary-btn cmp-jump" data-cmp="${mode}">${icon} ${text} <span class="chip-count">${n ?? "–"}</span></button>`;

  body.innerHTML = `
    <div class="cmp-head">
      <label>Model A <select class="guava-select cmp-a">${modelOptions(a)}</select></label>
      <span class="vs">vs</span>
      <label>Model B <select class="guava-select cmp-b">${modelOptions(b, a)}</select></label>
      <span class="cmp-settings">IoU ${st.iou ?? 0.5} · operating conf ${st.conf ?? 0} — same settings for both</span>
      <button class="secondary-btn" onclick="reevaluateAll()">↻ Re-evaluate</button>
    </div>
    ${d.eval_stale ? `<div class="ep-warn">Labels were edited after the last evaluation: per-image results are up to date, totals below are not. Click ↻ Re-evaluate.</div>` : ""}

    <div class="cmp-grid">
      <div>
        <h4 class="eval-h">Overall</h4>
        <table class="eval-table cmp2-table">
          <thead><tr><th>Metric</th><th>${cmpSwatch(a)} ${escapeHtml(a)}</th><th>${cmpSwatch(b)} ${escapeHtml(b)}</th><th>B − A</th></tr></thead>
          <tbody>${overall}</tbody>
        </table>
      </div>
      <div>
        <h4 class="eval-h">Images where they disagree <span class="ep-sub">(opens them as Label ⟷ A ⟷ B)</span></h4>
        <div class="cmp-jumps">
          ${jump("a_wrong_b_right", "⚖️", `${modelLetter(a)} wrong · ${modelLetter(b)} right`, counts.a_wrong_b_right)}
          ${jump("b_wrong_a_right", "⚖️", `${modelLetter(b)} wrong · ${modelLetter(a)} right`, counts.b_wrong_a_right)}
          ${jump("both_wrong", "⛔", "Both wrong", counts.both_wrong)}
          ${jump("both_right", "✅", "Both right", counts.both_right)}
        </div>
        <p class="ep-sub" style="margin-top:8px;">"Wrong" = at least one false positive or missed object at the operating conf.
        In the images, each model panel shows correct boxes green, false alarms red and missed labels dashed.</p>
      </div>
    </div>

    ${classification ? "" : `
    <h4 class="eval-h">Per class <span class="ep-sub">(click a row to see that class's images)</span></h4>
    <div class="cmp-scroll">
    <table class="eval-table cmp2-table perclass">
      <thead>
        <tr><th rowspan="2">Class</th><th rowspan="2">GT</th><th colspan="3">${cmpSwatch(a)} ${escapeHtml(a)}</th><th class="sep"></th><th colspan="3">${cmpSwatch(b)} ${escapeHtml(b)}</th><th rowspan="2">ΔAP50</th><th rowspan="2">FN A / B</th><th rowspan="2">FP A / B</th></tr>
        <tr><th>P</th><th>R</th><th>AP50</th><th class="sep"></th><th>P</th><th>R</th><th>AP50</th></tr>
      </thead>
      <tbody>${perClass}</tbody>
    </table>
    </div>`}

    <h4 class="eval-h">Confusion matrices <span class="ep-sub">(rows = label, columns = prediction, (background) = missed / false alarm · click a cell to see the images)</span></h4>
    <div class="cm-pair">
      <div><div class="cm-title">${cmpSwatch(a)} ${escapeHtml(a)}</div><div class="cm-wrap">${confusionHtml(ra, a)}</div></div>
      <div><div class="cm-title">${cmpSwatch(b)} ${escapeHtml(b)}</div><div class="cm-wrap">${confusionHtml(rb, b)}</div></div>
    </div>`;

  body.querySelector(".cmp-a").addEventListener("change", (e) => {
    state.cmp.a = e.target.value;
    if (state.cmp.b === state.cmp.a) state.cmp.b = modelUi.predModels.map((m) => m.name).find((n) => n !== state.cmp.a) || "";
    refreshCompare();
  });
  body.querySelector(".cmp-b").addEventListener("change", (e) => { state.cmp.b = e.target.value; refreshCompare(); });
  body.querySelectorAll(".cmp-jump").forEach((btn) => btn.addEventListener("click", () => {
    closeModal("compare");
    if (state.gridView !== "split") setGridView("split");
    setCompareFilter(btn.dataset.cmp);  // model.js: shows only layers A and B
  }));
  body.querySelectorAll("tr[data-label]").forEach((tr) => tr.addEventListener("click", () => {
    showCompareImages(() => {
      state.searchQuery = tr.dataset.label;
      const search = document.getElementById("sample-search");
      if (search) search.value = tr.dataset.label;
      state.cmp.mode = "disagree";
    });
  }));
  body.querySelectorAll(".cm-table td[data-gt]:not(.zero)").forEach((td) => td.addEventListener("click", () => {
    showCompareImages(() => {
      state.activeModel = td.dataset.model;
      state.cmGt = td.dataset.gt;
      state.cmPred = td.dataset.pred;
      state.cmp.mode = "";
    });
  }));
  renderCompareSidebar();
}

/** Close the modal and show images in the split view with only models A and B visible. */
function showCompareImages(setFilters) {
  closeModal("compare");
  state.filterIssue = "";
  state.cmGt = state.cmPred = "";
  modelUi.predModels.forEach((m) => {
    if (m.name === state.cmp.a || m.name === state.cmp.b) state.hiddenModels.delete(m.name); else state.hiddenModels.add(m.name);
  });
  setFilters();
  state.page = 1;
  if (state.gridView !== "split") state.gridView = "split";
  document.querySelectorAll("#grid-view-seg button").forEach((b) => b.classList.toggle("active", b.dataset.view === "split"));
  document.getElementById("samples-grid").classList.add("grid-split");
  renderModelLayers();
  updateActiveFiltersBar();
  renderEvalFilters(state.info);
  loadSamples();
}

// Evaluate modal: say so when labels were edited after the totals were computed
const _renderEvalWarningsBase = renderEvalWarnings;
renderEvalWarnings = function (r) {
  _renderEvalWarningsBase(r);
  const box = document.getElementById("eval-warnings");
  if (box && state.info && state.info.eval_stale) {
    box.insertAdjacentHTML("afterbegin", `<div class="eval-warn">✏️ Labels were edited after this evaluation: per-image results are already updated, the totals are not. Click <b>Re-evaluate</b>.</div>`);
    box.style.display = "";
  }
};
