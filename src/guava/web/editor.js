/**
 * 🍈 Guava Studio — lightbox viewer and ground-truth label editor.
 *
 * - Overlay view: label + predictions on one image. Split view: the label and each
 *   shown model side by side, every model panel colored TP / FP / missed against the label.
 * - Edit mode: draw, move, resize, relabel and delete ground-truth boxes, accept a
 *   prediction as label, undo. Every change is sent to the server right away (the
 *   image's TP/FP/FN are refreshed); 💾 Save labels writes them to the label files.
 * - The grid's "Label ⟷ Prediction" view draws the same panels on each card.
 * Loaded after app.js / model.js / qc.js; reuses their globals.
 */

state.gridView = "overlay";

const lb = {
  view: "overlay",   // "overlay" | "split"
  edit: false,
  zoom: 1, panX: 0, panY: 0,
  img: null, imgSrc: "",
  gt: [],            // editable copy of the label boxes: {id, label, bbox: [x, y, w, h] normalized}
  sel: null,         // selected label box id
  hover: null,       // annotation id hovered in the sidebar
  drag: null,
  space: false,
  undo: [],
  cls: "",           // class for new boxes
  queue: Promise.resolve(),
};

const LB_COLORS = { tp: "#16a34a", fp: "#dc2626", fn: "#e11d48", sel: "#2563eb" };
const dpr = () => window.devicePixelRatio || 1;

function lightboxOpen() {
  const m = document.getElementById("lightbox-modal");
  return !!m && m.style.display === "flex";
}

// ── geometry helpers ───────────────────────────────────────

/** Normalized [x, y, w, h] of a serialized annotation. */
function normBox(det, sample) {
  let [x, y, w, h] = det.bounding_box || [0, 0, 0, 0];
  const isNorm = det.is_normalized !== undefined ? det.is_normalized : (x <= 1 && y <= 1 && w <= 1 && h <= 1);
  if (!isNorm) {
    const W = sample.width || 640, H = sample.height || 480;
    x /= W; y /= H; w /= W; h /= H;
  }
  return [x, y, w, h];
}

function iou(a, b) {
  const x1 = Math.max(a[0], b[0]), y1 = Math.max(a[1], b[1]);
  const x2 = Math.min(a[0] + a[2], b[0] + b[2]), y2 = Math.min(a[1] + a[3], b[1] + b[3]);
  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const uni = a[2] * a[3] + b[2] * b[3] - inter;
  return uni > 0 ? inter / uni : 0;
}

/** TP / FN status of a label box for `model` (null = not evaluated). */
function gtStatus(det, model) {
  if (det.eval_by && det.eval_by[model]) return det.eval_by[model];
  if (model === state.activeModel && det.eval) return det.eval;
  return null;
}

function shownPreds(sample, model) {
  return (sample.predictions || []).filter((p) =>
    (model === undefined || p.model === model) && predVisible(p) &&
    (p.confidence === undefined || p.confidence >= state.minConfidence));
}

/** Layers shown side by side: the label, then each visible model (at most 3). */
function splitPanels() {
  const panels = [{ kind: "gt", title: "Label (ground truth)" }];
  (modelUi.predModels || []).filter((m) => !state.hiddenModels.has(m.name)).slice(0, 3).forEach((m) => {
    panels.push({ kind: "pred", model: m.name, title: `${multiModel() ? `${modelLetter(m.name)} · ` : ""}${m.name}` });
  });
  return panels;
}

// ── drawing ────────────────────────────────────────────────

