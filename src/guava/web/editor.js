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
  hide: new Set(),   // layers hidden in the lightbox only: "gt" and/or model names
  hideBeforeEdit: null,
  errorsOnly: false, // hide boxes every shown model got right
  tagMode: "num",    // "num": small number / model-letter badges, "full": class name tags
  errIdx: -1,
  focusOnLoad: false,
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
  const preds = (sample.predictions || []).filter((p) =>
    (model === undefined || p.model === model) && predVisible(p) &&
    (p.confidence === undefined || p.confidence >= state.minConfidence));
  // an evaluated model also stores boxes below the operating conf (Evaluation mode keeps
  // everything down to 0.001): those were not judged, so leave them out of the comparison
  return model !== undefined && preds.some((p) => p.eval) ? preds.filter((p) => p.eval && p.eval !== "ignored") : preds;
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
const catPass = (lab) => state.activeCategories.size === 0 || state.activeCategories.has(lab);

/** Small badge centered on a box corner: a number for label boxes, the model letter for predictions. */
function drawBadge(ctx, x, y, text, color, u, ring = null, round = true) {
  const R = 7.5 * u;
  ctx.font = `700 ${Math.round(10 * u)}px system-ui, sans-serif`;
  const w = Math.max(2 * R, ctx.measureText(text).width + 7 * u), h = 2 * R;
  ctx.beginPath();
  ctx.roundRect(x - w / 2, y - h / 2, w, h, round ? R : 3 * u);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = (ring ? 2.5 : 1.2) * u;
  ctx.strokeStyle = ring || "#fff";
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y + 0.5 * u);
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";
}

/**
 * One box: thin colored outline over a dark halo (readable on any background).
 * it.kind: "gt" (solid, number badge top-left), "pred" (dashed, model-letter badge
 * bottom-right), "miss" (a label box a model missed: dashed rose). The full name tag
 * is drawn in "Name" tag mode, for the hovered / selected box, or when `full` is set.
 */
function drawItem(ctx, it, T, u, full = false) {
  const r = toRect(it.b, T);
  const hot = it.id === lb.hover || it.id === lb.sel;
  const w = hot ? 3 : 1.8;
  const dash = it.kind === "gt" ? [] : [6 * u, 4 * u];
  ctx.setLineDash(dash);
  ctx.lineWidth = (w + 2.4) * u;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.55)";
  ctx.strokeRect(r.x, r.y, r.w, r.h);
  ctx.lineWidth = w * u;
  ctx.strokeStyle = it.color;
  ctx.strokeRect(r.x, r.y, r.w, r.h);
  ctx.setLineDash([]);
  if (hot) {
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = it.color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.globalAlpha = 1;
  }
  const named = full || hot || lb.tagMode === "full";
  if (it.kind === "gt") {
    if (named) drawTag(ctx, r.x, r.y, `${it.n ? `${it.n} ` : ""}GT·${it.label}`, it.color, u);
    else drawBadge(ctx, r.x, r.y, String(it.n), it.color, u, it.missed ? LB_COLORS.fn : null);
  } else if (it.kind === "miss") {
    if (named) drawTag(ctx, r.x, r.y + r.h, `MISSED ${it.n ? `${it.n} ` : ""}${it.label}`, LB_COLORS.fn, u, true);
    else drawBadge(ctx, r.x, r.y, `✗${it.n}`, LB_COLORS.fn, u);
  } else {
    const txt = `${it.letter}·${it.label} ${Math.round((it.conf ?? 1) * 100)}%${it.wrong ? ` ≠ ${it.wrong}` : it.ev === "fp" ? " FP" : ""}`;
    if (named) drawTag(ctx, r.x, r.y + r.h, txt, it.color, u, true);
    else drawBadge(ctx, r.x + r.w, r.y + r.h, it.letter, it.color, u, null, false);
  }
}

