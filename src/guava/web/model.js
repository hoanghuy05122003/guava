/**
 * 🍈 Guava Studio — offline model inference, evaluation and quick check.
 * Loaded after app.js; reuses its global `state`, loadSamples(), loadDatasetInfo(), openModal()...
 */

const modelUi = { models: [], jobId: null, pollTimer: null, system: null, report: null };

function toast(msg, isError = false) {
  const el = document.createElement("div");
  el.className = `toast ${isError ? "error" : ""}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), isError ? 7000 : 3500);
}

async function api(url, body) {
  const opts = body === undefined ? {} : {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.status === "error") throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

const pct = (v) => (v === null || v === undefined ? "–" : `${(v * 100).toFixed(1)}%`);

// ── Grid helpers used by app.js ─────────────────────────────

function evalBadgesHtml(sample) {
  const per = sample.eval_models || {};
  const names = Object.keys(per);
  if (names.length > 1 && multiModel()) {
    // one compact badge per evaluated model: "A✓ BFP1"
    return modelUi.predModels.filter((m) => per[m.name] && !state.hiddenModels.has(m.name)).map((m) => {
      const e = per[m.name];
      const wrong = e.correct === false || e.fp || e.fn;
      const txt = e.correct !== undefined ? (e.correct ? "✓" : "✗") : (wrong ? `${e.fp ? `FP${e.fp}` : ""}${e.fn ? `FN${e.fn}` : ""}` : "✓");
      return `<span class="eval-badge ${wrong ? "fp" : "ok"}" title="${escapeHtml(m.name)}: TP${e.tp ?? ""} FP${e.fp ?? ""} FN${e.fn ?? ""}"><b style="color:${modelColor(m.name)}">${modelLetter(m.name)}</b>${txt}</span>`;
    }).join(" ");
  }
  const f = per[state.activeModel] ? { ...per[state.activeModel] } : sample.fields || {};
  if (f.tp !== undefined) { f.eval_fp = f.fp; f.eval_fn = f.fn; }
  if (f.correct !== undefined) f.eval_correct = f.correct;
  if (f.eval_fp === undefined && f.eval_correct === undefined) return "";
  if (f.eval_correct === false) return `<span class="eval-badge fp" title="Wrong class">✗</span>`;
  const parts = [];
  if (f.eval_fp) parts.push(`<span class="eval-badge fp" title="False positives">FP${f.eval_fp}</span>`);
  if (f.eval_fn) parts.push(`<span class="eval-badge fn" title="Missed objects">FN${f.eval_fn}</span>`);
  if (!parts.length) parts.push(`<span class="eval-badge ok" title="All matched">✓</span>`);
  return parts.join("");
}

function renderEvalFilters(info) {
  const section = document.getElementById("eval-filter-section");
  const box = document.getElementById("eval-filters-container");
  if (!section || !box) return;
  syncModels(info);
  renderModelLayers();
  renderCompareSidebar();
  if (!info || !info.inferred_count) {
    section.style.display = "none";
    return;
  }
  section.style.display = "";
  const active = modelUi.predModels.find((m) => m.name === state.activeModel);
  const nameEl = document.getElementById("eval-model-name");
  nameEl.textContent = active ? `${multiModel() ? `${modelLetter(active.name)} · ` : ""}${active.name}` : `${info.inferred_count} inferred`;
  nameEl.title = active ? `${active.inferred} images inferred — ★ another model in Annotation Layers to switch` : "";
  const items = [
    ["has_pred", "▲", "Has predictions"],
    ["no_pred", "∅", "No predictions"],
    ["not_inferred", "⏳", "Not inferred yet"],
  ];
  if (active ? active.eval : info.has_eval) {
    items.unshift(
      ["eval_error", "⚠️", "Any error (FP/FN)"],
      ["eval_fp", "🟥", "False positives"],
      ["eval_fn", "🟪", "Missed (FN)"],
      ["eval_ok", "✅", "Perfect match"],
    );
  }
  box.innerHTML = items.map(([key, icon, label]) => `
    <div class="filter-chip ${state.filterIssue === key ? "active" : ""}" data-issue="${key}">
      <span class="chip-label-left"><span>${icon}</span><span>${label}</span></span>
    </div>`).join("");
  box.querySelectorAll("[data-issue]").forEach((el) => {
    el.addEventListener("click", () => {
      const key = el.dataset.issue;
      state.filterIssue = state.filterIssue === key ? "" : key;
      state.page = 1;
      updateActiveFiltersBar();
      renderEvalFilters(state.info);
      loadSamples();
    });
  });

  const preds = info.predictions || {};
  const catBox = document.getElementById("categories-container");
  Object.entries(preds).forEach(([label, count]) => {
    if ((info.categories || {})[label] !== undefined || !catBox) return;
    const chip = document.createElement("div");
    chip.className = "filter-chip";
    chip.innerHTML = `<span class="chip-label-left"><span class="cat-color-dot" style="background-color:${getCategoryColor(label)}"></span><span>${escapeHtml(label)} <em style="color:var(--color-pred)">pred</em></span></span><span class="chip-count">${count}</span>`;
    catBox.appendChild(chip);
  });
}

function toggleOnlyErrors(checked) {
  state.evalOnlyErrors = checked;
  renderGrid();
}

function removeConfusionFilter() {
  state.cmGt = "";
  state.cmPred = "";
  state.page = 1;
  updateActiveFiltersBar();
  loadSamples();
}

// ── Model panel ─────────────────────────────────────────────

async function openModelPanel() {
  try {
    const sys = await api("/api/system");
    modelUi.system = sys;
    const b = sys.backends || {};
    document.getElementById("system-info").innerHTML = `
      <span>GPU: <b class="${sys.cuda ? "sys-ok" : "sys-off"}">${sys.cuda ? escapeHtml(sys.gpu) : "not available (CPU)"}</b></span>
      <span>Ultralytics: <b class="${b.ultralytics ? "sys-ok" : "sys-off"}">${b.ultralytics ? "yes" : "no"}</b></span>
      <span>ONNX Runtime: <b class="${b.onnxruntime ? "sys-ok" : "sys-off"}">${b.onnxruntime ? "yes" : "no"}</b></span>
      <span>Torch: <b>${escapeHtml(sys.torch || "–")}</b></span>
      <span title="Set GUAVA_MODEL_DIRS to add folders">Model folders: <b>${(sys.model_dirs || []).map(escapeHtml).join(", ") || "–"}</b></span>`;
    const m = sys.model || {};
    const pathEl = document.getElementById("model-path");
    if (m.path && !pathEl.value) pathEl.value = m.path;
    if (m.conf !== undefined) document.getElementById("model-conf").value = m.conf;
    if (m.iou !== undefined) document.getElementById("model-iou").value = m.iou;
    if (m.mode) document.getElementById("model-mode").value = m.mode;
  } catch (e) {
    document.getElementById("system-info").textContent = `System check failed: ${e.message}`;
  }
  updateModelModeHint();
  if (!modelUi.models.length) scanModels();
  if (modelUi.jobId) pollJob();
}

function updateModelModeHint() {
  const evalMode = document.getElementById("model-mode").value === "eval";
  document.getElementById("model-conf-label").textContent = evalMode ? "Operating conf" : "Confidence";
  document.getElementById("model-iou").disabled = evalMode;
  document.getElementById("model-mode-hint").innerHTML = evalMode
    ? "Stores every box with conf ≥ 0.001 (NMS IoU 0.7, max 300 per image), like <code>ultralytics val</code>, so mAP is complete and comparable between models. " +
      "<b>Operating conf</b> is the threshold for P / R / TP / FP / FN and the initial display filter (confidence slider)."
    : "Stores only boxes with conf ≥ <b>Confidence</b> (what a deployed model would output). " +
      "Lighter, but low-confidence boxes are lost, so mAP comes out <b>lower</b> than <code>ultralytics val</code>.";
}

async function scanModels() {
  const dir = document.getElementById("model-scan-dir").value.trim();
  const list = document.getElementById("model-list");
  list.innerHTML = `<div style="padding:12px; color:var(--text-muted); font-size:12px;">Scanning for .pt / .onnx / .engine files…</div>`;
  try {
    const data = await api(`/api/models${dir ? `?dir=${encodeURIComponent(dir)}` : ""}`);
    modelUi.models = data.models || [];
    renderModelList();
  } catch (e) {
    list.innerHTML = `<div style="padding:12px; color:#c53030; font-size:12px;">${escapeHtml(e.message)}</div>`;
  }
}

function renderModelList() {
  const q = document.getElementById("model-search").value.trim().toLowerCase();
  const current = document.getElementById("model-path").value.trim();
  const items = modelUi.models.filter((m) => !q || m.path.toLowerCase().includes(q));
  document.getElementById("model-found-count").textContent = modelUi.models.length;
  const list = document.getElementById("model-list");
  if (!items.length) {
    list.innerHTML = `<div style="padding:12px; color:var(--text-muted); font-size:12px;">No model files found. Browse to one, or scan another folder.</div>`;
    return;
  }
  list.innerHTML = items.slice(0, 200).map((m, i) => `
    <div class="model-row ${m.path === current ? "active" : ""}" data-idx="${modelUi.models.indexOf(m)}">
      <div style="min-width:0;"><span class="m-name">${escapeHtml(m.name)}</span><span class="m-path">${escapeHtml(m.path)}</span></div>
      <span class="m-meta">${m.format.toUpperCase()}</span>
      <span class="m-meta">${m.size_mb ?? "–"} MB · ${new Date(m.mtime * 1000).toLocaleDateString()}</span>
    </div>`).join("");
  list.querySelectorAll(".model-row").forEach((row) => {
    row.addEventListener("click", () => {
      document.getElementById("model-path").value = modelUi.models[+row.dataset.idx].path;
      renderModelList();
      inspectModel();
    });
  });
}

async function inspectModel() {
  const path = document.getElementById("model-path").value.trim();
  const out = document.getElementById("model-inspect");
  if (!path) return;
  out.innerHTML = "Loading model…";
  try {
    const data = await api("/api/models/inspect", { path, backend: document.getElementById("model-backend").value });
    const m = data.model;
    const classes = m.classes || [];
    document.getElementById("model-alias").placeholder = `auto: ${m.name}`;
    out.innerHTML = `✅ <b style="color:var(--text-main)">${escapeHtml(m.name)}</b> · task <b>${escapeHtml(m.task)}</b> · backend ${escapeHtml(m.backend)} · ${classes.length} classes<br>` +
      classes.slice(0, 40).map((c) => `<span class="cls-chip">${escapeHtml(c)}</span>`).join("") +
      (classes.length > 40 ? ` +${classes.length - 40} more` : "");
  } catch (e) {
    out.innerHTML = `<span style="color:#c53030">❌ ${escapeHtml(e.message)}</span>`;
  }
}

async function runModel(extra = {}) {
  const body = {
    path: document.getElementById("model-path").value.trim(),
    backend: document.getElementById("model-backend").value,
    conf: parseFloat(document.getElementById("model-conf").value) || 0.25,
    iou: parseFloat(document.getElementById("model-iou").value) || 0.45,
    imgsz: document.getElementById("model-imgsz").value || null,
    device: document.getElementById("model-device").value,
    batch: parseInt(document.getElementById("model-batch").value, 10) || 8,
    mode: document.getElementById("model-mode").value,
    alias: document.getElementById("model-alias").value.trim(),
    scope: document.getElementById("model-scope").value,
    auto_eval: document.getElementById("model-auto-eval").checked,
    sample_ids: Array.from(state.selectedSamples),
    filters: currentFilters(),
    ...extra,
  };
  if (body.scope === "selected" && !body.sample_ids.length && !extra.sample_ids) {
    toast("No samples selected — tick some cards first.", true);
    return;
  }
  try {
    const data = await api("/api/models/run", body);
    modelUi.jobId = data.job_id;
    toast(`Inference started on ${data.count} images`);
    pollJob();
  } catch (e) {
    toast(e.message, true);
  }
}

function currentFilters() {
  return {
    subsets: Array.from(state.activeSubsets),
    tags: Array.from(state.activeTags),
    search: state.searchQuery,
    sort_by: state.sortBy,
    filter_issue: state.filterIssue,
    cm_gt: state.cmGt,
    cm_pred: state.cmPred,
    model: state.activeModel,
    cmp: state.cmp.mode,
    cmp_a: state.cmp.a,
    cmp_b: state.cmp.b,
  };
}

async function pollJob() {
  clearTimeout(modelUi.pollTimer);
  if (!modelUi.jobId) return;
  let job;
  try {
    job = await api(`/api/jobs/${modelUi.jobId}`);
  } catch (e) {
    return;
  }
  const running = job.status === "running" || job.status === "queued";
  const frac = job.total ? job.progress / job.total : 0;
  const box = document.getElementById("job-progress");
  box.style.display = "";
  document.getElementById("job-bar-fill").style.width = `${(running ? frac : 1) * 100}%`;
  document.getElementById("job-cancel-btn").style.display = running ? "" : "none";
  document.getElementById("model-run-btn").disabled = running;
  const text = document.getElementById("job-text");
  text.classList.toggle("error", job.status === "error");

  let mini = document.getElementById("job-mini");
  if (!mini) {
    mini = document.createElement("div");
    mini.id = "job-mini";
    mini.className = "job-mini";
    mini.onclick = () => openModal("model");
    document.body.appendChild(mini);
  }

  if (running) {
    const eta = job.eta !== null && job.eta !== undefined ? ` · ETA ${job.eta}s` : "";
    text.textContent = `${job.message || "Running"} — ${job.progress}/${job.total}${eta}`;
    mini.style.display = "block";
    mini.textContent = `🤖 ${job.progress}/${job.total} images${eta}`;
    modelUi.pollTimer = setTimeout(pollJob, 600);
    return;
  }

  mini.style.display = "none";
  if (job.status === "error") {
    text.textContent = `${job.error}\n${job.message || ""}`;
    toast(`Inference failed: ${job.error}`, true);
  } else {
    const r = job.result || {};
    const ev = r.eval ? ` · P ${pct(r.eval.precision)} · R ${pct(r.eval.recall)} · mAP50 ${pct(r.eval.mAP50)}` : "";
    text.textContent = `${job.status === "cancelled" ? "Cancelled" : "Done"}: ${r.processed}/${r.total} images · ${r.detections} detections · ${r.avg_ms} ms/img${r.failed ? ` · ${r.failed} failed` : ""}${ev} (${job.elapsed}s)`;
    toast(`Inference ${job.status}: ${r.detections ?? 0} detections in ${job.elapsed}s`);
    state.showPred = true;
    const predToggle = document.getElementById("layer-pred");
    if (predToggle) predToggle.checked = true;
    if (r.model_name) {
      state.activeModel = r.model_name;
      state.hiddenModels.delete(r.model_name);
    }
    if (r.mode === "eval" && r.operating_conf && state.minConfidence < r.operating_conf) {
      // all boxes down to 0.001 are stored; show the operating point by default (slider still goes lower)
      setMinConfidence(r.operating_conf);
    }
    (r.warnings || []).forEach((w) => toast(`⚠️ ${r.model_name}: ${w}`, true));
  }
  modelUi.jobId = null;
  await loadDatasetInfo();
  await loadSamples();
  const evalModal = document.getElementById("modal-eval");
  if (evalModal && evalModal.style.display === "flex") loadEvalReport();
  if (modelUi.onJobDone) {
    const cb = modelUi.onJobDone;
    modelUi.onJobDone = null;
    cb(job);
  }
}

function setMinConfidence(v) {
  state.minConfidence = v;
  const slider = document.getElementById("confidence-slider");
  if (slider) slider.value = v;
  const label = document.getElementById("confidence-val");
  if (label) label.textContent = Number(v).toFixed(2);
}

async function cancelJob() {
  if (modelUi.jobId) await api(`/api/jobs/${modelUi.jobId}/cancel`, {});
}

async function clearPredictions() {
  const n = modelUi.predModels.length;
  if (!confirm(`Remove all predictions${n > 1 ? ` of all ${n} models` : ""} (and evaluation results) from this dataset?`)) return;
  try {
    const data = await api("/api/predictions/clear", {});
    toast(`Removed ${data.removed} predictions`);
    state.filterIssue = "";
    state.cmGt = state.cmPred = "";
    state.cmp.mode = "";
    updateActiveFiltersBar();
    await loadDatasetInfo();
    await loadSamples();
  } catch (e) {
    toast(e.message, true);
  }
}

// ── Evaluation panel ────────────────────────────────────────

async function loadEvalReport() {
  try {
    const data = await api(`/api/eval/report${state.activeModel ? `?model=${encodeURIComponent(state.activeModel)}` : ""}`);
    syncEvalSettings(data.settings);
    await loadCompare();
    renderCompareTable();
    if (data.report) {
      renderEvalReport(data.report);
    } else if (state.info && state.info.inferred_count) {
      await runEval();
    } else {
      document.getElementById("eval-overall").innerHTML = `<div style="color:var(--text-muted); font-size:13px;">No predictions yet. Open <b>🤖 Run Model</b> first.</div>`;
      document.getElementById("eval-classes").innerHTML = "";
      document.getElementById("eval-confusion").innerHTML = "";
    }
  } catch (e) {
    toast(e.message, true);
  }
}

async function runEval() {
  const status = document.getElementById("eval-status");
  status.textContent = "Evaluating…";
  try {
    const data = await api("/api/eval/run", {
      iou: parseFloat(document.getElementById("eval-iou").value) || 0.5,
      conf: parseFloat(document.getElementById("eval-conf").value) || 0,
      ignore_missing: document.getElementById("eval-ignore-missing").checked,
      class_map: document.getElementById("eval-class-map").value,
    });
    syncEvalSettings(data.settings);
    const n = (data.models || []).length;
    await loadDatasetInfo();
    if (state.activeModel && data.report && data.report.model !== state.activeModel) {
      const r = await api(`/api/eval/report?model=${encodeURIComponent(state.activeModel)}`);
      if (r.report) data.report = r.report;
    }
    if (data.report) renderEvalReport(data.report);
    await loadCompare();
    renderCompareTable();
    status.textContent = data.report ? `${data.report.evaluated_samples} images evaluated${n > 1 ? ` · ${n} models` : ""}` : "Nothing to evaluate";
    await loadSamples();
  } catch (e) {
    status.textContent = "";
    toast(e.message, true);
  }
}

function syncEvalSettings(st) {
  if (!st) return;
  document.getElementById("eval-iou").value = st.iou;
  document.getElementById("eval-conf").value = st.conf;
  document.getElementById("eval-ignore-missing").checked = !!st.ignore_missing;
  document.getElementById("eval-class-map").value = Object.entries(st.class_map || {}).map(([k, v]) => `${k}=${v}`).join(", ");
}

function renderEvalWarnings(r) {
  const box = document.getElementById("eval-warnings");
  if (!box) return;
  const warns = r.warnings || [];
  const run = r.run;
  const runLine = run ? `<div class="eval-run">Weights <code title="${escapeHtml(run.path || "")}">${escapeHtml(run.path || "–")}</code>` +
    `${run.sha1 ? ` · sha1 <code>${escapeHtml(run.sha1)}</code>` : ""} · stored at conf ≥ ${run.conf}${run.eval_mode ? " (evaluation mode)" : ""}</div>` : "";
  box.innerHTML = runLine + warns.map((w) => `<div class="eval-warn">⚠️ ${escapeHtml(w)}</div>`).join("");
  box.style.display = runLine || warns.length ? "" : "none";
}

function renderEvalReport(r) {
  modelUi.report = r;
  renderEvalWarnings(r);
  const o = r.overall || {};
  const title = document.getElementById("eval-detail-title");
  if (title) {
    title.innerHTML = r.model ? `<span class="model-swatch" style="background:${modelColor(r.model)}">${modelLetter(r.model)}</span> ${escapeHtml(r.model)}` : "";
    title.style.display = r.model && multiModel() ? "" : "none";
  }
  const card = (k, v, cls = "") => `<div class="eval-card ${cls}"><div class="v">${v}</div><div class="k">${k}</div></div>`;
  const overall = document.getElementById("eval-overall");
  if (r.type === "classification") {
    overall.innerHTML = card("Accuracy", pct(o.accuracy), o.accuracy >= 0.9 ? "good" : "") +
      card("Correct", o.correct) + card("Images", o.total);
  } else {
    overall.innerHTML =
      card("mAP@50", pct(o.mAP50), o.mAP50 >= 0.9 ? "good" : "") +
      card("mAP@50:95", pct(o.mAP50_95)) +
      card("Precision", pct(o.precision)) +
      card("Recall", pct(o.recall)) +
      card("F1", pct(o.f1)) +
      card("TP", o.tp, "good") + card("FP", o.fp, o.fp ? "bad" : "") + card("FN", o.fn, o.fn ? "bad" : "") +
      card("Images", r.evaluated_samples);
  }

  const classes = r.classes || [];
  document.getElementById("eval-classes").innerHTML = classes.length ? `
    <table class="eval-table">
      <thead><tr><th>Class</th><th>GT</th><th>TP</th><th>FP</th><th>FN</th><th>P</th><th>R</th><th>F1</th><th>AP50</th><th>AP50:95</th></tr></thead>
      <tbody>${classes.map((c) => `
        <tr class="clickable" data-label="${escapeHtml(c.label)}">
          <td><span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(c.label)}"></span> ${escapeHtml(c.label)}${c.no_gt ? ` <span class="no-gt-pill" title="No ground truth of this class in the dataset: all its predictions are FP">no GT</span>` : ""}</td>
          <td>${c.support}</td><td>${c.tp}</td><td style="color:${c.fp ? "#c53030" : ""}">${c.fp}</td><td style="color:${c.fn ? "#be123c" : ""}">${c.fn}</td>
          <td>${pct(c.precision)}</td><td>${pct(c.recall)}</td><td>${pct(c.f1)}</td><td>${pct(c.ap50)}</td><td>${pct(c.ap50_95)}</td>
        </tr>`).join("")}</tbody>
    </table>` : `<div style="color:var(--text-muted); font-size:12px;">No per-class metrics for this task.</div>`;
  document.querySelectorAll("#eval-classes tr[data-label]").forEach((tr) => {
    tr.addEventListener("click", () => {
      state.searchQuery = tr.dataset.label;
      const search = document.getElementById("sample-search");
      if (search) search.value = tr.dataset.label;
      state.filterIssue = "eval_error";
      applyEvalFilter();
    });
  });

  const cm = r.confusion || { labels: [], matrix: [] };
  const max = Math.max(1, ...cm.matrix.flat());
  const short = (s) => (s.length > 18 ? `${s.slice(0, 17)}…` : s);
  document.getElementById("eval-confusion").innerHTML = cm.labels.length ? `
    <table class="cm-table">
      <thead><tr><th></th>${cm.labels.map((l) => `<th class="col" title="${escapeHtml(l)}">${escapeHtml(short(l))}</th>`).join("")}</tr></thead>
      <tbody>${cm.matrix.map((row, i) => `
        <tr><th style="text-align:right" title="${escapeHtml(cm.labels[i])}">${escapeHtml(short(cm.labels[i]))}</th>${row.map((v, j) => {
          const diag = i === j;
          const alpha = v ? 0.15 + 0.75 * (v / max) : 0;
          const color = diag ? `rgba(16,185,129,${alpha})` : `rgba(239,68,68,${alpha})`;
          return `<td class="${v ? "" : "zero"}" style="background:${color}" data-gt="${i}" data-pred="${j}" title="GT ${escapeHtml(cm.labels[i])} → Pred ${escapeHtml(cm.labels[j])}: ${v}">${v || "·"}</td>`;
        }).join("")}</tr>`).join("")}</tbody>
    </table>` : "";
  document.querySelectorAll("#eval-confusion td[data-gt]:not(.zero)").forEach((td) => {
    td.addEventListener("click", () => {
      state.cmGt = cm.labels[+td.dataset.gt];
      state.cmPred = cm.labels[+td.dataset.pred];
      state.filterIssue = "";
      applyEvalFilter();
    });
  });
}

function applyEvalFilter() {
  state.page = 1;
  closeModal("eval");
  updateActiveFiltersBar();
  renderEvalFilters(state.info);
  loadSamples();
}

function filterEval(issue) {
  state.filterIssue = issue;
  state.cmGt = state.cmPred = "";
  applyEvalFilter();
}

async function tagEvalErrors() {
  const tag = prompt("Tag all images with FP/FN errors as:", "review");
  if (!tag) return;
  try {
    const data = await api("/api/samples/tag_filtered", { tag, filters: { filter_issue: "eval_error", model: state.activeModel } });
    toast(`Tagged ${data.affected} images as "${tag}" — filter by the tag, then Convert & Export to relabel them.`);
    await loadDatasetInfo();
  } catch (e) {
    toast(e.message, true);
  }
}

// ── Quick check (drag & drop) ───────────────────────────────

async function quickCheckFiles(fileList) {
  const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/") || /\.(bmp|tiff?)$/i.test(f.name));
  if (!files.length) return;
  const modelPath = document.getElementById("model-path").value.trim() ||
    (modelUi.system && modelUi.system.model && modelUi.system.model.path) || "";
  const ids = [];
  const fresh = !state.info || state.info.format !== "quick";
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    try {
      const res = await fetch(`/api/quick/upload?filename=${encodeURIComponent(f.name)}${fresh && i === 0 ? "&new=1" : ""}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: f,
      });
      const data = await res.json();
      if (data.status !== "ok") throw new Error(data.message);
      ids.push(data.sample_id);
    } catch (e) {
      toast(`Upload failed for ${f.name}: ${e.message}`, true);
    }
  }
  state.filterIssue = "";
  state.cmGt = state.cmPred = "";
  state.similarTo = "";
  state.page = 1;
  updateActiveFiltersBar();
  await loadDatasetInfo();
  await loadSamples();
  if (!ids.length) return;
  if (!modelPath) {
    toast(`Added ${ids.length} images. Pick a model in 🤖 Run Model to check them.`);
    openModal("model");
    return;
  }
  toast(`Added ${ids.length} images — running ${modelPath.split(/[\\/]/).pop()}…`);
  await runModel({ path: modelPath, scope: "selected", sample_ids: ids, auto_eval: false, mode: "display", alias: "" });
}