function drawTag(ctx, x, y, text, color, u, below = false) {
  ctx.font = `600 ${Math.round(12 * u)}px system-ui, sans-serif`;
  const w = ctx.measureText(text).width + 8 * u, h = 17 * u;
  const ty = below ? y : Math.max(0, y - h);
  ctx.fillStyle = color;
  ctx.fillRect(x, ty, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillText(text, x + 4 * u, ty + h - 4.5 * u);
}

function strokeBox(ctx, r, color, u, { dash = null, width = 2, fill = 0.1 } = {}) {
  ctx.lineWidth = width * u;
  ctx.strokeStyle = color;
  ctx.setLineDash(dash ? dash.map((v) => v * u) : []);
  ctx.strokeRect(r.x, r.y, r.w, r.h);
  ctx.setLineDash([]);
  if (fill) {
    ctx.globalAlpha = fill;
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.globalAlpha = 1;
  }
}

const toRect = (b, T) => ({ x: T.ox + b[0] * T.w, y: T.oy + b[1] * T.h, w: b[2] * T.w, h: b[3] * T.h });

/**
 * Draw one layer of `sample` into the image rectangle T = {ox, oy, w, h}.
 * kind "gt": the label boxes. kind "pred": `model`'s predictions colored against the
 * label (TP green, FP red, wrong class) plus the label boxes the model missed.
 */
function drawLayer(ctx, sample, panel, T, u) {
  const labels = state.showLabels;
  const pass = (lab) => state.activeCategories.size === 0 || state.activeCategories.has(lab);
  if (panel.kind === "gt") {
    (sample.ground_truth || []).forEach((g) => {
      if (!pass(g.label)) return;
      const r = toRect(normBox(g, sample), T);
      const c = getCategoryColor(g.label);
      strokeBox(ctx, r, c, u, { width: lb.hover === g.id ? 4 : 2.2 });
      if (labels) drawTag(ctx, r.x, r.y, g.label, c, u);
    });
    return;
  }
  const model = panel.model;
  const gts = (sample.ground_truth || []).map((g) => ({ g, b: normBox(g, sample) }));
  // label boxes this model missed
  gts.forEach(({ g, b }) => {
    if (!pass(g.label) || gtStatus(g, model) !== "fn") return;
    const r = toRect(b, T);
    strokeBox(ctx, r, LB_COLORS.fn, u, { dash: [6, 4], width: 2.4, fill: 0.08 });
    if (labels) drawTag(ctx, r.x, r.y + r.h, `MISSED ${g.label}`, LB_COLORS.fn, u, true);
  });
  shownPreds(sample, model).forEach((p) => {
    if (!pass(p.label)) return;
    const b = normBox(p, sample);
    const r = toRect(b, T);
    let color = p.eval === "tp" ? LB_COLORS.tp : p.eval === "fp" ? LB_COLORS.fp : modelColor(p.model);
    let text = `${p.label} ${Math.round((p.confidence ?? 1) * 100)}%`;
    if (p.eval === "fp") {
      const over = gts.filter(({ g }) => g.label !== p.label).find(({ b: gb }) => iou(b, gb) >= 0.5);
      text += over ? ` ≠ ${over.g.label}` : " FP";
    }
    strokeBox(ctx, r, color, u, { width: lb.hover === p.id ? 4 : 2.2 });
    if (labels) drawTag(ctx, r.x, r.y, text, color, u);
  });
}

/** Panel title strip. */
function drawPanelTitle(ctx, x, y, w, text, sub, u) {
  ctx.fillStyle = "rgba(20, 35, 12, 0.72)";
  ctx.fillRect(x, y, w, 20 * u);
  ctx.font = `700 ${Math.round(12 * u)}px system-ui, sans-serif`;
  ctx.fillStyle = "#fff";
  ctx.fillText(text, x + 6 * u, y + 14 * u);
  if (sub) {
    ctx.font = `600 ${Math.round(11 * u)}px system-ui, sans-serif`;
    const tw = ctx.measureText(sub).width;
    ctx.fillStyle = "#d9f99d";
    ctx.fillText(sub, x + w - tw - 6 * u, y + 14 * u);
  }
}

function panelSummary(sample, panel) {
  if (panel.kind === "gt") return `${(sample.ground_truth || []).length} boxes`;
  const preds = shownPreds(sample, panel.model);
  const tp = preds.filter((p) => p.eval === "tp").length;
  const fp = preds.filter((p) => p.eval === "fp").length;
  const fn = (sample.ground_truth || []).filter((g) => gtStatus(g, panel.model) === "fn").length;
  if (!preds.some((p) => p.eval) && !fn) return `${preds.length} boxes`;
  return fp || fn ? `✓${tp}  FP ${fp}  missed ${fn}` : `✓ all ${tp} correct`;
}

/** Grid card in split view: one 4:3 cell per panel. Called by drawSampleCanvas (app.js). */
function drawSplitCard(sample, canvas, img) {
  const panels = splitPanels();
  const n = panels.length;
  const iw = img.naturalWidth || 640, ih = img.naturalHeight || 480;
  // wide images (line scan, panoramas): stack the panels vertically so each stays large
  const vertical = iw / ih > 1.8;
  const cw = vertical ? iw : Math.max(iw, (ih * 4) / 3);
  const ch = vertical ? ih : (cw * 3) / 4;
  const strip = Math.round((vertical ? cw / 2.2 : cw) / 300 * 20);
  canvas.width = Math.round(vertical ? cw : cw * n);
  canvas.height = Math.round(vertical ? (ch + strip) * n : ch + strip);
  if (canvas.parentElement) canvas.parentElement.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
  const ctx = canvas.getContext("2d");
  const u = strip / 20;
  panels.forEach((panel, i) => {
    const x0 = vertical ? 0 : i * cw, y0 = vertical ? i * (ch + strip) : 0;
    const s = Math.min(cw / iw, ch / ih);
    const T = { ox: x0 + (cw - iw * s) / 2, oy: y0 + (ch - ih * s) / 2, w: iw * s, h: ih * s };
    ctx.fillStyle = "#dfe9d3";
    ctx.fillRect(x0, y0, cw, ch + strip);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x0, y0, cw, ch);
    ctx.clip();
    ctx.drawImage(img, T.ox, T.oy, T.w, T.h);
    drawLayer(ctx, sample, panel, T, u);
    ctx.restore();
    // title under the image, so the card's checkbox / subset badge never cover it
    drawPanelTitle(ctx, x0, y0 + ch, cw, panel.kind === "gt" ? "LABEL" : panel.title, panelSummary(sample, panel), u);
    if (i && !vertical) {
      ctx.fillStyle = "#f7fbf2";
      ctx.fillRect(x0 - u, 0, 2 * u, ch + strip);
    }
  });
}

