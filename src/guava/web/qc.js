// ── QC decision support (eval modal) ────────────────────────
// Image-level OK/NG per model: escape (NG image passed) vs overkill (OK image rejected),
// per-class PR and F1-vs-confidence curves with a recommended threshold for a target
// recall, bootstrap 95% CIs, and box-level A/B filters. Data: /api/eval/qc.

modelUi.qc = null;
const qcUi = { cls: "", timer: null, seq: 0, busy: false };

Object.assign(CMP_LABELS, {
  only_a_found: (a) => `Only ${a} found`,
  only_b_found: (a, b) => `Only ${b} found`,
  class_diff: () => "Both found · different class",
  a_missed_critical: (a, b) => `${a} missed critical · ${b} found`,
  b_missed_critical: (a, b) => `${b} missed critical · ${a} found`,
});
const BOX_MODES = ["a_missed_critical", "b_missed_critical", "only_a_found", "only_b_found", "class_diff"];
const SMALL_N = 30;  // fewer GT objects than this: metrics are noisy

const pctCi = (ci) => (ci ? `${(ci.lo * 100).toFixed(1)}–${(ci.hi * 100).toFixed(1)}%` : "–");
const fmtThr = (v) => (v === null || v === undefined ? "–" : Number(v).toFixed(3));

/** Called at the end of renderCompareTable(): re-add QC columns, refresh QC data. */
function qcAfterCompare() {
  const box = document.getElementById("eval-compare");
  if (box) qcInjectColumns(box);
  clearTimeout(qcUi.timer);
  qcUi.timer = setTimeout(() => loadQc(), 30);
}

async function loadQc(settings = {}) {
  const seq = ++qcUi.seq;
  const el = document.getElementById("eval-qc");
  const st = el && el.querySelector(".qc-status");
  if (st) st.textContent = "Computing…";
  try {
    const data = await api("/api/eval/qc", { a: state.cmp.a, b: state.cmp.b, ...settings });
    if (seq !== qcUi.seq) return;
    modelUi.qc = data;
  } catch (e) {
    if (seq !== qcUi.seq) return;
    modelUi.qc = null;
    if (!/No dataset/.test(e.message)) toast(e.message, true);
  }
  const box = document.getElementById("eval-compare");
  if (box) qcInjectColumns(box);
  renderQcPanel();
}