(function initDropZone() {
  const overlay = document.getElementById("drop-overlay");
  let depth = 0;
  const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes("Files");
  window.addEventListener("dragenter", (e) => {
    if (!hasFiles(e)) return;
    depth++;
    overlay.classList.add("show");
  });
  window.addEventListener("dragleave", () => {
    depth = Math.max(0, depth - 1);
    if (!depth) overlay.classList.remove("show");
  });
  window.addEventListener("dragover", (e) => {
    if (hasFiles(e)) e.preventDefault();
  });
  window.addEventListener("drop", (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault();
    depth = 0;
    overlay.classList.remove("show");
    quickCheckFiles(e.dataTransfer.files);
  });
})();

// ── Workspace & misc ────────────────────────────────────────

async function saveWorkspace() {
  const path = prompt("Save workspace (.guava.json) to — leave empty for ~/.guava/workspaces:", "");
  if (path === null) return;
  try {
    const data = await api("/api/workspace/save", { path });
    toast(`Saved: ${data.path} — reopen it via Load Dataset.`);
  } catch (e) {
    toast(e.message, true);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const reset = document.getElementById("reset-filters-btn");
  if (reset) {
    // capture phase: clear our filters before app.js reloads the grid
    reset.addEventListener("click", () => {
      state.cmGt = state.cmPred = "";
      state.filterIssue = "";
      state.cmp.mode = "";
      state.hiddenModels.clear();
      updateActiveFiltersBar();
      renderModelLayers();
    }, true);
  }
  // remember last model across reloads
  api("/api/system").then((sys) => {
    modelUi.system = sys;
    if (sys.model && sys.model.path) document.getElementById("model-path").value = sys.model.path;
  }).catch(() => {});
  api("/api/jobs").then((d) => {
    const running = (d.jobs || []).find((j) => j.status === "running" || j.status === "queued");
    if (running) {
      modelUi.jobId = running.id;
      pollJob();
    }
  }).catch(() => {});
});