function setGridView(view) {
  state.gridView = view;
  document.querySelectorAll("#grid-view-seg button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  document.getElementById("samples-grid").classList.toggle("grid-split", view === "split");
  try { localStorage.setItem("guava.gridView", view); } catch (e) { /* optional */ }
  renderGrid();
}

// ── lightbox layout & rendering ────────────────────────────

function lbCanvas() {
  return document.getElementById("lightbox-canvas");
}

/** Panels with their screen rectangles (canvas pixels) and image rectangles T. */
function lbLayout() {
  const canvas = lbCanvas();
  const panels = lb.view === "split" ? splitPanels() : [{ kind: "overlay" }];
  const n = panels.length;
  const W = canvas.width, H = canvas.height;
  const iw = lb.img ? lb.img.naturalWidth : (state.activeSample.width || 640);
  const ih = lb.img ? lb.img.naturalHeight : (state.activeSample.height || 480);
  const gap = n > 1 ? 6 * dpr() : 0;
  const pw = (W - gap * (n - 1)) / n;
  const top = n > 1 ? 24 * dpr() : 0;
  return panels.map((p, i) => {
    const rect = { x: i * (pw + gap), y: 0, w: pw, h: H };
    const fit = Math.min(pw / iw, (H - top) / ih) * 0.97;
    const s = fit * lb.zoom;
    const T = {
      ox: rect.x + (pw - iw * s) / 2 + lb.panX * dpr(),
      oy: top + (H - top - ih * s) / 2 + lb.panY * dpr(),
      w: iw * s, h: ih * s, s, fit,
    };
    return { ...p, rect, T, top };
  });
}

function sizeLbCanvas() {
  const canvas = lbCanvas();
  const wrap = document.getElementById("canvas-wrapper");
  const w = Math.max(1, Math.round(wrap.clientWidth * dpr()));
  const h = Math.max(1, Math.round(wrap.clientHeight * dpr()));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
}

function drawLightbox() {
  const sample = state.activeSample;
  if (!sample || !lightboxOpen()) return;
  const src = sample.media_url || `/api/media/${encodeURIComponent(sample.id)}`;
  if (lb.imgSrc !== src) {
    lb.imgSrc = src;
    lb.img = null;
    const img = new Image();
    img.onload = () => {
      if (lb.imgSrc !== src) return;
      lb.img = img;
      drawLightbox();
    };
    img.src = src;
  }
  sizeLbCanvas();
  const canvas = lbCanvas();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!lb.img) {
    ctx.fillStyle = "#5b6b4e";
    ctx.font = `${14 * dpr()}px system-ui`;
    ctx.fillText("Loading image…", 20 * dpr(), 30 * dpr());
    return;
  }
  const u = dpr();
  lbLayout().forEach((p) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(p.rect.x, p.rect.y, p.rect.w, p.rect.h);
    ctx.clip();
    ctx.drawImage(lb.img, p.T.ox, p.T.oy, p.T.w, p.T.h);
    if (p.kind === "overlay") {
      drawOverlay(ctx, sample, p.T, u);
    } else {
      drawLayer(ctx, sample, p, p.T, u * 1.1);
    }
    ctx.restore();
    if (p.kind !== "overlay") {
      drawPanelTitle(ctx, p.rect.x, 0, p.rect.w, p.kind === "gt" ? "LABEL (ground truth)" : p.title, panelSummary(sample, p), u * 1.15);
    }
  });
  if (lb.drag && lb.drag.type === "draw" && lb.drag.cur) {
    const T = lbLayout()[0].T;
    const r = toRect(rectFrom(lb.drag.start, lb.drag.cur), T);
    strokeBox(ctx, r, getCategoryColor(lb.cls), u, { dash: [5, 3], width: 2, fill: 0.12 });
    drawTag(ctx, r.x, r.y, lb.cls, getCategoryColor(lb.cls), u);
  }
  updateLbHint();
}

/** Overlay view: labels and predictions together (edit mode: editable labels + faint predictions). */
function drawOverlay(ctx, sample, T, u) {
  ctx.save();
  ctx.translate(T.ox, T.oy);
  if (!lb.edit) {
    if (state.showGt && sample.ground_truth) drawDetections(ctx, sample.ground_truth, T.w, T.h, false);
    if (state.showPred && sample.predictions) drawDetections(ctx, sample.predictions, T.w, T.h, true);
    ctx.restore();
    if (lb.hover) {
      const det = [...(sample.ground_truth || []), ...(sample.predictions || [])].find((d) => d.id === lb.hover);
      if (det) strokeBox(ctx, toRect(normBox(det, sample), T), LB_COLORS.sel, u, { width: 3.5, fill: 0.15 });
    }
    return;
  }
  if (state.showPred && sample.predictions) {
    // predictions as faint reference outlines, without their tags
    const labels = state.showLabels;
    state.showLabels = false;
    ctx.globalAlpha = 0.4;
    drawDetections(ctx, sample.predictions, T.w, T.h, true);
    ctx.globalAlpha = 1;
    state.showLabels = labels;
  }
  ctx.restore();
  lb.gt.forEach((g) => {
    const r = toRect(g.bbox, T);
    const c = getCategoryColor(g.label);
    const selected = g.id === lb.sel;
    strokeBox(ctx, r, c, u, { width: selected || g.id === lb.hover ? 3.5 : 2.2, fill: selected ? 0.18 : 0.06 });
    drawTag(ctx, r.x, r.y, g.label, c, u);
    if (selected) {
      handlePoints(r).forEach(([hx, hy]) => {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = LB_COLORS.sel;
        ctx.lineWidth = 1.5 * u;
        ctx.fillRect(hx - 4 * u, hy - 4 * u, 8 * u, 8 * u);
        ctx.strokeRect(hx - 4 * u, hy - 4 * u, 8 * u, 8 * u);
      });
    }
  });
}

const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
function handlePoints(r) {
  const cx = r.x + r.w / 2, cy = r.y + r.h / 2, x2 = r.x + r.w, y2 = r.y + r.h;
  return [[r.x, r.y], [cx, r.y], [x2, r.y], [x2, cy], [x2, y2], [cx, y2], [r.x, y2], [r.x, cy]];
}

function updateLbHint() {
  const el = document.getElementById("lb-hint");
  if (!el) return;
  if (lb.edit) {
    el.innerHTML = `<b>Editing labels</b> · drag on empty area = new <b style="color:${getCategoryColor(lb.cls)}">${escapeHtml(lb.cls || "?")}</b> box · click a box to select · drag to move · corners to resize · <kbd>1</kbd>–<kbd>9</kbd> class · <kbd>Del</kbd> delete · <kbd>Ctrl+Z</kbd> undo · <kbd>Space</kbd>+drag pan`;
  } else if (lb.view === "split") {
    el.innerHTML = `Each model panel: <b style="color:${LB_COLORS.tp}">green = correct</b> · <b style="color:${LB_COLORS.fp}">red = false positive</b> (≠ wrong class) · <b style="color:${LB_COLORS.fn}">dashed = missed label</b> · wheel = zoom, drag = pan`;
  } else {
    el.innerHTML = `Solid = label · dashed = prediction · wheel = zoom · drag = pan · <kbd>S</kbd> side by side · <kbd>E</kbd> edit labels`;
  }
}