function qcModels() {
  const qc = modelUi.qc;
  if (!qc) return [];
  const order = modelUi.predModels.map((m) => m.name);
  return Object.keys(qc.models).sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

/** Extra columns in the model comparison table: CIs and escape / overkill. */
function qcInjectColumns(box) {
  const qc = modelUi.qc;
  const table = box.querySelector(".cmp-table");
  if (!qc || !table || table.dataset.qc) return;
  table.dataset.qc = "1";
  const names = qcModels();
  if (!names.length) return;
  const minOf = (f) => Math.min(...names.map((n) => f(qc.models[n]) ?? Infinity));
  const minEsc = minOf((r) => r.image.escape_rate), minOk = minOf((r) => r.image.overkill_rate);
  const head = table.querySelector("thead tr");
  head.insertAdjacentHTML("beforeend", `
    <th title="Bootstrap 95% CI over images (${qc.models[names[0]].ci.n_boot} resamples)">mAP@50 CI</th>
    <th title="Bootstrap 95% CI over images">R CI</th>
    <th title="NG images (GT has a critical class) the model passed">Escape</th>
    <th title="OK images the model rejected (critical class predicted)">Overkill</th>`);
  table.querySelectorAll("tbody tr[data-model]").forEach((tr) => {
    const r = qc.models[tr.dataset.model];
    if (!r) { tr.insertAdjacentHTML("beforeend", "<td>–</td>".repeat(4)); return; }
    const im = r.image;
    tr.insertAdjacentHTML("beforeend", `
      <td class="qc-ci">${pctCi(r.ci.mAP50)}</td>
      <td class="qc-ci">${pctCi(r.ci.recall)}</td>
      <td class="${im.escape_rate === minEsc ? "best" : ""} ${im.escaped ? "qc-bad" : ""}" title="${im.escaped} of ${im.ng} NG images">${pct(im.escape_rate)} <span class="qc-n">${im.escaped}/${im.ng}</span></td>
      <td class="${im.overkill_rate === minOk ? "best" : ""}" title="${im.overkill} of ${im.ok} OK images">${pct(im.overkill_rate)} <span class="qc-n">${im.overkill}/${im.ok}</span></td>`);
  });
}

function qcThresholdsFromInputs(el) {
  const out = {};
  el.querySelectorAll("input[data-thr-model]").forEach((inp) => {
    const v = inp.value.trim();
    if (v === "") return;
    (out[inp.dataset.thrModel] = out[inp.dataset.thrModel] || {})[inp.dataset.cls] = parseFloat(v);
  });
  return out;
}

function qcFilter(model, issue) {
  state.cmp.mode = "";
  state.cmGt = state.cmPred = "";
  state.filterIssue = issue;
  setActiveModel(model, false).then(() => applyEvalFilter());
}

function renderQcPanel() {
  const el = document.getElementById("eval-qc");
  if (!el) return;
  const qc = modelUi.qc;
  const names = qcModels();
  if (!qc || !names.length) {
    el.style.display = "none";
    el.innerHTML = "";
    return;
  }
  el.style.display = "";
  const cfg = qc.config;
  const crit = cfg.critical;
  const first = qc.models[names[0]];
  const target = first.target_recall;
  const swatch = (n) => `<span class="model-swatch" style="background:${modelColor(n)}">${modelLetter(n)}</span>`;

  const chips = cfg.labels.map((lb) => `
    <span class="qc-chip ${crit.includes(lb) ? "on" : ""}" data-crit="${escapeHtml(lb)}" title="Toggle critical (NG) class">
      <span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(lb)}"></span>${escapeHtml(lb)}</span>`).join("");
  const weights = crit.map((c) => `
    <label class="qc-w">${escapeHtml(c)} <input type="number" class="guava-input" data-w="${escapeHtml(c)}" min="0" step="0.5" value="${(cfg.weights || {})[c] ?? 1}"></label>`).join("");

  const rows = names.map((n) => {
    const r = qc.models[n], im = r.image, ar = r.at_recommended;
    const thr = crit.map((c) => `<input type="number" class="guava-input qc-thr" min="0" max="1" step="0.05"
        data-thr-model="${escapeHtml(n)}" data-cls="${escapeHtml(c)}" title="${escapeHtml(c)} threshold"
        value="${(((cfg.thresholds || {})[n] || {})[c]) ?? ""}" placeholder="${fmtThr(r.conf)}">`).join("");
    const unreach = r.classes.filter((c) => c.critical && c.recommended && c.recommended.conf !== null && !c.recommended.reachable);
    const recThr = crit.map((c) => fmtThr(r.recommended[c])).join(" / ");
    return `<tr data-model="${escapeHtml(n)}">
      <td>${swatch(n)} ${escapeHtml(n)}</td>
      <td>${im.images}</td><td>${im.ng}</td><td>${im.ok}</td>
      <td class="clickable-cell ${im.escaped ? "qc-bad" : ""}" data-filter="qc_escape" title="Show escaped NG images">${pct(im.escape_rate)} <span class="qc-n">${im.escaped}</span></td>
      <td class="clickable-cell" data-filter="qc_overkill" title="Show over-rejected OK images">${pct(im.overkill_rate)} <span class="qc-n">${im.overkill}</span></td>
      <td>${pct(im.weighted_escape_rate)}</td>
      <td class="qc-thr-cell">${thr}</td>
      <td title="${unreach.length ? `Target recall not reachable for ${unreach.map((c) => c.label).join(", ")}: lowest threshold shown` : ""}">${recThr}${unreach.length ? " ⚠️" : ""}</td>
      <td>${pct(ar.escape_rate)}</td><td>${pct(ar.overkill_rate)}</td>
      <td><button class="secondary-btn qc-use" title="Copy the recommended thresholds into this model's thresholds">Use</button></td>
    </tr>`;
  }).join("");

  // per-class sample sizes + per-model threshold at target recall
  const labels = cfg.labels.filter((lb) => names.some((n) => qc.models[n].classes.some((c) => c.label === lb)));
  if (!labels.includes(qcUi.cls)) qcUi.cls = labels.find((lb) => crit.includes(lb)) || labels[0] || "";
  const clsRows = labels.map((lb) => {
    const per = names.map((n) => qc.models[n].classes.find((c) => c.label === lb));
    const base = per.find(Boolean) || {};
    const small = base.n_gt < SMALL_N;
    return `<tr class="clickable ${lb === qcUi.cls ? "active-row" : ""}" data-cls="${escapeHtml(lb)}">
      <td><span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(lb)}"></span> ${escapeHtml(lb)}${crit.includes(lb) ? ' <span class="qc-tag">NG</span>' : ""}</td>
      <td>${base.n_images ?? 0}</td><td class="${small ? "qc-small" : ""}" title="${small ? `Fewer than ${SMALL_N} objects: per-class metrics are noisy` : ""}">${base.n_gt ?? 0}${small ? " ⚠️" : ""}</td>
      ${per.map((c) => (c ? `<td title="max recall ${pct(c.max_recall)} · best F1 ${c.best_f1 ? `${pct(c.best_f1.f1)} @ ${fmtThr(c.best_f1.conf)}` : "–"}">${fmtThr(c.recommended.conf)}${c.recommended.conf !== null && !c.recommended.reachable ? " ⚠️" : ""} <span class="qc-n">P ${pct(c.recommended.precision)}</span></td>` : "<td>–</td>")).join("")}
    </tr>`;
  }).join("");

  const box = qc.box_counts;
  const boxHtml = multiModel() && box ? `
    <h4 class="eval-h">Box-level A vs B <span class="qc-sub">(per GT object at the eval IoU / min conf; critical = NG classes)</span></h4>
    <div class="cmp-selects">
      <select class="guava-input cmp-a">${modelOptions(state.cmp.a)}</select><span>vs</span>
      <select class="guava-input cmp-b">${modelOptions(state.cmp.b, state.cmp.a)}</select>
    </div>
    <div class="cmp-buttons">${BOX_MODES.map((k) => `
      <div class="secondary-btn cmp-btn ${state.cmp.mode === k ? "active" : ""} ${k.endsWith("critical") && box[k] ? "qc-alert" : ""}" data-cmp="${k}">
        <span>${k.endsWith("critical") ? "🚨" : k === "class_diff" ? "🔀" : "🔍"} ${CMP_LABELS[k](modelLetter(state.cmp.a), modelLetter(state.cmp.b))}</span>
        <span class="chip-count">${box[k]}</span></div>`).join("")}
    </div>` : "";

  el.innerHTML = `
    <h4 class="eval-h">QC decision support — OK / NG per image <span class="qc-status qc-sub"></span></h4>
    <div class="qc-settings">
      <div class="qc-row"><span class="qc-lbl">Critical (NG) classes${cfg.auto_critical ? ' <span class="qc-sub">auto</span>' : ' <a href="#" class="qc-auto">reset</a>'}</span>${chips}</div>
      <div class="qc-row"><span class="qc-lbl">Severity weights</span>${weights || '<span class="qc-sub">pick a critical class</span>'}
        <label class="qc-w">Target recall <input type="number" class="guava-input" id="qc-target" min="50" max="100" step="0.5" value="${(target * 100).toFixed(1)}">%</label>
        <button class="primary-btn qc-apply">Apply</button></div>
    </div>
    <table class="eval-table qc-table">
      <thead><tr><th>Model</th><th>Images</th><th>NG</th><th>OK</th><th>Escape</th><th>Overkill</th><th title="Escape weighted by the severity of each image's worst critical class">Wtd esc.</th>
        <th>Threshold ${crit.map(escapeHtml).join(" / ")}</th><th>Rec. @R≥${pct(target)}</th><th>Esc. @rec</th><th>Overk. @rec</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="qc-split">
      <div>
        <h4 class="eval-h">Per class <span class="qc-sub">(threshold for box recall ≥ ${pct(target)} · click a row for its curves)</span></h4>
        <table class="eval-table qc-cls">
          <thead><tr><th>Class</th><th>#Images</th><th>#Objects</th>${names.map((n) => `<th>${swatch(n)} thr</th>`).join("")}</tr></thead>
          <tbody>${clsRows}</tbody>
        </table>
      </div>
      <div class="qc-curves" id="qc-curves"></div>
    </div>
    ${boxHtml}`;

  el.querySelectorAll("[data-crit]").forEach((chip) => chip.addEventListener("click", () => {
    const lb = chip.dataset.crit;
    loadQc({ critical: crit.includes(lb) ? crit.filter((c) => c !== lb) : [...crit, lb] });
  }));
  const auto = el.querySelector(".qc-auto");
  if (auto) auto.addEventListener("click", (e) => { e.preventDefault(); loadQc({ critical: null }); });
  const apply = () => {
    const w = {};
    el.querySelectorAll("input[data-w]").forEach((inp) => { w[inp.dataset.w] = parseFloat(inp.value) || 0; });
    const t = parseFloat(document.getElementById("qc-target").value);
    loadQc({ weights: w, thresholds: qcThresholdsFromInputs(el), target_recall: Number.isFinite(t) ? t / 100 : undefined });
  };
  el.querySelector(".qc-apply").addEventListener("click", apply);
  el.querySelectorAll("input.qc-thr").forEach((inp) => inp.addEventListener("change", () => loadQc({ thresholds: qcThresholdsFromInputs(el) })));
  el.querySelectorAll(".qc-table tr[data-model]").forEach((tr) => {
    const n = tr.dataset.model;
    tr.querySelectorAll("[data-filter]").forEach((td) => td.addEventListener("click", () => qcFilter(n, td.dataset.filter)));
    tr.querySelector(".qc-use").addEventListener("click", () => {
      const thr = qcThresholdsFromInputs(el);
      thr[n] = { ...(thr[n] || {}), ...qc.models[n].recommended };
      loadQc({ thresholds: thr });
    });
  });
  el.querySelectorAll(".qc-cls tr[data-cls]").forEach((tr) => tr.addEventListener("click", () => {
    qcUi.cls = tr.dataset.cls;
    el.querySelectorAll(".qc-cls tr[data-cls]").forEach((r) => r.classList.toggle("active-row", r === tr));
    renderQcCurves();
  }));
  if (boxHtml) {
    bindCompareControls(el, async () => {
      await loadCompare();
      renderCompareTable();
      renderCompareSidebar();
    });
  }
  renderQcCurves();
}

/** Inline SVG line chart on [0,1] x [0,1]. series: [{color, pts, dots, label}], vlines: [{x, color, dash}] */
function qcChart({ title, xLabel, yLabel, series, vlines = [] }) {
  const W = 300, H = 210, L = 34, R = 8, T = 18, B = 30;
  const X = (v) => L + v * (W - L - R), Y = (v) => T + (1 - v) * (H - T - B);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((g) => `
    <line x1="${X(0)}" x2="${X(1)}" y1="${Y(g)}" y2="${Y(g)}" class="qc-grid"/>
    <line x1="${X(g)}" x2="${X(g)}" y1="${Y(0)}" y2="${Y(1)}" class="qc-grid"/>
    <text x="${L - 4}" y="${Y(g) + 3}" text-anchor="end" class="qc-tick">${g}</text>
    <text x="${X(g)}" y="${H - B + 12}" text-anchor="middle" class="qc-tick">${g}</text>`).join("");
  const lines = series.map((s) => `
    <polyline fill="none" stroke="${s.color}" stroke-width="1.8" stroke-linejoin="round" points="${s.pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ")}"><title>${escapeHtml(s.label)}</title></polyline>
    ${(s.dots || []).map((d) => `<circle cx="${X(d.x)}" cy="${Y(d.y)}" r="4" fill="${s.color}" stroke="#0f172a" stroke-width="1.5"><title>${escapeHtml(d.title)}</title></circle>`).join("")}`).join("");
  const vl = vlines.map((v) => `<line x1="${X(v.x)}" x2="${X(v.x)}" y1="${Y(0)}" y2="${Y(1)}" stroke="${v.color}" stroke-dasharray="${v.dash || "4 3"}" stroke-width="1.2"><title>${escapeHtml(v.title || "")}</title></line>`).join("");
  return `<svg class="qc-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(title)}">
    <text x="${L}" y="11" class="qc-ctitle">${escapeHtml(title)}</text>
    ${grid}${vl}${lines}
    <text x="${(L + W - R) / 2}" y="${H - 3}" text-anchor="middle" class="qc-axis">${xLabel}</text>
    <text x="10" y="${(T + H - B) / 2}" text-anchor="middle" class="qc-axis" transform="rotate(-90 10 ${(T + H - B) / 2})">${yLabel}</text>
  </svg>`;
}

function renderQcCurves() {
  const el = document.getElementById("qc-curves");
  const qc = modelUi.qc;
  if (!el || !qc) return;
  const lb = qcUi.cls;
  const names = qcModels();
  const target = qc.models[names[0]].target_recall;
  const pr = [], f1 = [], vF1 = [];
  const legend = [];
  names.forEach((n) => {
    const c = qc.models[n].classes.find((x) => x.label === lb);
    if (!c || !c.conf.length) return;
    const color = modelColor(n);
    const rc = c.recommended;
    const recIdx = rc.conf === null ? -1 : c.conf.findIndex((v) => v <= rc.conf + 1e-9);
    pr.push({ color, label: n, pts: c.recall.map((r, i) => [r, c.precision[i]]),
      dots: recIdx >= 0 ? [{ x: c.recall[recIdx], y: c.precision[recIdx], title: `${n}: threshold ${fmtThr(rc.conf)} → R ${pct(rc.recall)} P ${pct(rc.precision)}` }] : [] });
    const best = c.best_f1;
    f1.push({ color, label: n, pts: c.conf.map((v, i) => [v, c.f1[i]]),
      dots: best ? [{ x: best.conf, y: best.f1, title: `${n}: best F1 ${pct(best.f1)} @ ${fmtThr(best.conf)}` }] : [] });
    if (rc.conf !== null) vF1.push({ x: rc.conf, color, title: `${n}: recommended ${fmtThr(rc.conf)} for R ≥ ${pct(target)}` });
    legend.push(`<span class="qc-leg"><span class="model-swatch" style="background:${color}">${modelLetter(n)}</span>
      thr ${fmtThr(rc.conf)}${rc.conf !== null && !rc.reachable ? " ⚠️ unreachable" : ""} · R ${pct(rc.recall)} · P ${pct(rc.precision)}${rc.overkill_rate !== undefined ? ` · overkill ${pct(rc.overkill_rate)}` : ""} · best F1 ${best ? `${pct(best.f1)} @ ${fmtThr(best.conf)}` : "–"}</span>`);
  });
  if (!pr.length) {
    el.innerHTML = `<div class="qc-sub" style="padding:20px;">No predictions of <b>${escapeHtml(lb)}</b>.</div>`;
    return;
  }
  el.innerHTML = `
    <h4 class="eval-h">${escapeHtml(lb)} <span class="qc-sub">● = recommended threshold (PR) / best F1 · dashed = threshold for R ≥ ${pct(target)}</span></h4>
    <div class="qc-chart-row">
      ${qcChart({ title: "Precision–Recall", xLabel: "Recall", yLabel: "Precision", series: pr, vlines: [{ x: target, color: "#94a3b8", title: `target recall ${pct(target)}` }] })}
      ${qcChart({ title: "F1 vs confidence", xLabel: "Confidence threshold", yLabel: "F1", series: f1, vlines: vF1 })}
    </div>
    <div class="qc-legend">${legend.join("")}</div>`;
}