document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea, select")) return;
  if (e.key === "m" && !e.ctrlKey) openModal("model");
  if (e.key === "e" && !e.ctrlKey) openModal("eval");
});
// ── Multi-model comparison ──────────────────────────────────
// Each model run is its own prediction layer (color + dash per model). One model is
// "active": its TP/FP/FN drive the sidebar filters, GT box status and card badges.

const MODEL_COLORS = ["#f59e0b", "#3b82f6", "#d946ef", "#06b6d4", "#84cc16", "#f97316", "#a855f7", "#14b8a6"];
const MODEL_DASH = [[4, 4], [10, 4], [2, 3], [12, 3, 2, 3]];
state.activeModel = "";
state.hiddenModels = new Set();
state.cmp = { mode: "", a: "", b: "" };
modelUi.predModels = [];
modelUi.compare = null;

function modelIndex(name) {
  const i = modelUi.predModels.findIndex((m) => m.name === name);
  return i < 0 ? 0 : i;
}
const modelLetter = (name) => String.fromCharCode(65 + (modelIndex(name) % 26));
const modelColor = (name) => MODEL_COLORS[modelIndex(name) % MODEL_COLORS.length];
const multiModel = () => modelUi.predModels.length > 1;

function predVisible(det) {
  return !det.model || !state.hiddenModels.has(det.model);
}