// ── open / close / navigate ────────────────────────────────

function openLightbox(sample) {
  state.activeSample = sample;
  lb.zoom = 1; lb.panX = 0; lb.panY = 0;
  lb.sel = null; lb.hover = null; lb.drag = null; lb.undo = [];
  loadLbGt();
  if (!lb.cls) lb.cls = (state.info && state.info.classes && state.info.classes[0]) || "";
  document.getElementById("lb-sample-id").textContent = sample.filename || sample.id;
  document.getElementById("lb-sample-dim").textContent = `${sample.width}x${sample.height}`;
  document.getElementById("lb-sample-subset").textContent = sample.subset || "default";
  document.getElementById("lightbox-modal").style.display = "flex";
  renderLightboxAnnotations();
  drawLightbox();
}

function closeLightbox() {
  document.getElementById("lightbox-modal").style.display = "none";
  state.activeSample = null;
  lb.drag = null;
}

function navigateLightbox(direction) {
  if (!state.activeSample) return;
  const i = state.samples.findIndex((s) => s.id === state.activeSample.id);
  const j = i + direction;
  if (i >= 0 && j >= 0 && j < state.samples.length) openLightbox(state.samples[j]);
  else if (i >= 0 && j >= state.samples.length && state.page * state.limit < state.totalSamples) {
    // next page
    state.page += 1;
    loadSamples().then(() => state.samples.length && openLightbox(state.samples[0]));
  }
}

function zoomCanvas(factor, at = null) {
  const old = lb.zoom;
  lb.zoom = Math.max(0.5, Math.min(20, lb.zoom * factor));
  if (at && lb.img) {
    // keep the image point under the cursor fixed
    const p = lbLayout()[at.panel];
    const k = lb.zoom / old;
    const cx = p.rect.x + p.rect.w / 2, cy = p.top + (p.rect.h - p.top) / 2;
    lb.panX = ((at.x - cx) - k * (at.x - cx - lb.panX * dpr())) / dpr();
    lb.panY = ((at.y - cy) - k * (at.y - cy - lb.panY * dpr())) / dpr();
  }
  drawLightbox();
}

function resetZoom() {
  lb.zoom = 1; lb.panX = 0; lb.panY = 0;
  drawLightbox();
}