/** Prediction item; `wrong` = class of the label box it overlaps when it named it differently. */
function predItem(p, s, m, gts) {
  const b = normBox(p, s);
  const over = p.eval === "fp" ? gts.find((g) => g.label !== p.label && iou(b, g.b) >= 0.5) : null;
  return {
    id: p.id, kind: "pred", model: m, letter: modelLetter(m), label: p.label, conf: p.confidence, ev: p.eval, b,
    wrong: over ? over.label : null,
    color: p.eval === "tp" ? LB_COLORS.tp : p.eval === "fp" ? LB_COLORS.fp : modelColor(m),
  };
}

/** Models shown in the lightbox: visible in the sidebar layers and not switched off here. */
function lbModels() {
  return (modelUi.predModels || []).map((m) => m.name).filter((n) => !state.hiddenModels.has(n) && !lb.hide.has(n));
}

/** Label boxes of the open image (the editor's copy, so edits show at once). */
function lbGtBoxes(s) {
  return lb.gt.map((g, i) => ({ ...g, n: i + 1, b: g.bbox, src: (s.ground_truth || []).find((d) => d.id === g.id) }));
}

/** Everything the overlay draws, after layer / class / "only errors" filters. */
function lbItems(s, errorsOnly = lb.errorsOnly) {
  const models = lbModels();
  // "missed" counts every model shown in the app, even when its boxes are switched off here
  // (the label editor hides predictions but should still mark the labels they missed)
  const judged = (modelUi.predModels || []).map((m) => m.name).filter((n) => !state.hiddenModels.has(n));
  const gts = lbGtBoxes(s);
  const items = [];
  if (state.showGt && !lb.hide.has("gt")) {
    gts.forEach((g) => {
      const missed = judged.some((m) => g.src && gtStatus(g.src, m) === "fn");
      if (!catPass(g.label) || (errorsOnly && !missed)) return;
      items.push({ id: g.id, kind: "gt", n: g.n, label: g.label, b: g.b, color: getCategoryColor(g.label), missed });
    });
  }
  if (state.showPred) {
    models.forEach((m) => shownPreds(s, m).forEach((p) => {
      if (!catPass(p.label) || (errorsOnly && p.eval !== "fp")) return;
      items.push(predItem(p, s, m, gts));
    }));
  }
  return items;
}

/**
 * Draw one layer of `sample` into the image rectangle T = {ox, oy, w, h}.
 * kind "gt": the label boxes. kind "pred": `model`'s predictions colored against the
 * label (TP green, FP red, wrong class) plus the label boxes the model missed.
 * `full`: always draw the class names (grid cards, which have no sidebar to look them up).
 */