/** Style of a prediction box: per-model color/dash when several models are loaded. */
function predStyle(det) {
  if (!multiModel() || !det.model) return null;
  const i = modelIndex(det.model);
  return { color: MODEL_COLORS[i % MODEL_COLORS.length], dash: MODEL_DASH[i % MODEL_DASH.length], tag: modelLetter(det.model) };
}

function syncModels(info) {
  const models = (info && info.pred_models) || [];
  modelUi.predModels = models;
  const names = models.map((m) => m.name);
  if (!names.includes(state.activeModel)) {
    state.activeModel = (info && names.includes(info.active_model)) ? info.active_model : (names[names.length - 1] || "");
  }
  [...state.hiddenModels].forEach((n) => { if (!names.includes(n)) state.hiddenModels.delete(n); });
  if (!names.includes(state.cmp.a)) state.cmp.a = names[0] || "";
  if (!names.includes(state.cmp.b) || state.cmp.b === state.cmp.a) state.cmp.b = names.find((n) => n !== state.cmp.a) || "";
  if (state.cmp.mode && !(state.cmp.a && state.cmp.b)) state.cmp.mode = "";
}

function renderModelLayers() {
  const box = document.getElementById("model-layers");
  if (!box) return;
  const models = modelUi.predModels;
  if (!models.length) {
    box.innerHTML = "";
    return;
  }
  box.innerHTML = models.map((m) => `
    <div class="model-layer ${state.hiddenModels.has(m.name) ? "off" : ""} ${m.name === state.activeModel ? "active" : ""}" data-model="${escapeHtml(m.name)}">
      <label class="checkbox-container" title="Show / hide this model's boxes">
        <input type="checkbox" ${state.hiddenModels.has(m.name) ? "" : "checked"}>
        <span class="model-swatch" style="background:${modelColor(m.name)}">${modelLetter(m.name)}</span>
        <span class="layer-label model-layer-name" title="${escapeHtml(m.name)}">${escapeHtml(m.name)}</span>
      </label>
      <span class="layer-badge" title="${m.inferred} images inferred">${m.predictions}</span>
      <button class="icon-btn model-layer-btn" data-act="active" title="Use for filters & GT status">${m.name === state.activeModel ? "★" : "☆"}</button>
      <button class="icon-btn model-layer-btn" data-act="clear" title="Remove this model's predictions">🗑️</button>
    </div>`).join("");
  box.querySelectorAll(".model-layer").forEach((row) => {
    const name = row.dataset.model;
    row.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) state.hiddenModels.delete(name); else state.hiddenModels.add(name);
      renderModelLayers();
      updatePredCount();
      renderGrid();
      if (state.activeSample) { renderLightboxAnnotations(); drawLightbox(); }
    });
    row.querySelector('[data-act="active"]').addEventListener("click", () => setActiveModel(name));
    row.querySelector('[data-act="clear"]').addEventListener("click", () => clearModelPredictions(name));
  });
}