function setLbView(view) {
  lb.view = view;
  if (view === "split" && lb.edit) lb.edit = false;
  document.querySelectorAll("#lb-view-seg button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  document.getElementById("lb-edit-btn").classList.toggle("on", lb.edit);
  try { localStorage.setItem("guava.lbView", view); } catch (e) { /* optional */ }
  renderLightboxAnnotations();
  drawLightbox();
}

function toggleLbEdit(on = !lb.edit) {
  lb.edit = on;
  if (on && lb.view !== "overlay") setLbView("overlay");
  if (!on) lb.sel = null;
  document.getElementById("lb-edit-btn").classList.toggle("on", lb.edit);
  renderLightboxAnnotations();
  drawLightbox();
}

// ── label editing ──────────────────────────────────────────

function loadLbGt() {
  const s = state.activeSample;
  lb.gt = (s.ground_truth || []).filter((g) => g.bounding_box).map((g) => ({ id: g.id, label: g.label, bbox: normBox(g, s) }));
}

function snapshot() {
  lb.undo.push(JSON.stringify(lb.gt));
  if (lb.undo.length > 100) lb.undo.shift();
}

function undoLb() {
  if (!lb.undo.length) return toast("Nothing to undo");
  lb.gt = JSON.parse(lb.undo.pop());
  if (!lb.gt.some((g) => g.id === lb.sel)) lb.sel = null;
  commitGt();
}

/** Send the edited label boxes to the server (queued so edits apply in order). */
function commitGt() {
  const sample = state.activeSample;
  if (!sample) return;
  const boxes = lb.gt.map((g) => ({ id: g.id, label: g.label, bbox: g.bbox }));
  const selIdx = lb.gt.findIndex((g) => g.id === lb.sel);
  renderLightboxAnnotations();
  drawLightbox();
  lb.queue = lb.queue.then(async () => {
    try {
      const data = await api("/api/annotations/set", {
        sample_id: sample.id, boxes, model: state.activeModel || "", min_conf: state.minConfidence,
      });
      Object.assign(sample, data.sample);
      setDirty(data.dirty_count, data.eval_stale);
      if (state.activeSample === sample) {
        loadLbGt();
        // server gives new boxes a permanent id; keep the selection by position
        if (selIdx >= 0 && lb.gt[selIdx]) lb.sel = lb.gt[selIdx].id;
        renderLightboxAnnotations();
        drawLightbox();
      }
      redrawCard(sample);
    } catch (e) {
      toast(`Could not save the change: ${e.message}`, true);
    }
  });
}

function redrawCard(sample) {
  const canvas = document.getElementById(`canvas-${sample.id}`);
  if (canvas) drawSampleCanvas(sample, canvas);
  const card = document.getElementById(`card-${sample.id}`);
  const badges = card && card.querySelector(".card-info > div:last-child");
  if (badges) {
    const preds = (sample.predictions || []).filter(predVisible).length;
    badges.innerHTML = `<span style="color:var(--color-gt);" title="Ground Truth">● ${(sample.ground_truth || []).length}</span>` +
      (preds ? `<span style="color:var(--color-pred);" title="Predictions">▲ ${preds}</span>` : "") + evalBadgesHtml(sample);
  }
}

function setDirty(n, stale) {
  if (state.info) {
    state.info.dirty_count = n;
    if (stale !== undefined) state.info.eval_stale = stale;
  }
  const btn = document.getElementById("save-labels-btn");
  if (btn) btn.style.display = n ? "" : "none";
  const c = document.getElementById("dirty-count");
  if (c) c.textContent = n;
  const panelBtn = document.getElementById("lb-save-btn");
  if (panelBtn) panelBtn.textContent = n ? `💾 Save labels to disk (${n} image${n > 1 ? "s" : ""})` : "✓ All labels saved";
}

async function saveLabels() {
  try {
    const data = await api("/api/labels/save", {});
    toast(data.written ? `${data.message}. Backup of the old files: ${data.backup}` : data.message);
    await loadDatasetInfo();
    setDirty(state.info ? state.info.dirty_count || 0 : 0);
  } catch (e) {
    toast(e.message, true);
  }
}

function lbClasses() {
  const list = [...((state.info && state.info.classes) || [])];
  lb.gt.forEach((g) => { if (!list.includes(g.label)) list.push(g.label); });
  return list;
}

function setLbClass(name) {
  lb.cls = name;
  const g = lb.gt.find((b) => b.id === lb.sel);
  if (g && g.label !== name) {
    snapshot();
    g.label = name;
    commitGt();
    return;
  }
  renderLightboxAnnotations();
  drawLightbox();
}

function relabelGt(id, label) {
  const g = lb.gt.find((b) => b.id === id);
  if (!g || g.label === label) return;
  snapshot();
  g.label = label;
  commitGt();
}

function deleteGt(id) {
  if (!lb.gt.some((b) => b.id === id)) return;
  snapshot();
  lb.gt = lb.gt.filter((b) => b.id !== id);
  if (lb.sel === id) lb.sel = null;
  commitGt();
}

/** Prediction → label: relabel the label box it overlaps, or add it as a new label box. */
function acceptPrediction(predId) {
  const s = state.activeSample;
  const p = (s.predictions || []).find((d) => d.id === predId);
  if (!p) return;
  const b = normBox(p, s);
  const over = lb.gt.map((g) => ({ g, v: iou(b, g.bbox) })).filter((o) => o.v >= 0.5).sort((x, y) => y.v - x.v)[0];
  snapshot();
  if (over && over.g.label !== p.label) {
    over.g.label = p.label;
    lb.sel = over.g.id;
    toast(`Label box relabeled to "${p.label}"`);
  } else if (over) {
    over.g.bbox = b;
    lb.sel = over.g.id;
    toast("Label box snapped to the prediction");
  } else {
    const id = `new_${Math.random().toString(36).slice(2, 9)}`;
    lb.gt.push({ id, label: p.label, bbox: b });
    lb.sel = id;
    toast(`Added "${p.label}" as a label box`);
  }
  commitGt();
}

async function deletePrediction(predId) {
  const s = state.activeSample;
  try {
    await api("/api/annotations/action", { action: "delete", sample_id: s.id, annotation_id: predId });
    s.predictions = (s.predictions || []).filter((d) => d.id !== predId);
    renderLightboxAnnotations();
    drawLightbox();
    redrawCard(s);
  } catch (e) {
    toast(e.message, true);
  }
}

// ── sidebar ────────────────────────────────────────────────

function renderLightboxAnnotations() {
  const s = state.activeSample;
  if (!s) return;
  renderEditPanel();
  renderDiff(s);

  const classes = lbClasses();
  const gtList = document.getElementById("lb-gt-list");
  document.getElementById("lb-gt-count").textContent = lb.gt.length;
  gtList.innerHTML = lb.gt.length ? lb.gt.map((g, i) => {
    const src = (s.ground_truth || []).find((d) => d.id === g.id);
    const st = src ? gtStatus(src, state.activeModel) : null;
    return `
    <div class="lb-ann-item gt-row ${g.id === lb.sel ? "selected" : ""}" data-id="${escapeHtml(g.id)}">
      <div class="lb-ann-top">
        <span class="lb-ann-label"><span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(g.label)}"></span> #${i + 1}</span>
        <select class="guava-select gt-cls" title="Change the class of this label box">${
          classes.map((c) => `<option ${c === g.label ? "selected" : ""}>${escapeHtml(c)}</option>`).join("")}</select>
        ${st ? `<span class="eval-pill eval-${st}" title="Result of ${escapeHtml(state.activeModel)} (★ model)">${multiModel() ? `${modelLetter(state.activeModel)} ` : ""}${st === "fn" ? "missed" : "found"}</span>` : ""}
        <button class="icon-btn gt-del" title="Delete this label box (Del)">🗑️</button>
      </div>
      <div class="lb-ann-coords">x ${g.bbox[0].toFixed(3)} · y ${g.bbox[1].toFixed(3)} · w ${g.bbox[2].toFixed(3)} · h ${g.bbox[3].toFixed(3)}</div>
    </div>`;
  }).join("") : `<div class="lb-empty">No label boxes. ${lb.edit ? "Drag on the image to draw one." : "Click ✏️ Edit labels to draw one."}</div>`;
  gtList.querySelectorAll(".gt-row").forEach((row) => {
    const id = row.dataset.id;
    row.addEventListener("click", (e) => {
      if (e.target.closest("select, button")) return;
      lb.sel = lb.sel === id ? null : id;
      if (lb.sel && !lb.edit) toggleLbEdit(true); else { renderLightboxAnnotations(); drawLightbox(); }
    });
    row.addEventListener("mouseenter", () => { lb.hover = id; drawLightbox(); });
    row.addEventListener("mouseleave", () => { lb.hover = null; drawLightbox(); });
    row.querySelector(".gt-cls").addEventListener("change", (e) => relabelGt(id, e.target.value));
    row.querySelector(".gt-del").addEventListener("click", () => deleteGt(id));
  });

  const preds = (s.predictions || []).filter(predVisible);
  document.getElementById("lb-pred-count").textContent = preds.length;
  const predList = document.getElementById("lb-pred-list");
  const shownConf = (p) => p.confidence === undefined || p.confidence >= state.minConfidence;
  const sorted = [...preds].sort((a, b) => (shownConf(b) - shownConf(a)) || ((b.confidence ?? 1) - (a.confidence ?? 1)));
  predList.innerHTML = sorted.length ? sorted.slice(0, 200).map((p) => {
    const b = normBox(p, s);
    const over = lb.gt.map((g) => ({ g, v: iou(b, g.bbox) })).filter((o) => o.v >= 0.5).sort((x, y) => y.v - x.v)[0];
    const act = over ? (over.g.label === p.label ? "" : `→ ${escapeHtml(p.label)}`) : "＋ Add";
    const title = over ? (over.g.label === p.label ? "" : `Relabel the overlapping label box (${over.g.label}) as ${p.label}`) : "Add this box to the labels";
    return `
    <div class="lb-ann-item pred-row ${shownConf(p) ? "" : "below-conf"}" data-id="${escapeHtml(p.id)}">
      <div class="lb-ann-top">
        <span class="lb-ann-label" style="color:${getCategoryColor(p.label)}">
          ${p.model && multiModel() ? `<span class="model-swatch" style="background:${modelColor(p.model)}" title="${escapeHtml(p.model)}">${modelLetter(p.model)}</span>` : ""}
          ${escapeHtml(p.label)} <span class="conf">${Math.round((p.confidence ?? 1) * 100)}%</span></span>
        <div style="display:flex; gap:4px; align-items:center;">
          ${p.eval ? `<span class="eval-pill eval-${p.eval}">${p.eval === "fp" && over && over.g.label !== p.label ? `≠ ${escapeHtml(over.g.label)}` : p.eval.toUpperCase()}</span>` : ""}
          ${act ? `<button class="mini-btn pred-accept" title="${escapeHtml(title)}">${act}</button>` : `<span class="match-ok" title="Same box and class as a label">✓</span>`}
          <button class="icon-btn pred-del" title="Delete this prediction">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join("") : `<div class="lb-empty">No predictions. Run a model with 🤖 Run Model.</div>`;
  predList.querySelectorAll(".pred-row").forEach((row) => {
    const id = row.dataset.id;
    row.addEventListener("mouseenter", () => { lb.hover = id; drawLightbox(); });
    row.addEventListener("mouseleave", () => { lb.hover = null; drawLightbox(); });
    const acc = row.querySelector(".pred-accept");
    if (acc) acc.addEventListener("click", () => acceptPrediction(id));
    row.querySelector(".pred-del").addEventListener("click", () => deletePrediction(id));
  });
}

function renderEditPanel() {
  const el = document.getElementById("lb-edit-panel");
  if (!lb.edit) {
    el.style.display = "none";
    return;
  }
  el.style.display = "";
  const classes = lbClasses();
  const n = (state.info && state.info.dirty_count) || 0;
  el.innerHTML = `
    <div class="ep-title">Class for new boxes <span class="ep-sub">(also relabels the selected box)</span></div>
    <div class="ep-classes">${classes.map((c, i) => `
      <button class="ep-cls ${c === lb.cls ? "active" : ""}" data-cls="${escapeHtml(c)}" style="--c:${getCategoryColor(c)}">
        ${i < 9 ? `<kbd>${i + 1}</kbd>` : ""}${escapeHtml(c)}</button>`).join("")}
      <button class="ep-cls ep-new" title="Add a class that is not in the dataset yet">＋ class</button>
    </div>
    <div class="ep-row">
      <button class="secondary-btn" onclick="undoLb()" ${lb.undo.length ? "" : "disabled"}>↶ Undo</button>
      <button class="primary-btn" id="lb-save-btn" onclick="saveLabels()" ${n ? "" : "disabled"}>${n ? `💾 Save labels to disk (${n} image${n > 1 ? "s" : ""})` : "✓ All labels saved"}</button>
    </div>
    ${state.info && !state.info.can_save_labels ? `<div class="ep-warn">This dataset was not loaded from YOLO label files: keep edits with 💾 Save (workspace) or 🔄 Convert & Export.</div>` : ""}`;
  el.querySelectorAll(".ep-cls[data-cls]").forEach((b) => b.addEventListener("click", () => setLbClass(b.dataset.cls)));
  el.querySelector(".ep-new").addEventListener("click", () => {
    const name = (prompt("New class name:") || "").trim();
    if (!name) return;
    if (state.info && !state.info.classes.includes(name)) state.info.classes.push(name);
    setLbClass(name);
  });
}

/** "Label vs prediction" summary: per label box, did each model find it? plus each model's extra boxes. */
function renderDiff(s) {
  const el = document.getElementById("lb-diff");
  const models = splitPanels().filter((p) => p.kind === "pred").map((p) => p.model);
  const gts = s.ground_truth || [];
  const evaluated = models.filter((m) => gts.some((g) => gtStatus(g, m)) || shownPreds(s, m).some((p) => p.eval));
  if (!models.length) {
    el.innerHTML = "";
    return;
  }
  if (!evaluated.length) {
    el.innerHTML = `<div class="diff-title">Label vs prediction</div><div class="lb-empty">Not evaluated yet: open 📈 Evaluate (or keep "Auto-evaluate" on when running a model).</div>`;
    return;
  }
  const head = evaluated.map((m) => `<th title="${escapeHtml(m)}"><span class="model-swatch" style="background:${modelColor(m)}">${modelLetter(m)}</span></th>`).join("");
  const rows = gts.map((g, i) => {
    const b = normBox(g, s);
    const cells = evaluated.map((m) => {
      const st = gtStatus(g, m);
      if (st === "tp") return `<td class="ok" title="found">✓</td>`;
      if (st === "fn") {
        const wrong = shownPreds(s, m).filter((p) => p.label !== g.label).find((p) => iou(normBox(p, s), b) >= 0.5);
        return wrong ? `<td class="bad" title="found the object but as ${escapeHtml(wrong.label)}">≠ ${escapeHtml(wrong.label)}</td>` : `<td class="bad" title="missed">✗ missed</td>`;
      }
      return `<td class="na">–</td>`;
    }).join("");
    return `<tr data-id="${escapeHtml(g.id)}"><td><span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(g.label)}"></span> #${i + 1} ${escapeHtml(g.label)}</td>${cells}</tr>`;
  }).join("");
  const extras = evaluated.map((m) => {
    const fps = shownPreds(s, m).filter((p) => p.eval === "fp" && !gts.some((g) => g.label !== p.label && iou(normBox(p, s), normBox(g, s)) >= 0.5));
    return fps.length ? `<div class="diff-fp"><span class="model-swatch" style="background:${modelColor(m)}">${modelLetter(m)}</span> ${fps.length} extra box${fps.length > 1 ? "es" : ""} with no label: ${
      fps.slice(0, 6).map((p) => `<span class="fp-chip" data-id="${escapeHtml(p.id)}">${escapeHtml(p.label)} ${Math.round((p.confidence ?? 1) * 100)}%</span>`).join(" ")}</div>` : "";
  }).join("");
  const summary = evaluated.map((m) => {
    const p = { kind: "pred", model: m };
    return `<div class="diff-sum"><span class="model-swatch" style="background:${modelColor(m)}">${modelLetter(m)}</span> <span title="${escapeHtml(m)}">${escapeHtml(m)}</span>: <b>${panelSummary(s, p)}</b></div>`;
  }).join("");
  el.innerHTML = `
    <div class="diff-title">Label vs prediction <span class="ep-sub">at conf ≥ ${state.minConfidence.toFixed(2)}</span></div>
    ${summary}
    ${gts.length ? `<table class="diff-table"><thead><tr><th>Label box</th>${head}</tr></thead><tbody>${rows}</tbody></table>` : ""}
    ${extras}`;
  el.querySelectorAll("tr[data-id], .fp-chip").forEach((r) => {
    r.addEventListener("mouseenter", () => { lb.hover = r.dataset.id; drawLightbox(); });
    r.addEventListener("mouseleave", () => { lb.hover = null; drawLightbox(); });
  });
}