function drawLayer(ctx, sample, panel, T, u, full = false) {
  full = full && state.showLabels;
  const gts = (sample.ground_truth || []).filter((g) => g.bounding_box)
    .map((g, i) => ({ id: g.id, n: i + 1, label: g.label, b: normBox(g, sample), src: g }));
  if (panel.kind === "gt") {
    gts.forEach((g) => {
      if (catPass(g.label)) drawItem(ctx, { id: g.id, kind: "gt", n: g.n, label: g.label, b: g.b, color: getCategoryColor(g.label) }, T, u, full);
    });
    return;
  }
  const model = panel.model;
  gts.forEach((g) => {
    if (catPass(g.label) && gtStatus(g.src, model) === "fn") drawItem(ctx, { id: g.id, kind: "miss", n: g.n, label: g.label, b: g.b, color: LB_COLORS.fn }, T, u, full);
  });
  shownPreds(sample, model).forEach((p) => {
    if (catPass(p.label) && !(lb.errorsOnly && !full && p.eval !== "fp")) drawItem(ctx, predItem(p, sample, model, gts), T, u, full);
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
    drawLayer(ctx, sample, panel, T, u, true);
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
      if (lb.focusOnLoad) {
        // small defects: open zoomed onto the boxes instead of the whole part
        lb.focusOnLoad = false;
        fitBoxes(true);
      }
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

/** Overlay view: label and prediction boxes on one image; big boxes first, hovered / selected last. */
function drawOverlay(ctx, sample, T, u) {
  const hot = (it) => it.id === lb.hover || it.id === lb.sel;
  lbItems(sample)
    .sort((a, b) => (hot(a) - hot(b)) || (b.b[2] * b.b[3] - a.b[2] * a.b[3]))
    .forEach((it) => drawItem(ctx, it, T, u));
  const sel = lb.edit && lb.gt.find((g) => g.id === lb.sel);
  if (sel) {
    handlePoints(toRect(sel.bbox, T)).forEach(([hx, hy]) => {
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = LB_COLORS.sel;
      ctx.lineWidth = 1.5 * u;
      ctx.fillRect(hx - 4 * u, hy - 4 * u, 8 * u, 8 * u);
      ctx.strokeRect(hx - 4 * u, hy - 4 * u, 8 * u, 8 * u);
    });
  }
}

// ── zoom to boxes / step through errors ────────────────────

/** Zoom and pan so the normalized rectangle `b` fills the view (all panels share zoom and pan). */
function focusRect(b, minFrac = 0.12, pad = 1.6) {
  if (!lb.img) return;
  const p = lbLayout()[0];
  const iw = lb.img.naturalWidth, ih = lb.img.naturalHeight;
  const cx = b[0] + b[2] / 2, cy = b[1] + b[3] / 2;
  const w = Math.max(b[2] * pad, minFrac), h = Math.max(b[3] * pad, minFrac);
  const s = Math.min(p.rect.w / (w * iw), (p.rect.h - p.top) / (h * ih));
  lb.zoom = Math.max(1, Math.min(20, s / p.T.fit));
  const s2 = p.T.fit * lb.zoom;
  lb.panX = (iw * s2 * (0.5 - cx)) / dpr();
  lb.panY = (ih * s2 * (0.5 - cy)) / dpr();
  drawLightbox();
}

function unionBox(items) {
  if (!items.length) return null;
  const x1 = Math.min(...items.map((i) => i.b[0])), y1 = Math.min(...items.map((i) => i.b[1]));
  const x2 = Math.max(...items.map((i) => i.b[0] + i.b[2])), y2 = Math.max(...items.map((i) => i.b[1] + i.b[3]));
  return [x1, y1, x2 - x1, y2 - y1];
}

/** 🎯 / F: zoom to the shown boxes (whole image when they already cover most of it). */
function fitBoxes(quiet = false) {
  lb.hover = null;
  const u = unionBox(lbItems(state.activeSample));
  if (!u || u[2] * u[3] > 0.35) {
    if (!quiet) resetZoom();
    return false;
  }
  focusRect(u, 0.15, 1.35);
  return true;
}

/** Missed label boxes and false positives of the shown models, top to bottom. */
function lbErrors(s) {
  return lbItems(s, true).sort((a, b) => (a.b[1] - b.b[1]) || (a.b[0] - b.b[0]));
}

function describeError(it, s) {
  if (it.kind === "gt") {
    const who = (modelUi.predModels || []).map((x) => x.name).filter((n) => !state.hiddenModels.has(n)).filter((m) => {
      const g = (s.ground_truth || []).find((d) => d.id === it.id);
      return g && gtStatus(g, m) === "fn";
    }).map(modelLetter).join(" + ");
    return `${who} missed label ${it.n} ${it.label}`;
  }
  return `${it.letter} ${it.wrong ? `called label ${it.wrong} "${it.label}"` : `false alarm ${it.label}`} ${Math.round((it.conf ?? 1) * 100)}%`;
}

/** N / Shift+N: zoom to the next / previous error. */
function stepError(dir) {
  const s = state.activeSample;
  if (!s) return;
  const errs = lbErrors(s);
  const pos = document.getElementById("lb-err-pos");
  if (!errs.length) {
    if (pos) pos.textContent = "no errors";
    toast("No missed labels or false positives on this image");
    return;
  }
  lb.errIdx = ((lb.errIdx + dir) % errs.length + errs.length) % errs.length;
  const it = errs[lb.errIdx];
  lb.hover = it.id;
  if (pos) pos.textContent = `${lb.errIdx + 1} / ${errs.length}: ${describeError(it, s)}`;
  focusRect(it.b, 0.12, 2.5);
  highlightRow(it.id);
}

function updateErrPos() {
  const pos = document.getElementById("lb-err-pos");
  if (!pos || !state.activeSample) return;
  const n = lbErrors(state.activeSample).length;
  pos.textContent = n ? `${n} error${n > 1 ? "s" : ""}` : "no errors";
}

// ── lightbox toolbar: layers, only errors, tag style ───────

function renderLbLayers() {
  const box = document.getElementById("lb-layers");
  if (!box) return;
  const models = (modelUi.predModels || []).map((m) => m.name).filter((n) => !state.hiddenModels.has(n));
  const chip = (key, html, title) => `<button class="lb-layer ${lb.hide.has(key) ? "off" : ""}" data-key="${escapeHtml(key)}" title="${escapeHtml(title)}">${html}</button>`;
  box.innerHTML = chip("gt", `<span class="lq-line gt"></span>GT`, "Label (ground truth) boxes") +
    models.map((m) => chip(m, `<span class="lq-line pred" style="border-color:${modelColor(m)}"></span>${modelLetter(m)}`, m)).join("");
  box.querySelectorAll(".lb-layer").forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.key;
    if (lb.hide.has(k)) lb.hide.delete(k); else lb.hide.add(k);
    lb.errIdx = -1;
    renderLbLayers();
    renderLightboxAnnotations();
    drawLightbox();
  }));
  document.getElementById("lb-errors-btn").classList.toggle("on", lb.errorsOnly);
  document.querySelectorAll("#lb-tag-seg button").forEach((b) => b.classList.toggle("active", b.dataset.tag === lb.tagMode));
  updateErrPos();
}