function updatePredCount() {
  let n = 0;
  state.samples.forEach((s) => { n += (s.predictions || []).filter(predVisible).length; });
  const el = document.getElementById("count-pred");
  if (el) el.textContent = n;
}

async function setActiveModel(name, reload = true) {
  state.activeModel = name;
  state.hiddenModels.delete(name);
  renderModelLayers();
  renderEvalFilters(state.info);
  try {
    const data = await api(`/api/eval/report?model=${encodeURIComponent(name)}`);
    if (data.report && document.getElementById("modal-eval").style.display === "flex") renderEvalReport(data.report);
  } catch (e) { /* report is optional */ }
  if (reload) {
    state.page = 1;
    loadSamples();
  }
}

async function clearModelPredictions(name) {
  if (!confirm(`Remove predictions and eval results of "${name}"? Other models are kept.`)) return;
  try {
    const data = await api("/api/predictions/clear", { model: name });
    toast(`Removed ${data.removed} predictions of ${name}`);
    if (state.cmp.a === name || state.cmp.b === name) state.cmp.mode = "";
    updateActiveFiltersBar();
    await loadDatasetInfo();
    await loadSamples();
    if (document.getElementById("modal-eval").style.display === "flex") loadEvalReport();
  } catch (e) {
    toast(e.message, true);
  }
}