// ── mouse & keyboard ───────────────────────────────────────

function lbPoint(e) {
  const c = lbCanvas().getBoundingClientRect();
  return { x: (e.clientX - c.left) * dpr(), y: (e.clientY - c.top) * dpr() };
}

function panelAt(pt) {
  const L = lbLayout();
  const i = L.findIndex((p) => pt.x >= p.rect.x && pt.x <= p.rect.x + p.rect.w);
  return i < 0 ? 0 : i;
}

function toNorm(pt) {
  const T = lbLayout()[0].T;
  return [(pt.x - T.ox) / T.w, (pt.y - T.oy) / T.h];
}

function rectFrom(a, b) {
  const x1 = Math.max(0, Math.min(a[0], b[0])), y1 = Math.max(0, Math.min(a[1], b[1]));
  const x2 = Math.min(1, Math.max(a[0], b[0])), y2 = Math.min(1, Math.max(a[1], b[1]));
  return [x1, y1, Math.max(0, x2 - x1), Math.max(0, y2 - y1)];
}

function hitTest(pt) {
  const T = lbLayout()[0].T;
  const sel = lb.gt.find((g) => g.id === lb.sel);
  const tol = 7 * dpr();
  if (sel) {
    const pts = handlePoints(toRect(sel.bbox, T));
    const h = pts.findIndex(([hx, hy]) => Math.abs(pt.x - hx) <= tol && Math.abs(pt.y - hy) <= tol);
    if (h >= 0) return { box: sel, handle: HANDLES[h] };
  }
  // smallest box under the cursor wins, so nested boxes stay reachable
  const inside = lb.gt.filter((g) => {
    const r = toRect(g.bbox, T);
    return pt.x >= r.x - 2 && pt.x <= r.x + r.w + 2 && pt.y >= r.y - 2 && pt.y <= r.y + r.h + 2;
  }).sort((a, b) => a.bbox[2] * a.bbox[3] - b.bbox[2] * b.bbox[3]);
  return inside.length ? { box: inside[0], handle: null } : null;
}