function toggleErrorsOnly() {
  lb.errorsOnly = !lb.errorsOnly;
  lb.errIdx = -1;
  renderLbLayers();
  drawLightbox();
}

function setTagMode(mode) {
  lb.tagMode = mode;
  try { localStorage.setItem("guava.tagMode", mode); } catch (e) { /* optional */ }
  renderLbLayers();
  drawLightbox();
}

const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
function handlePoints(r) {
  const cx = r.x + r.w / 2, cy = r.y + r.h / 2, x2 = r.x + r.w, y2 = r.y + r.h;
  return [[r.x, r.y], [cx, r.y], [x2, r.y], [x2, cy], [x2, y2], [cx, y2], [r.x, y2], [r.x, cy]];
}

function updateLbHint() {
  const el = document.getElementById("lb-hint");
  if (!el) return;
  const zoom = `wheel = zoom (${Math.round(lb.zoom * 100)}%) · <kbd>0</kbd> whole image`;
  if (lb.edit) {
    el.innerHTML = `<b>Editing labels</b> · drag on empty area = new <b style="color:${getCategoryColor(lb.cls)}">${escapeHtml(lb.cls || "?")}</b> box · click to select · drag to move · corners to resize · <kbd>1</kbd>–<kbd>9</kbd> class · <kbd>Del</kbd> · <kbd>Ctrl+Z</kbd> · <kbd>Space</kbd>+drag pan · ${zoom}`;
  } else if (lb.view === "split") {
    el.innerHTML = `<b style="color:${LB_COLORS.tp}">green = correct</b> · <b style="color:${LB_COLORS.fp}">red = false positive</b> · <b style="color:${LB_COLORS.fn}">✗ = missed label</b> · hover a box for its name · ${zoom}`;
  } else {
    el.innerHTML = `Solid ① = label · dashed <b>A</b> = model A · hover a box for its name · <kbd>N</kbd> next error · <kbd>F</kbd> zoom to boxes · ${zoom}`;
  }
}

// ── open / close / navigate ────────────────────────────────