const CMP_LABELS = {
  a_wrong_b_right: (a, b) => `${a} wrong · ${b} right`,
  b_wrong_a_right: (a, b) => `${b} wrong · ${a} right`,
  both_wrong: () => "Both wrong",
  both_right: () => "Both right",
};

function modelOptions(selected, exclude = "") {
  return modelUi.predModels.filter((m) => m.name !== exclude).map((m) =>
    `<option value="${escapeHtml(m.name)}" ${m.name === selected ? "selected" : ""}>${modelLetter(m.name)} · ${escapeHtml(m.name)}</option>`).join("");
}

async function loadCompare() {
  if (!multiModel() || !state.cmp.a || !state.cmp.b) {
    modelUi.compare = null;
    return null;
  }
  try {
    modelUi.compare = await api(`/api/eval/compare?a=${encodeURIComponent(state.cmp.a)}&b=${encodeURIComponent(state.cmp.b)}`);
  } catch (e) {
    modelUi.compare = null;
  }
  return modelUi.compare;
}

function compareChipsHtml(counts, cls = "filter-chip") {
  const a = modelLetter(state.cmp.a), b = modelLetter(state.cmp.b);
  return ["a_wrong_b_right", "b_wrong_a_right", "both_wrong"].map((k) => `
    <div class="${cls} ${state.cmp.mode === k ? "active" : ""}" data-cmp="${k}">
      <span class="chip-label-left"><span>${k === "both_wrong" ? "⛔" : "⚖️"}</span><span>${CMP_LABELS[k](a, b)}</span></span>
      <span class="chip-count">${counts ? counts[k] : "–"}</span>
    </div>`).join("");
}