const CURSORS = { nw: "nwse-resize", se: "nwse-resize", ne: "nesw-resize", sw: "nesw-resize", n: "ns-resize", s: "ns-resize", e: "ew-resize", w: "ew-resize" };

function resizeBox(b0, handle, dx, dy) {
  let [x1, y1, x2, y2] = [b0[0], b0[1], b0[0] + b0[2], b0[1] + b0[3]];
  if (handle.includes("w")) x1 += dx;
  if (handle.includes("e")) x2 += dx;
  if (handle.includes("n")) y1 += dy;
  if (handle.includes("s")) y2 += dy;
  return rectFrom([x1, y1], [x2, y2]);
}

(function initLightboxInput() {
  const wrap = document.getElementById("canvas-wrapper");
  if (!wrap) return;
  const canvas = lbCanvas();
  try {
    lb.view = localStorage.getItem("guava.lbView") === "split" ? "split" : "overlay";
    const gv = localStorage.getItem("guava.gridView");
    if (gv === "split") {
      state.gridView = "split";
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("#grid-view-seg button").forEach((b) => b.classList.toggle("active", b.dataset.view === "split"));
        document.getElementById("samples-grid").classList.add("grid-split");
      });
    }
    document.querySelectorAll("#lb-view-seg button").forEach((b) => b.classList.toggle("active", b.dataset.view === lb.view));
  } catch (e) { /* optional */ }

  wrap.addEventListener("wheel", (e) => {
    e.preventDefault();
    const pt = lbPoint(e);
    zoomCanvas(e.deltaY < 0 ? 1.15 : 1 / 1.15, { ...pt, panel: panelAt(pt) });
  }, { passive: false });

  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  canvas.addEventListener("mousedown", (e) => {
    const pt = lbPoint(e);
    const pan = !lb.edit || lb.space || e.button !== 0;
    if (pan) {
      lb.drag = { type: "pan", sx: e.clientX, sy: e.clientY, px: lb.panX, py: lb.panY };
      return;
    }
    const hit = hitTest(pt);
    const p = toNorm(pt);
    if (hit) {
      lb.sel = hit.box.id;
      lb.drag = { type: hit.handle ? "resize" : "move", handle: hit.handle, start: p, b0: [...hit.box.bbox], snap: JSON.stringify(lb.gt), box: hit.box };
      renderLightboxAnnotations();
    } else {
      lb.sel = null;
      lb.drag = { type: "draw", start: p, cur: p };
    }
    drawLightbox();
  });

  window.addEventListener("mousemove", (e) => {
    if (!lightboxOpen()) return;
    const d = lb.drag;
    if (!d) {
      if (lb.edit && e.target === canvas) {
        const hit = hitTest(lbPoint(e));
        canvas.style.cursor = lb.space ? "grab" : hit ? (hit.handle ? CURSORS[hit.handle] : "move") : "crosshair";
      } else if (e.target === canvas) {
        canvas.style.cursor = "grab";
      }
      return;
    }
    if (d.type === "pan") {
      lb.panX = d.px + (e.clientX - d.sx);
      lb.panY = d.py + (e.clientY - d.sy);
      canvas.style.cursor = "grabbing";
    } else {
      const p = toNorm(lbPoint(e));
      const dx = p[0] - d.start[0], dy = p[1] - d.start[1];
      if (d.type === "draw") d.cur = p;
      else if (d.type === "move") {
        const [, , w, h] = d.b0;
        d.box.bbox = [Math.min(1 - w, Math.max(0, d.b0[0] + dx)), Math.min(1 - h, Math.max(0, d.b0[1] + dy)), w, h];
      } else if (d.type === "resize") d.box.bbox = resizeBox(d.b0, d.handle, dx, dy);
    }
    drawLightbox();
  });

  window.addEventListener("mouseup", () => {
    const d = lb.drag;
    if (!d) return;
    lb.drag = null;
    if (d.type === "draw") {
      const r = rectFrom(d.start, d.cur || d.start);
      const T = lbLayout()[0].T;
      if (r[2] * T.w >= 4 * dpr() && r[3] * T.h >= 4 * dpr()) {
        if (!lb.cls) return toast("Pick a class first", true);
        snapshot();
        const id = `new_${Math.random().toString(36).slice(2, 9)}`;
        lb.gt.push({ id, label: lb.cls, bbox: r });
        lb.sel = id;
        commitGt();
        return;
      }
    } else if ((d.type === "move" || d.type === "resize") && JSON.stringify(lb.gt) !== d.snap) {
      lb.undo.push(d.snap);
      if (d.box.bbox[2] <= 0.001 || d.box.bbox[3] <= 0.001) lb.gt = lb.gt.filter((g) => g !== d.box);
      commitGt();
      return;
    }
    drawLightbox();
  });

  window.addEventListener("keydown", (e) => {
    if (!lightboxOpen()) return;
    if (e.target.matches && e.target.matches("input, textarea, select")) return;
    const k = e.key;
    if (k === " ") { lb.space = true; e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === "z") { e.preventDefault(); undoLb(); return; }
    if ((e.ctrlKey || e.metaKey) && k.toLowerCase() === "s") { e.preventDefault(); saveLabels(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const sel = lb.gt.find((g) => g.id === lb.sel);
    if (k === "Escape") {
      if (lb.drag) { lb.drag = null; drawLightbox(); }
      else if (lb.edit && lb.sel) { lb.sel = null; renderLightboxAnnotations(); drawLightbox(); }
      else closeLightbox();
    } else if ((k === "Delete" || k === "Backspace") && sel) {
      e.preventDefault();
      deleteGt(sel.id);
    } else if (k.startsWith("Arrow") && lb.edit && sel) {
      // nudge the selected box by 1 screen pixel (Shift: 10)
      e.preventDefault();
      const T = lbLayout()[0].T, step = (e.shiftKey ? 10 : 1) * dpr();
      const dx = k === "ArrowLeft" ? -step / T.w : k === "ArrowRight" ? step / T.w : 0;
      const dy = k === "ArrowUp" ? -step / T.h : k === "ArrowDown" ? step / T.h : 0;
      snapshot();
      sel.bbox = [Math.min(1 - sel.bbox[2], Math.max(0, sel.bbox[0] + dx)), Math.min(1 - sel.bbox[3], Math.max(0, sel.bbox[1] + dy)), sel.bbox[2], sel.bbox[3]];
      commitGt();
    } else if (k === "ArrowLeft") navigateLightbox(-1);
    else if (k === "ArrowRight") navigateLightbox(1);
    else if (k === "e" || k === "E") toggleLbEdit();
    else if (k === "s" || k === "S") setLbView(lb.view === "split" ? "overlay" : "split");
    else if (k === "0") resetZoom();
    else if (/^[1-9]$/.test(k) && lb.edit) {
      const c = lbClasses()[+k - 1];
      if (c) setLbClass(c);
    }
  });
  window.addEventListener("keyup", (e) => { if (e.key === " ") lb.space = false; });

  new ResizeObserver(() => { if (lightboxOpen()) drawLightbox(); }).observe(wrap);
})();

// keep the dirty indicator in sync with the server after every dataset info refresh
const _loadDatasetInfoBase = loadDatasetInfo;
loadDatasetInfo = async function () {
  await _loadDatasetInfoBase();
  if (state.info) setDirty(state.info.dirty_count || 0, state.info.eval_stale);
};