function openLightbox(sample) {
  state.activeSample = sample;
  lb.zoom = 1; lb.panX = 0; lb.panY = 0;
  lb.sel = null; lb.hover = null; lb.drag = null; lb.undo = []; lb.errIdx = -1;
  loadLbGt();
  lb.focusOnLoad = true;
  const src = sample.media_url || `/api/media/${encodeURIComponent(sample.id)}`;
  if (lb.img && lb.imgSrc === src) setTimeout(() => { lb.focusOnLoad = false; fitBoxes(true); }, 0);
  renderLbLayers();
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
  lb.zoom = 1; lb.panX = 0; lb.panY = 0; lb.hover = null;
  drawLightbox();
}

function setLbView(view) {
  if (view === "split" && lb.edit) toggleLbEdit(false);
  lb.view = view;
  document.querySelectorAll("#lb-view-seg button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  document.getElementById("lb-edit-btn").classList.toggle("on", lb.edit);
  try { localStorage.setItem("guava.lbView", view); } catch (e) { /* optional */ }
  renderLightboxAnnotations();
  drawLightbox();
}

function toggleLbEdit(on = !lb.edit) {
  if (on === lb.edit) return;
  lb.edit = on;
  if (on && lb.view !== "overlay") setLbView("overlay");
  if (on) {
    // editing: predictions off by default (switch them on with the A / B chips)
    lb.hideBeforeEdit = new Set(lb.hide);
    (modelUi.predModels || []).forEach((m) => lb.hide.add(m.name));
    lb.hide.delete("gt");
  } else {
    lb.sel = null;
    if (lb.hideBeforeEdit) lb.hide = lb.hideBeforeEdit;
    lb.hideBeforeEdit = null;
  }
  renderLbLayers();
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
  if (panelBtn) { panelBtn.textContent = n ? `💾 Save (${n})` : "✓ Saved"; panelBtn.disabled = !n; }
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

// ── sidebar: one table of label boxes, then the boxes with no label ──

function highlightRow(id) {
  document.querySelectorAll("#lb-panel [data-id]").forEach((r) => r.classList.toggle("hot", r.dataset.id === id));
}

function bindHover(root) {
  root.querySelectorAll("[data-id]").forEach((r) => {
    r.addEventListener("mouseenter", () => { lb.hover = r.dataset.id; drawLightbox(); highlightRow(r.dataset.id); });
    r.addEventListener("mouseleave", () => { lb.hover = null; drawLightbox(); highlightRow(null); });
  });
}

/** Zoom to one box when its row is clicked (and select it if it is a label box). */
function focusItem(id) {
  const s = state.activeSample;
  const g = lb.gt.find((b) => b.id === id);
  const p = !g && (s.predictions || []).find((d) => d.id === id);
  const b = g ? g.bbox : p ? normBox(p, s) : null;
  if (!b) return;
  if (g) {
    lb.sel = id;
    renderLightboxAnnotations();
  }
  focusRect(b, 0.12, 2.5);
}

function renderLightboxAnnotations() {
  const s = state.activeSample;
  if (!s) return;
  renderEditPanel();
  renderPanel(s);
}

function renderPanel(s) {
  const el = document.getElementById("lb-panel");
  const models = splitPanels().filter((p) => p.kind === "pred").map((p) => p.model);
  const gts = lbGtBoxes(s);
  const evaluated = models.filter((m) => gts.some((g) => g.src && gtStatus(g.src, m)) || shownPreds(s, m).some((p) => p.eval));
  const classes = lbClasses();
  const conf = Math.max(state.minConfidence, state.evalConf || 0).toFixed(2);

  const summary = evaluated.map((m) => `<div class="diff-sum">${cmpSwatchLb(m)} <span class="sum-name" title="${escapeHtml(m)}">${escapeHtml(m)}</span> <b>${panelSummary(s, { kind: "pred", model: m })}</b></div>`).join("");
  const notEval = models.length && !evaluated.length
    ? `<div class="lb-empty">Not evaluated yet: open 📈 Evaluate (or keep "Auto-evaluate" on when running a model).</div>` : "";

  const statusCell = (g, m) => {
    const st = g.src ? gtStatus(g.src, m) : null;
    if (st === "tp") return `<td class="ok" title="${escapeHtml(m)} found it">✓</td>`;
    if (st === "fn") {
      const wrong = shownPreds(s, m).filter((p) => p.label !== g.label).find((p) => iou(normBox(p, s), g.b) >= 0.5);
      return wrong ? `<td class="bad" title="${escapeHtml(m)} found it as ${escapeHtml(wrong.label)}">≠ ${escapeHtml(wrong.label)}</td>` : `<td class="bad" title="${escapeHtml(m)} missed it">✗</td>`;
    }
    return `<td class="na">–</td>`;
  };
  const gtRows = gts.map((g) => `
    <tr class="gt-row ${g.id === lb.sel ? "selected" : ""}" data-id="${escapeHtml(g.id)}">
      <td><span class="nbadge" style="background:${getCategoryColor(g.label)}">${g.n}</span></td>
      <td><select class="guava-select gt-cls" title="Class of this label box">${classes.map((c) => `<option ${c === g.label ? "selected" : ""}>${escapeHtml(c)}</option>`).join("")}</select></td>
      ${evaluated.map((m) => statusCell(g, m)).join("")}
      <td><button class="icon-btn gt-del" title="Delete this label box (Del)">🗑</button></td>
    </tr>`).join("");
  const labelsTable = gts.length ? `
    <table class="lb-table">
      <thead><tr><th>#</th><th>Class</th>${evaluated.map((m) => `<th title="${escapeHtml(m)}">${cmpSwatchLb(m)}</th>`).join("")}<th></th></tr></thead>
      <tbody>${gtRows}</tbody>
    </table>` : `<div class="lb-empty">No label boxes. ${lb.edit ? "Drag on the image to draw one." : "Press E (✏️ Edit labels) to draw one."}</div>`;

  // predictions with no matching label: false alarms, or the right object under another class
  const extras = [];
  evaluated.forEach((m) => shownPreds(s, m).forEach((p) => {
    if (p.eval === "fp") extras.push(predItem(p, s, m, gts));
  }));
  const extraRows = extras.map((it) => {
    const over = lb.gt.map((g) => ({ g, v: iou(it.b, g.bbox) })).filter((o) => o.v >= 0.5).sort((x, y) => y.v - x.v)[0];
    const act = over ? `→ ${escapeHtml(it.label)}` : "＋ Add";
    const title = over ? `Relabel label box ${lb.gt.indexOf(over.g) + 1} (${over.g.label}) as ${it.label}` : "Add this box to the labels";
    return `
    <tr class="pred-row" data-id="${escapeHtml(it.id)}">
      <td>${cmpSwatchLb(it.model)}</td>
      <td class="pl">${escapeHtml(it.label)} <span class="conf">${Math.round((it.conf ?? 1) * 100)}%</span>${it.wrong ? `<div class="sub">label says ${escapeHtml(it.wrong)}</div>` : ""}</td>
      <td><button class="mini-btn pred-accept" title="${escapeHtml(title)}">${act}</button></td>
      <td><button class="icon-btn pred-del" title="Delete this prediction">🗑</button></td>
    </tr>`;
  }).join("");

  const all = (s.predictions || []).filter(predVisible).filter((p) => p.confidence === undefined || p.confidence >= state.minConfidence);
  const allRows = all.sort((a, b) => (b.confidence ?? 1) - (a.confidence ?? 1)).slice(0, 200).map((p) => `
    <tr class="pred-row" data-id="${escapeHtml(p.id)}">
      <td>${p.model ? cmpSwatchLb(p.model) : ""}</td>
      <td class="pl">${escapeHtml(p.label)} <span class="conf">${Math.round((p.confidence ?? 1) * 100)}%</span></td>
      <td>${p.eval ? `<span class="eval-pill eval-${p.eval}">${p.eval.toUpperCase()}</span>` : ""}</td>
      <td><button class="icon-btn pred-del" title="Delete this prediction">🗑</button></td>
    </tr>`).join("");

  el.innerHTML = `
    ${summary || notEval ? `<div class="diff-title">Label vs prediction <span class="ep-sub">conf ≥ ${conf}</span></div>${summary}${notEval}` : ""}
    <div class="diff-title" style="margin-top:10px;">Label boxes <span class="cat-count-sub">${gts.length}</span></div>
    ${labelsTable}
    ${extras.length ? `<div class="diff-title fp-title">Predicted, no label <span class="cat-count-sub">${extras.length}</span></div>
      <table class="lb-table">${extraRows}</table>` : ""}
    ${all.length ? `<details class="lb-all"><summary>All predictions (${all.length})</summary><table class="lb-table">${allRows}</table></details>` : ""}`;

  el.querySelectorAll("tr.gt-row").forEach((row) => {
    const id = row.dataset.id;
    row.addEventListener("click", (e) => { if (!e.target.closest("select, button")) focusItem(id); });
    row.querySelector(".gt-cls").addEventListener("change", (e) => relabelGt(id, e.target.value));
    row.querySelector(".gt-del").addEventListener("click", () => deleteGt(id));
  });
  el.querySelectorAll("tr.pred-row").forEach((row) => {
    const id = row.dataset.id;
    row.addEventListener("click", (e) => { if (!e.target.closest("button")) focusItem(id); });
    const acc = row.querySelector(".pred-accept");
    if (acc) acc.addEventListener("click", () => acceptPrediction(id));
    row.querySelector(".pred-del").addEventListener("click", () => deletePrediction(id));
  });
  bindHover(el);
  updateErrPos();
}

function cmpSwatchLb(m) {
  return `<span class="model-swatch" style="background:${modelColor(m)}" title="${escapeHtml(m)}">${modelLetter(m)}</span>`;
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
    <div class="ep-row">
      <label class="ep-cls-pick">New box
        <span class="cat-color-dot" style="display:inline-block; background:${getCategoryColor(lb.cls)}"></span>
        <select class="guava-select" id="ep-cls" title="Class for new boxes; also relabels the selected box. Keys 1–9.">
          ${classes.map((c, i) => `<option value="${escapeHtml(c)}" ${c === lb.cls ? "selected" : ""}>${i < 9 ? `${i + 1} · ` : ""}${escapeHtml(c)}</option>`).join("")}
          <option value="__new">＋ New class…</option>
        </select></label>
      <button class="secondary-btn" onclick="undoLb()" ${lb.undo.length ? "" : "disabled"} title="Ctrl+Z">↶</button>
      <button class="primary-btn" id="lb-save-btn" onclick="saveLabels()" ${n ? "" : "disabled"} title="Ctrl+S">${n ? `💾 Save (${n})` : "✓ Saved"}</button>
    </div>
    ${state.info && !state.info.can_save_labels ? `<div class="ep-warn">Not loaded from YOLO label files: keep edits with 💾 Workspace or 🔄 Export.</div>` : ""}`;
  el.querySelector("#ep-cls").addEventListener("change", (e) => {
    let name = e.target.value;
    if (name === "__new") {
      name = (prompt("New class name:") || "").trim();
      if (!name) return renderEditPanel();
      if (state.info && !state.info.classes.includes(name)) state.info.classes.push(name);
    }
    setLbClass(name);
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
    lb.tagMode = localStorage.getItem("guava.tagMode") === "full" ? "full" : "num";
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
        // hovering a box shows its full name
        if (lb.view === "overlay" && lb.img) {
          const pt = lbPoint(e), T = lbLayout()[0].T, tol = 3 * dpr();
          const hit = lbItems(state.activeSample).filter((it) => {
            const r = toRect(it.b, T);
            return pt.x >= r.x - tol && pt.x <= r.x + r.w + tol && pt.y >= r.y - tol && pt.y <= r.y + r.h + tol;
          }).sort((a, b) => a.b[2] * a.b[3] - b.b[2] * b.b[3])[0];
          const id = hit ? hit.id : null;
          if (id !== lb.hover) {
            lb.hover = id;
            highlightRow(id);
            drawLightbox();
          }
        }
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
    else if (k === "f" || k === "F") fitBoxes();
    else if (k === "n" || k === "N") stepError(e.shiftKey ? -1 : 1);
    else if (k === "x" || k === "X") toggleErrorsOnly();
    else if (k === "t" || k === "T") setTagMode(lb.tagMode === "num" ? "full" : "num");
    else if (/^[1-9]$/.test(k) && lb.edit) {
      const c = lbClasses()[+k - 1];
      if (c) setLbClass(c);
    }
  });
  window.addEventListener("keyup", (e) => { if (e.key === " ") lb.space = false; });

  new ResizeObserver(() => { if (lightboxOpen()) drawLightbox(); }).observe(wrap);
})();

// Opening the app on a dataset that already has predictions: start the confidence slider at
// the evaluation's operating conf, so the boxes below it (kept for mAP) don't flood the view.
let confInitDone = false;
async function initConfFromEval() {
  confInitDone = true;
  try {
    const d = await api("/api/eval/report");
    state.evalConf = (d.settings && d.settings.conf) || 0;
    if (state.evalConf > 0 && state.minConfidence === 0 && state.info && state.info.prediction_count) {
      setMinConfidence(state.evalConf);
      loadSamples();
    }
  } catch (e) { /* optional */ }
}

// keep the dirty indicator in sync with the server after every dataset info refresh
const _loadDatasetInfoBase = loadDatasetInfo;
loadDatasetInfo = async function () {
  await _loadDatasetInfoBase();
  if (state.info) setDirty(state.info.dirty_count || 0, state.info.eval_stale);
  if (!confInitDone) initConfFromEval();
};

// Toolbar "Show: Label (GT) / Prediction" mirrors the sidebar's Annotation Layers checkboxes
function setLayerVisible(kind, on) {
  if (kind === "gt") state.showGt = on; else state.showPred = on;
  [["layer-gt", "quick-gt"], ["layer-pred", "quick-pred"]][kind === "gt" ? 0 : 1].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.checked = on;
  });
  renderGrid();
  if (state.activeSample) drawLightbox();
}
document.addEventListener("DOMContentLoaded", () => {
  [["quick-gt", "gt"], ["quick-pred", "pred"], ["layer-gt", "gt"], ["layer-pred", "pred"]].forEach(([id, kind]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", (e) => setLayerVisible(kind, e.target.checked));
  });
  // Reset turns both layers back on (app.js resets the sidebar checkboxes)
  const reset = document.getElementById("reset-filters-btn");
  if (reset) reset.addEventListener("click", () => {
    ["quick-gt", "quick-pred"].forEach((id) => { const el = document.getElementById(id); if (el) el.checked = true; });
  });
});

// Grid: Ctrl + mouse wheel over a card zooms into that thumbnail around the cursor
// (plain wheel keeps scrolling the grid); leaving the card resets it.
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("samples-grid");
  if (!grid) return;
  grid.addEventListener("wheel", (e) => {
    if (!e.ctrlKey) return;
    const cv = e.target.closest && e.target.closest(".card-canvas");
    if (!cv) return;
    e.preventDefault();
    const k = Math.min(8, Math.max(1, parseFloat(cv.dataset.zoom || "1") * (e.deltaY < 0 ? 1.25 : 0.8)));
    const r = cv.parentElement.getBoundingClientRect();
    cv.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
    cv.style.transform = k > 1.01 ? `scale(${k})` : "";
    cv.dataset.zoom = k > 1.01 ? k : 1;
  }, { passive: false });
  grid.addEventListener("mouseout", (e) => {
    const wrap = e.target.closest && e.target.closest(".card-canvas-wrap");
    if (!wrap || (e.relatedTarget && wrap.contains(e.relatedTarget))) return;
    const cv = wrap.querySelector(".card-canvas");
    if (cv && cv.dataset.zoom && cv.dataset.zoom !== "1") {
      cv.style.transform = "";
      cv.dataset.zoom = 1;
    }
  });
});