function bindCompareControls(root, onChange) {
  const selA = root.querySelector(".cmp-a"), selB = root.querySelector(".cmp-b");
  if (selA) selA.addEventListener("change", () => {
    state.cmp.a = selA.value;
    if (state.cmp.b === state.cmp.a) state.cmp.b = modelUi.predModels.map((m) => m.name).find((n) => n !== state.cmp.a) || "";
    onChange(true);
  });
  if (selB) selB.addEventListener("change", () => { state.cmp.b = selB.value; onChange(true); });
  root.querySelectorAll("[data-cmp]").forEach((el) => el.addEventListener("click", () => {
    setCompareFilter(state.cmp.mode === el.dataset.cmp ? "" : el.dataset.cmp);
  }));
}

function setCompareFilter(mode) {
  state.cmp.mode = mode;
  state.filterIssue = "";
  state.cmGt = state.cmPred = "";
  state.page = 1;
  // show exactly the two compared layers
  if (mode) {
    modelUi.predModels.forEach((m) => {
      if (m.name === state.cmp.a || m.name === state.cmp.b) state.hiddenModels.delete(m.name); else state.hiddenModels.add(m.name);
    });
  }
  closeModal("eval");
  updateActiveFiltersBar();
  renderEvalFilters(state.info);
  loadSamples();
}

function removeCompareFilter() {
  state.cmp.mode = "";
  state.page = 1;
  updateActiveFiltersBar();
  renderEvalFilters(state.info);
  loadSamples();
}

function compareChipLabel() {
  return CMP_LABELS[state.cmp.mode] ? CMP_LABELS[state.cmp.mode](state.cmp.a, state.cmp.b) : "";
}

async function renderCompareSidebar() {
  const section = document.getElementById("compare-filter-section");
  if (!section) return;
  if (!multiModel()) {
    section.style.display = "none";
    return;
  }
  section.style.display = "";
  const box = document.getElementById("compare-filters-container");
  const draw = () => {
    box.innerHTML = `
      <div class="cmp-selects">
        <select class="guava-input cmp-a" title="Model A">${modelOptions(state.cmp.a)}</select>
        <span>vs</span>
        <select class="guava-input cmp-b" title="Model B">${modelOptions(state.cmp.b, state.cmp.a)}</select>
      </div>
      ${compareChipsHtml(modelUi.compare && modelUi.compare.counts)}`;
    bindCompareControls(box, async () => {
      await loadCompare();
      draw();
      if (state.cmp.mode) { state.page = 1; updateActiveFiltersBar(); loadSamples(); }
    });
  };
  draw();
  await loadCompare();
  draw();
}

/** Comparison table at the top of the eval modal: one row per model. */
function renderCompareTable() {
  const box = document.getElementById("eval-compare");
  if (!box) return;
  const cmp = modelUi.compare;
  const models = (cmp && cmp.models) || modelUi.predModels;
  if (!multiModel()) {
    box.innerHTML = "";
    box.style.display = "none";
    qcAfterCompare();
    return;
  }
  box.style.display = "";
  const cols = [["mAP50", "mAP@50"], ["mAP50_95", "mAP@50:95"], ["precision", "P"], ["recall", "R"], ["f1", "F1"], ["accuracy", "Acc"]];
  const shown = cols.filter(([k]) => models.some((m) => m.eval && m.eval[k] !== undefined && m.eval[k] !== null));
  const best = {};
  shown.forEach(([k]) => { best[k] = Math.max(...models.map((m) => (m.eval && m.eval[k]) ?? -1)); });
  const minFp = Math.min(...models.map((m) => (m.eval && m.eval.fp) ?? Infinity));
  const minFn = Math.min(...models.map((m) => (m.eval && m.eval.fn) ?? Infinity));
  box.innerHTML = `
    <h4 class="eval-h">Model comparison <span style="font-weight:400; color:var(--text-muted);">(click a row to see its details below)</span></h4>
    <table class="eval-table cmp-table">
      <thead><tr><th>Model</th><th>Images</th>${shown.map(([, l]) => `<th>${l}</th>`).join("")}<th>TP</th><th>FP</th><th>FN</th></tr></thead>
      <tbody>${models.map((m) => {
        const e = m.eval || {};
        return `<tr class="clickable ${m.name === state.activeModel ? "active-row" : ""}" data-model="${escapeHtml(m.name)}">
          <td><span class="model-swatch" style="background:${modelColor(m.name)}">${modelLetter(m.name)}</span> ${escapeHtml(m.name)}${
            (m.warnings || []).length ? ` <span class="cmp-warn" title="${escapeHtml(m.warnings.join("\n\n"))}">⚠️</span>` : ""}${
            m.run ? `<div class="cmp-run" title="${escapeHtml(m.run.path || "")}">${m.run.sha1 ? `${escapeHtml(m.run.sha1)} · ` : ""}${m.run.eval_mode ? "eval mode" : `conf ≥ ${m.run.conf}`}</div>` : ""}</td>
          <td>${m.inferred}</td>
          ${shown.map(([k]) => `<td class="${e[k] !== undefined && e[k] === best[k] ? "best" : ""}">${m.eval ? pct(e[k]) : "–"}</td>`).join("")}
          <td>${e.tp ?? "–"}</td><td class="${e.fp === minFp ? "best" : ""}">${e.fp ?? "–"}</td><td class="${e.fn === minFn ? "best" : ""}">${e.fn ?? "–"}</td>
        </tr>`;
      }).join("")}</tbody>
    </table>
    <div class="cmp-disagree">
      <div class="cmp-selects">
        <span>Where do they disagree?</span>
        <select class="guava-input cmp-a">${modelOptions(state.cmp.a)}</select>
        <span>vs</span>
        <select class="guava-input cmp-b">${modelOptions(state.cmp.b, state.cmp.a)}</select>
      </div>
      <div class="cmp-buttons">${compareChipsHtml(cmp && cmp.counts, "secondary-btn cmp-btn")}</div>
    </div>`;
  box.querySelectorAll("tr[data-model]").forEach((tr) => tr.addEventListener("click", () => setActiveModel(tr.dataset.model, false).then(() => {
    renderCompareTable();
    loadSamples();
  })));
  bindCompareControls(box, async () => {
    await loadCompare();
    renderCompareTable();
    renderCompareSidebar();
  });
  qcAfterCompare();  // qc.js: escape / overkill + CI columns, QC panel
}