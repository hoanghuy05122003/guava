/**
 * 🍈 Guava Native Visual Studio Web Application Engine
 * 100% Pure Vanilla JS + HTML5 Canvas, zero-dependency, ultra-fast.
 */

// Global State
const state = {
  info: null,
  samples: [],
  page: 1,
  limit: 30,
  totalSamples: 0,
  activeSubsets: new Set(),
  activeTags: new Set(),
  activeCategories: new Set(),
  selectedSamples: new Set(),
  minConfidence: 0.0,
  showGt: true,
  showPred: true,
  showLabels: true,
  searchQuery: "",
  sortBy: "default",
  similarTo: "",
  filterIssue: "",
  cmGt: "",
  cmPred: "",
  gridSize: "medium",
  categoryColors: {},
  activeSample: null,
  zoom: 1.0,
  panX: 0,
  panY: 0,
  isPanning: false,
  startX: 0,
  startY: 0,
};

// Deterministic Palette for classes
const COLOR_PALETTE = [
  "#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", 
  "#06b6d4", "#f97316", "#14b8a6", "#6366f1", "#d946ef",
  "#84cc16", "#ef4444", "#a855f7", "#0ea5e9", "#eab308"
];

function getCategoryColor(category) {
  if (!state.categoryColors[category]) {
    const keys = Object.keys(state.categoryColors);
    state.categoryColors[category] = COLOR_PALETTE[keys.length % COLOR_PALETTE.length];
  }
  return state.categoryColors[category];
}

// ── Initialization ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  initEventListeners();
  await loadDatasetInfo();
  await loadSamples();
  loadDiscoveredDatasets();
});

function initEventListeners() {
  // Layer toggles
  document.getElementById("layer-gt").addEventListener("change", (e) => {
    state.showGt = e.target.checked;
    renderGrid();
  });
  document.getElementById("layer-pred").addEventListener("change", (e) => {
    state.showPred = e.target.checked;
    renderGrid();
  });

  // Confidence slider
  const confSlider = document.getElementById("confidence-slider");
  const confVal = document.getElementById("confidence-val");
  confSlider.addEventListener("input", (e) => {
    state.minConfidence = parseFloat(e.target.value);
    confVal.textContent = state.minConfidence.toFixed(2);
    renderGrid();
  });

  // Search input
  const searchInput = document.getElementById("sample-search");
  let searchTimeout = null;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      state.page = 1;
      loadSamples();
    }, 250);
  });

  // Reset filters
  document.getElementById("reset-filters-btn").addEventListener("click", () => {
    state.activeSubsets.clear();
    state.activeTags.clear();
    state.activeCategories.clear();
    state.minConfidence = 0;
    state.searchQuery = "";
    state.similarTo = "";
    state.filterIssue = "";
    state.sortBy = "default";

    document.getElementById("sample-search").value = "";
    document.getElementById("confidence-slider").value = 0;
    document.getElementById("confidence-val").textContent = "0.00";
    document.getElementById("layer-gt").checked = true;
    document.getElementById("layer-pred").checked = true;
    document.getElementById("sort-select").value = "default";
    state.showGt = true;
    state.showPred = true;

    updateFilterUI();
    updateActiveFiltersBar();
    state.page = 1;
    loadSamples();
  });

  // lightbox mouse / keyboard handling lives in editor.js
}

function onSortChange(val) {
  state.sortBy = val;
  state.page = 1;
  loadSamples();
}

// ── API Calls & Data Loading ────────────────────────────────

async function loadDatasetInfo() {
  try {
    const res = await fetch("/api/info");
    const data = await res.json();
    state.info = data;

    // Update Header Pill
    document.getElementById("ds-name").textContent = data.name || "Guava Dataset";
    document.getElementById("ds-count-badge").textContent = `${data.total_samples || 0} samples`;
    document.getElementById("total-samples-count").textContent = data.total_samples || 0;

    // 1. Build Subsets UI
    const subsetsContainer = document.getElementById("subsets-container");
    subsetsContainer.innerHTML = "";
    const subsets = data.subsets || {};
    for (const [subName, count] of Object.entries(subsets)) {
      const chip = document.createElement("div");
      chip.className = `filter-chip ${state.activeSubsets.has(subName) ? 'active' : ''}`;
      chip.id = `subset-chip-${subName}`;
      chip.innerHTML = `
        <span class="chip-label-left">
          <span>📁</span>
          <span>${subName}</span>
        </span>
        <span class="chip-count">${count}</span>
      `;
      chip.addEventListener("click", () => {
        if (state.activeSubsets.has(subName)) {
          state.activeSubsets.delete(subName);
        } else {
          state.activeSubsets.add(subName);
        }
        updateFilterUI();
        updateActiveFiltersBar();
        state.page = 1;
        loadSamples();
      });
      subsetsContainer.appendChild(chip);
    }

    // 2. Build Tags UI
    const tagsContainer = document.getElementById("tags-container");
    tagsContainer.innerHTML = "";
    const tags = data.tags || {};
    const tagKeys = Object.keys(tags);
    document.getElementById("tag-total-count").textContent = tagKeys.length;

    tagKeys.forEach((tagName) => {
      const count = tags[tagName];
      const chip = document.createElement("div");
      chip.className = `filter-chip ${state.activeTags.has(tagName) ? 'active' : ''}`;
      chip.id = `tag-chip-${tagName}`;
      chip.innerHTML = `
        <span class="chip-label-left">
          <span>🏷️</span>
          <span>${tagName}</span>
        </span>
        <span class="chip-count">${count}</span>
      `;
      chip.addEventListener("click", () => {
        if (state.activeTags.has(tagName)) {
          state.activeTags.delete(tagName);
        } else {
          state.activeTags.add(tagName);
        }
        updateFilterUI();
        updateActiveFiltersBar();
        state.page = 1;
        loadSamples();
      });
      tagsContainer.appendChild(chip);
    });

    // 3. Build Categories UI
    const catsContainer = document.getElementById("categories-container");
    catsContainer.innerHTML = "";
    const cats = data.categories || {};
    const catKeys = Object.keys(cats);
    document.getElementById("cat-total-count").textContent = catKeys.length;

    catKeys.forEach((catName) => {
      const count = cats[catName];
      const color = getCategoryColor(catName);
      const chip = document.createElement("div");
      chip.className = `filter-chip ${state.activeCategories.has(catName) ? 'active' : ''}`;
      chip.id = `cat-chip-${catName}`;
      chip.innerHTML = `
        <span class="chip-label-left">
          <span class="cat-color-dot" style="background-color: ${color}"></span>
          <span>${catName}</span>
        </span>
        <span class="chip-count">${count}</span>
      `;
      chip.addEventListener("click", () => toggleCategory(catName));
      catsContainer.appendChild(chip);
    });

    loadFormatsList();
    renderEvalFilters(data);
  } catch (err) {
    console.error("Failed to load dataset info:", err);
  }
}

async function loadSamples() {
  const grid = document.getElementById("samples-grid");
  // renderGrid() replaces the grid contents, so the loading placeholder may be gone
  const loadingEl = document.getElementById("grid-loading");
  if (loadingEl) loadingEl.style.display = "flex";

  try {
    const params = new URLSearchParams({
      page: state.page,
      limit: state.limit,
      subsets: Array.from(state.activeSubsets).join(","),
      tags: Array.from(state.activeTags).join(","),
      category: Array.from(state.activeCategories).join(","),
      search: state.searchQuery,
      sort_by: state.sortBy,
      similar_to: state.similarTo,
      filter_issue: state.filterIssue,
      cm_gt: state.cmGt,
      cm_pred: state.cmPred,
      min_conf: state.minConfidence,
      model: state.activeModel || "",
    });
    if (state.cmp && state.cmp.mode) {
      params.set("cmp", state.cmp.mode);
      params.set("cmp_a", state.cmp.a);
      params.set("cmp_b", state.cmp.b);
    }

    const res = await fetch(`/api/samples?${params}`);
    const data = await res.json();
    state.samples = data.samples || [];
    state.totalSamples = data.total || 0;

    document.getElementById("displayed-count").textContent = state.samples.length;
    document.getElementById("total-samples-count").textContent = data.total || 0;
    document.getElementById("page-info").textContent = `Page ${data.page} of ${data.total_pages || 1}`;
    document.getElementById("prev-page-btn").disabled = data.page <= 1;
    document.getElementById("next-page-btn").disabled = data.page >= (data.total_pages || 1);

    // Count annotations across batch
    let totalGt = 0;
    let totalPred = 0;
    state.samples.forEach(s => {
      totalGt += (s.ground_truth || []).length;
      totalPred += (s.predictions || []).filter(predVisible).length;
    });
    document.getElementById("count-gt").textContent = totalGt;
    document.getElementById("count-pred").textContent = totalPred;

    renderGrid();
    updateSelectionBar();
  } catch (err) {
    console.error("Failed to load samples:", err);
    grid.innerHTML = `<div class="loading-state"><p style="color:#ef4444">Failed to load samples from Guava backend.</p></div>`;
  }
}

// ── Rendering Engine (HTML5 Canvas & Cards) ─────────────────

function renderGrid() {
  const grid = document.getElementById("samples-grid");
  grid.innerHTML = "";

  if (state.samples.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 38px; margin-bottom: 12px;">🍈</div>
        <h3 style="color: var(--text-main); font-size: 16px; margin-bottom: 6px;">No samples found</h3>
        <p style="font-size: 13px;">Try adjusting your search, subset filters, or confidence threshold.</p>
      </div>
    `;
    return;
  }

  state.samples.forEach((sample) => {
    const card = document.createElement("div");
    card.className = "sample-card";
    card.id = `card-${sample.id}`;

    // 1. Checkbox for selection
    const isSelected = state.selectedSamples.has(sample.id);
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.className = "card-select-checkbox";
    chk.checked = isSelected;
    chk.title = "Select sample";
    chk.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSampleSelection(sample.id, chk.checked);
    });
    card.appendChild(chk);

    // 2. Card Header Badges
    const badgeContainer = document.createElement("div");
    badgeContainer.className = "card-badges";
    badgeContainer.style.cssText = "position:absolute; top:8px; right:8px; display:flex; gap:4px; z-index:10;";

    if (sample.similarity !== undefined && sample.id !== state.similarTo) {
      const simBadge = document.createElement("span");
      simBadge.className = "sample-tag-pill";
      simBadge.style.cssText = "background:rgba(59,130,246,0.3); border:1px solid #3b82f6; color:#1d4ed8;";
      simBadge.textContent = `${(sample.similarity * 100).toFixed(0)}% match`;
      badgeContainer.appendChild(simBadge);
    }

    if (sample.subset) {
      const subBadge = document.createElement("span");
      subBadge.className = "sample-tag-pill";
      subBadge.textContent = sample.subset;
      badgeContainer.appendChild(subBadge);
    }

    card.appendChild(badgeContainer);

    // 3. Canvas Container
    const canvasWrap = document.createElement("div");
    canvasWrap.className = "card-canvas-wrap";
    // split view: one 4:3 panel per layer (label + each shown model) side by side
    const panels = state.gridView === "split" ? splitPanels(sample).length : 1;
    canvasWrap.style.cssText = `position:relative; width:100%; aspect-ratio:${4 * panels}/3; background:var(--bg-well); overflow:hidden;`;

    const canvas = document.createElement("canvas");
    canvas.id = `canvas-${sample.id}`;
    canvas.className = "card-canvas";
    canvasWrap.appendChild(canvas);
    card.appendChild(canvasWrap);

    // 4. Card Footer Info
    const info = document.createElement("div");
    info.className = "card-info";
    info.style.cssText = "padding:8px 10px; display:flex; justify-content:space-between; align-items:center;";

    const gtCount = (sample.ground_truth || []).length;
    const predCount = (sample.predictions || []).filter(predVisible).length;

    info.innerHTML = `
      <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:65%;">
        <strong style="color:var(--text-main); font-size:12px;" title="${escapeHtml(sample.filepath)}">${escapeHtml(sample.filename || sample.id)}</strong>
        <span style="display:block; font-size:10px; color:var(--text-dim);">${sample.width}x${sample.height}</span>
      </div>
      <div style="display:flex; gap:6px; font-size:11px;">
        <span style="color:var(--color-gt);" title="Ground Truth">● ${gtCount}</span>
        ${predCount > 0 ? `<span style="color:var(--color-pred);" title="Predictions">▲ ${predCount}</span>` : ''}
        ${evalBadgesHtml(sample)}
      </div>
    `;
    card.appendChild(info);

    // Quick Action: Similar button
    const actionBtn = document.createElement("button");
    actionBtn.className = "action-btn";
    actionBtn.style.cssText = "position:absolute; bottom:36px; right:8px; opacity:0; transition:opacity 0.2s; z-index:12;";
    actionBtn.innerHTML = "🔍 Similar";
    actionBtn.title = "Find similar images in dataset";
    actionBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      findSimilarTo(sample.id);
    });
    card.appendChild(actionBtn);

    card.addEventListener("mouseenter", () => actionBtn.style.opacity = "1");
    card.addEventListener("mouseleave", () => actionBtn.style.opacity = "0");

    // Click to Open Lightbox
    card.addEventListener("click", () => openLightbox(sample));

    grid.appendChild(card);

    // Draw Image & Bboxes on Canvas
    drawSampleCanvas(sample, canvas);
  });
}

function drawSampleCanvas(sample, canvas) {
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = sample.thumb_url || sample.media_url || `/api/media/${encodeURIComponent(sample.id)}`;

  img.onload = () => {
    if (state.gridView === "split") {
      drawSplitCard(sample, canvas, img);  // editor.js
      return;
    }
    // full image, letterboxed by CSS object-fit: contain (never cropped)
    canvas.width = img.naturalWidth || 640;
    canvas.height = img.naturalHeight || 480;

    // Draw base image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw Ground Truth Bounding Boxes
    if (state.showGt && sample.ground_truth) {
      drawDetections(ctx, sample.ground_truth, canvas.width, canvas.height, false);
    }

    // Draw Predicted Bounding Boxes
    if (state.showPred && sample.predictions) {
      drawDetections(ctx, sample.predictions, canvas.width, canvas.height, true);
    }
  };
}

function drawDetections(ctx, detections, imgW, imgH, isPred) {
  detections.forEach((det) => {
    // Check Category filter
    if (state.activeCategories.size > 0 && !state.activeCategories.has(det.label)) {
      return;
    }

    if (isPred && !predVisible(det)) return;

    // Check Confidence filter (ground truth is never hidden by the slider)
    if (isPred && det.confidence !== undefined && det.confidence < state.minConfidence) {
      return;
    }
    if (state.evalOnlyErrors && det.eval === "tp") {
      return;
    }
    const scale = Math.max(1, imgW / 640);

    // Normalize coordinates: support [x, y, w, h] normalized or pixel
    let [x, y, w, h] = det.bounding_box || [0, 0, 0, 0];
    const isNorm = det.is_normalized !== undefined ? det.is_normalized : (x <= 1.0 && y <= 1.0 && w <= 1.0 && h <= 1.0 && (w > 0 || h > 0));
    if (isNorm) {
      x *= imgW;
      y *= imgH;
      w *= imgW;
      h *= imgH;
    }

    const color = getCategoryColor(det.label);
    // several models: keep each model's own color so layers stay distinguishable,
    // FP shows as a thicker box + red label instead
    const ms = isPred ? predStyle(det) : null;
    let borderColor = ms ? ms.color : isPred ? "#f59e0b" : color;
    if (!ms) {
      if (det.eval === "fp") borderColor = "#ef4444";
      else if (det.eval === "fn") borderColor = "#f43f5e";
      else if (det.eval === "tp" && isPred) borderColor = "#22c55e";
    } else if (det.eval === "fn") borderColor = "#f43f5e";

    // Segmentation / OBB polygon outline
    if (det.points && det.points.length > 2) {
      ctx.beginPath();
      det.points.forEach(([px, py], i) => {
        const X = det.is_normalized === false ? px : px * imgW;
        const Y = det.is_normalized === false ? py : py * imgH;
        if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.closePath();
      ctx.fillStyle = `${borderColor}33`;
      ctx.fill();
    }

    // Draw Rectangle
    ctx.lineWidth = (det.eval === "fn" || det.eval === "fp" ? 3.5 : 2.5) * scale;
    ctx.strokeStyle = borderColor;
    if (isPred) {
      ctx.setLineDash((ms ? ms.dash : [4, 4]).map((v) => v * scale));
    } else {
      ctx.setLineDash([]);
    }
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);

    // Fill subtle semi-transparent background
    ctx.fillStyle = `${borderColor}22`;
    ctx.fillRect(x, y, w, h);

    // Draw Label Badge (preds above the box, GT below it, so both stay readable)
    if (state.showLabels) {
      ctx.font = `bold ${Math.round(13 * scale)}px system-ui, sans-serif`;
      // GT·label for the ground truth, A·label for model A, so the two never look alike
      let text = isPred ? `${ms ? ms.tag : det.model ? modelLetter(det.model) : "P"}·${det.label}` : `GT·${det.label}`;
      if (isPred && det.confidence !== undefined) {
        text += ` ${(det.confidence * 100).toFixed(0)}%`;
      }
      if (det.eval && det.eval !== "tp") text += ` ${det.eval.toUpperCase()}`;

      const textMetrics = ctx.measureText(text);
      const bgW = textMetrics.width + 10 * scale;
      const bgH = 20 * scale;
      const by = isPred ? Math.max(0, y - bgH) : Math.min(imgH - bgH, y + h);

      ctx.fillStyle = ms && det.eval === "fp" ? "#ef4444" : borderColor;
      ctx.fillRect(x, by, bgW, bgH);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, x + 5 * scale, by + bgH - 5 * scale);
    }
  });
}

// Lightbox viewer / label editor: see editor.js

// ── Sample Modifications ────────────────────────────────────

async function addTagToCurrentSample() {
  if (!state.activeSample) return;
  const tag = prompt(`Enter tag to add to '${state.activeSample.id}':`);
  if (!tag || !tag.trim()) return;

  try {
    const res = await fetch("/api/samples/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "tag",
        sample_ids: [state.activeSample.id],
        tag_name: tag.trim(),
      })
    });
    const result = await res.json();
    if (result.status === "ok") {
      state.activeSample.tags = (state.activeSample.tags || []).concat(tag.trim());
      await loadDatasetInfo();
      renderGrid();
    }
  } catch (err) {
    alert("Failed to add tag: " + err.message);
  }
}

async function deleteCurrentSample() {
  if (!state.activeSample) return;
  if (!confirm(`Delete sample '${state.activeSample.id}' from dataset?`)) return;

  try {
    const res = await fetch("/api/samples/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete",
        sample_ids: [state.activeSample.id],
      })
    });
    const result = await res.json();
    if (result.status === "ok") {
      closeLightbox();
      await loadDatasetInfo();
      await loadSamples();
    }
  } catch (err) {
    alert("Failed to delete sample: " + err.message);
  }
}

// ── Selection & Batch Actions ───────────────────────────────

function toggleSampleSelection(sampleId, isChecked) {
  if (isChecked) {
    state.selectedSamples.add(sampleId);
  } else {
    state.selectedSamples.delete(sampleId);
  }
  updateSelectionBar();
}

function toggleSelectAll(isChecked) {
  if (isChecked) {
    state.samples.forEach(s => state.selectedSamples.add(s.id));
  } else {
    state.selectedSamples.clear();
  }
  renderGrid();
  updateSelectionBar();
}

function clearSelection() {
  state.selectedSamples.clear();
  document.getElementById("select-all-checkbox").checked = false;
  renderGrid();
  updateSelectionBar();
}

function updateSelectionBar() {
  const bar = document.getElementById("selection-bar");
  const count = state.selectedSamples.size;
  if (count > 0) {
    bar.style.display = "flex";
    document.getElementById("selected-count-badge").textContent = count;
    document.getElementById("convert-selected-count").textContent = count;
  } else {
    bar.style.display = "none";
  }
}

async function openBatchTagPrompt() {
  const tag = prompt(`Enter tag to apply to ${state.selectedSamples.size} selected samples:`);
  if (!tag || !tag.trim()) return;

  try {
    const res = await fetch("/api/samples/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "tag",
        sample_ids: Array.from(state.selectedSamples),
        tag_name: tag.trim(),
      })
    });
    const result = await res.json();
    alert(`✅ Tagged ${result.affected} samples with '${tag.trim()}'!`);
    clearSelection();
    await loadDatasetInfo();
    await loadSamples();
  } catch (err) {
    alert("Batch tag failed: " + err.message);
  }
}

async function batchDeleteSelected() {
  const count = state.selectedSamples.size;
  if (!confirm(`Permanently delete ${count} selected samples from active dataset?`)) return;

  try {
    const res = await fetch("/api/samples/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete",
        sample_ids: Array.from(state.selectedSamples),
      })
    });
    const result = await res.json();
    alert(`🗑️ Deleted ${result.affected} samples!`);
    clearSelection();
    await loadDatasetInfo();
    await loadSamples();
  } catch (err) {
    alert("Batch delete failed: " + err.message);
  }
}

function openExportSelected() {
  document.getElementById("convert-scope").value = "selected";
  openModal("converter");
}

// ── Similarity Search & Filters ─────────────────────────────

function findSimilarTo(sampleId) {
  state.similarTo = sampleId;
  state.page = 1;
  updateActiveFiltersBar();
  loadSamples();
}

function findSimilarToCurrentSample() {
  if (!state.activeSample) return;
  findSimilarTo(state.activeSample.id);
  closeLightbox();
}

function filterByIssue(issue) {
  state.filterIssue = issue;
  state.page = 1;
  closeModal("validator");
  updateActiveFiltersBar();
  loadSamples();
}

function updateActiveFiltersBar() {
  const bar = document.getElementById("active-filters-bar");
  bar.innerHTML = "";
  let hasFilters = false;

  if (state.similarTo) {
    hasFilters = true;
    const chip = document.createElement("span");
    chip.className = "filter-chip-active";
    chip.innerHTML = `<span>🔍 Similar to: <strong>${state.similarTo}</strong></span> <span class="filter-chip-remove" onclick="removeSimilarFilter()">&times;</span>`;
    bar.appendChild(chip);
  }

  if (state.filterIssue) {
    hasFilters = true;
    const chip = document.createElement("span");
    chip.className = "filter-chip-active";
    chip.style.borderColor = "#ef4444";
    chip.style.color = "#b91c1c";
    chip.innerHTML = `<span>⚠️ Issue: <strong>${state.filterIssue}</strong></span> <span class="filter-chip-remove" onclick="removeIssueFilter()">&times;</span>`;
    bar.appendChild(chip);
  }

  if (state.cmGt && state.cmPred) {
    hasFilters = true;
    const chip = document.createElement("span");
    chip.className = "filter-chip-active";
    chip.style.borderColor = "#f59e0b";
    chip.innerHTML = `<span>🧮 GT <strong>${escapeHtml(state.cmGt)}</strong> → Pred <strong>${escapeHtml(state.cmPred)}</strong></span> <span class="filter-chip-remove" onclick="removeConfusionFilter()">&times;</span>`;
    bar.appendChild(chip);
  }

  if (state.cmp && state.cmp.mode) {
    hasFilters = true;
    const chip = document.createElement("span");
    chip.className = "filter-chip-active";
    chip.style.borderColor = "#3b82f6";
    chip.innerHTML = `<span>⚖️ <strong>${escapeHtml(compareChipLabel())}</strong></span> <span class="filter-chip-remove" onclick="removeCompareFilter()">&times;</span>`;
    bar.appendChild(chip);
  }

  if (state.activeCategories.size) {
    hasFilters = true;
    const chip = document.createElement("span");
    chip.className = "filter-chip-active";
    chip.style.borderColor = "#8b5cf6";
    chip.title = "Boxes of other classes are hidden";
    chip.innerHTML = `<span>🎨 Class: <strong>${[...state.activeCategories].map(escapeHtml).join(", ")}</strong></span> <span class="filter-chip-remove" onclick="clearCategoryFilter()">&times;</span>`;
    bar.appendChild(chip);
  }

  bar.style.display = hasFilters ? "flex" : "none";
}

/** Class chips: keep the images that have one of the chosen classes and draw only those classes' boxes. */
function toggleCategory(name) {
  if (state.activeCategories.has(name)) state.activeCategories.delete(name);
  else state.activeCategories.add(name);
  updateFilterUI();
  updateActiveFiltersBar();
  state.page = 1;
  loadSamples();
}

function clearCategoryFilter() {
  state.activeCategories.clear();
  updateFilterUI();
  updateActiveFiltersBar();
  state.page = 1;
  loadSamples();
}

function removeSimilarFilter() {
  state.similarTo = "";
  updateActiveFiltersBar();
  state.page = 1;
  loadSamples();
}

function removeIssueFilter() {
  state.filterIssue = "";
  updateActiveFiltersBar();
  state.page = 1;
  loadSamples();
}

// ── Modals & Actions ────────────────────────────────────────

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function openModal(id) {
  const m = document.getElementById(`modal-${id}`);
  if (m) m.style.display = "flex";
  if (id === "load-dataset") {
    loadDiscoveredDatasets();
  }
  if (id === "validator") loadAuditResults();
  if (id === "model") openModelPanel();
  if (id === "eval") loadEvalReport();
  if (id === "compare") openCompare();  // compare.js
  if (id === "converter") {
    document.getElementById("convert-selected-count").textContent = state.selectedSamples.size;
  }
}

function closeModal(id) {
  const m = document.getElementById(`modal-${id}`);
  if (m) m.style.display = "none";
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-backdrop")) {
    e.target.style.display = "none";
  }
});

// ── Discovered Datasets & Instant Load ───────────────────────
let discoveredDatasetsCache = [];

async function loadDiscoveredDatasets() {
  const container = document.getElementById("discovered-datasets-container");
  if (!container) return;

  try {
    const res = await fetch("/api/dataset/discover");
    const data = await res.json();
    discoveredDatasetsCache = data.datasets || [];
    renderDiscoveredDatasets(discoveredDatasetsCache);

    // Pre-fill path input if empty
    const pathInput = document.getElementById("load-dataset-path");
    if (pathInput && (!pathInput.value || pathInput.value.trim() === "" || pathInput.value.includes("my_dataset"))) {
      if (discoveredDatasetsCache.length > 0) {
        pathInput.value = discoveredDatasetsCache[0].path;
      } else {
        pathInput.value = "D:\\data\\Wits\\coils_v1";
      }
    }
  } catch (err) {
    if (container) {
      container.innerHTML = `<div style="padding:14px; color:#ef4444; font-size:12px; text-align:center;">Failed to scan disks: ${escapeHtml(err.message)}</div>`;
    }
  }
}

function renderDiscoveredDatasets(list) {
  const container = document.getElementById("discovered-datasets-container");
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:12px;">No matching datasets found on disk. Enter a path below or use Browse.</div>`;
    return;
  }

  container.innerHTML = list.map(d => {
    const fmt = (d.format || "yolo").toLowerCase();
    const safePath = d.path.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    return `
      <div class="discovered-item" onclick="selectDiscoveredPath('${safePath}', '${fmt}')" style="cursor:pointer;" title="Click to select this dataset">
        <div class="discovered-item-info">
          <div class="discovered-item-title">
            <span style="font-size:14px;">📦</span>
            <span>${escapeHtml(d.name)}</span>
            <span class="fmt-badge ${fmt}">${fmt.toUpperCase()}</span>
            <span class="samples-badge">${d.sample_count} samples</span>
          </div>
          <div class="discovered-item-path" title="${escapeHtml(d.path)}">${escapeHtml(d.path)}</div>
        </div>
        <button class="btn-quick-load" onclick="event.stopPropagation(); quickLoadDataset('${safePath}', '${fmt}')" title="Instantly load into studio">
          ⚡ Load
        </button>
      </div>
    `;
  }).join("");
}

function filterDiscoveredDatasets(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) {
    renderDiscoveredDatasets(discoveredDatasetsCache);
    return;
  }
  const filtered = discoveredDatasetsCache.filter(d => 
    (d.name && d.name.toLowerCase().includes(q)) ||
    (d.path && d.path.toLowerCase().includes(q)) ||
    (d.format && d.format.toLowerCase().includes(q))
  );
  renderDiscoveredDatasets(filtered);
}

function selectDiscoveredPath(path, fmt) {
  const pathInput = document.getElementById("load-dataset-path");
  if (pathInput) pathInput.value = path;
  const fmtSelect = document.getElementById("load-dataset-format");
  if (fmtSelect && fmt) fmtSelect.value = fmt;
}

function quickLoadPreset(path, format) {
  const pathInput = document.getElementById("load-dataset-path");
  if (pathInput) pathInput.value = path;
  const fmtSelect = document.getElementById("load-dataset-format");
  if (fmtSelect && format) fmtSelect.value = format;
  executeLoadDataset();
}

function quickLoadDataset(path, format) {
  const pathInput = document.getElementById("load-dataset-path");
  if (pathInput) pathInput.value = path;
  const fmtSelect = document.getElementById("load-dataset-format");
  if (fmtSelect && format) fmtSelect.value = format;
  executeLoadDataset();
}

// 📂 Load Dataset Action
async function executeLoadDataset() {
  let path = document.getElementById("load-dataset-path").value.trim();
  const fmt = document.getElementById("load-dataset-format").value;
  const statusEl = document.getElementById("load-dataset-status");
  const submitBtn = document.getElementById("btn-load-dataset-submit");

  // Fallback to real existing dataset if empty
  if (!path) {
    if (discoveredDatasetsCache.length > 0) {
      path = discoveredDatasetsCache[0].path;
    } else {
      path = "D:\\data\\Wits\\coils_v1";
    }
    document.getElementById("load-dataset-path").value = path;
  }

  statusEl.innerHTML = `<span style="color:#0369a1; display:inline-flex; align-items:center; gap:6px;"><span class="spinner" style="width:14px; height:14px; display:inline-block;"></span> Loading dataset into Guava engine...</span>`;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
    submitBtn.textContent = "⏳ Loading...";
  }

  try {
    const res = await fetch("/api/dataset/load", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, format: fmt || null })
    });
    const result = await res.json();
    if (result.status === "ok") {
      statusEl.innerHTML = `<span style="color:#10b981; font-weight:600;">✅ ${escapeHtml(result.message)}</span>`;
      setTimeout(async () => {
        closeModal("load-dataset");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.textContent = "⚡ Load into Studio";
        }
        state.page = 1;
        state.selectedSamples.clear();
        await loadDatasetInfo();
        await loadSamples();
      }, 500);
    } else {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.textContent = "⚡ Load into Studio";
      }
      statusEl.innerHTML = `<span style="color:#ef4444; font-weight:600;">❌ ${escapeHtml(result.message || "Failed to load dataset")}</span>`;
    }
  } catch (err) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.textContent = "⚡ Load into Studio";
    }
    statusEl.innerHTML = `<span style="color:#ef4444;">Error: ${escapeHtml(err.message)}</span>`;
  }
}

// 📂 Folder Browser Logic
let currentBrowserPath = "D:\\data";
let browserParentPath = "D:\\";

let browserTargetInput = "load-dataset-path";

async function openFolderBrowser(targetId) {
  browserTargetInput = targetId || "load-dataset-path";
  const m = document.getElementById("modal-folder-browser");
  if (m) m.style.display = "flex";
  const currentInput = document.getElementById(browserTargetInput).value.trim();
  if (currentInput && currentInput !== "demo") {
    currentBrowserPath = currentInput;
  } else {
    currentBrowserPath = "D:\\data";
  }
  await browseToDirectory(currentBrowserPath);
}

async function browseToDirectory(dirPath) {
  const listEl = document.getElementById("browser-items-list");
  const pathInput = document.getElementById("browser-current-path");
  if (pathInput) pathInput.value = dirPath || "D:\\data";
  if (listEl) listEl.innerHTML = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:12px;">Loading directory...</div>`;

  try {
    const res = await fetch(`/api/browse?path=${encodeURIComponent(dirPath || "")}`);
    const data = await res.json();
    if (data.error) {
      if (listEl) listEl.innerHTML = `<div style="padding:16px; color:#ef4444; font-size:12px;">Error: ${escapeHtml(data.error)}</div>`;
      return;
    }
    currentBrowserPath = data.current || dirPath;
    browserParentPath = data.parent || "";
    if (pathInput) pathInput.value = currentBrowserPath;

    if (!data.items || data.items.length === 0) {
      if (listEl) listEl.innerHTML = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:12px;">Folder is empty</div>`;
      return;
    }

    if (listEl) {
      listEl.innerHTML = data.items.map(item => {
        const safePath = item.path.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
        if (item.is_dir) {
          return `
            <div class="browser-item is-dir" onclick="browseToDirectory('${safePath}')">
              <div class="browser-item-left">
                <span style="color:#b7791f; font-size:14px;">📁</span>
                <span>${escapeHtml(item.name)}</span>
              </div>
              <span style="font-size:11px; color:#0369a1;">Open &rarr;</span>
            </div>
          `;
        } else {
          return `
            <div class="browser-item" onclick="selectBrowserItem('${safePath}')">
              <div class="browser-item-left">
                <span style="color:#6b7a5e; font-size:14px;">📄</span>
                <span>${escapeHtml(item.name)}</span>
              </div>
              <span style="font-size:10px; color:var(--text-muted);">Select</span>
            </div>
          `;
        }
      }).join("");
    }
  } catch (err) {
    if (listEl) listEl.innerHTML = `<div style="padding:16px; color:#ef4444; font-size:12px;">Network error: ${escapeHtml(err.message)}</div>`;
  }
}

function browseUpDirectory() {
  if (browserParentPath) {
    browseToDirectory(browserParentPath);
  } else {
    browseToDirectory("");
  }
}

function selectCurrentBrowserFolder() {
  if (currentBrowserPath) {
    document.getElementById(browserTargetInput).value = currentBrowserPath;
    closeModal("folder-browser");
  }
}

function selectBrowserItem(filePath) {
  document.getElementById(browserTargetInput).value = filePath;
  closeModal("folder-browser");
  if (browserTargetInput === "model-path") inspectModel();
}

// 🔄 Format Converter Exec
async function executeConvert() {
  const fmt = document.getElementById("convert-target-fmt").value;
  const outDir = document.getElementById("convert-output-dir").value.trim() || `exported_${fmt}`;
  const scope = document.getElementById("convert-scope").value;

  const sampleIds = scope === "selected" ? Array.from(state.selectedSamples) : null;

  try {
    const res = await fetch("/api/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        format: fmt,
        output_dir: outDir,
        sample_ids: sampleIds,
      })
    });
    const result = await res.json();
    alert(`✅ ${result.message || "Export successful!"}`);
    closeModal("converter");
  } catch (err) {
    alert("Export failed: " + err.message);
  }
}

// 📊 Quality Audit Logic
async function loadAuditResults() {
  const container = document.getElementById("audit-results-container");
  if (!container) return;
  container.innerHTML = "<p style='color:#6b7a5e'>Running full dataset health inspection...</p>";

  try {
    const res = await fetch("/api/audit");
    const report = await res.json();

    const isClean = report.is_clean;
    container.innerHTML = `
      <div class="audit-item ${isClean ? 'success' : 'warning'}">
        <span class="audit-badge">${isClean ? 'PASS' : 'WARN'}</span>
        <span class="audit-title">Overall Quality Health</span>
        <p>${isClean ? 'All samples and bounding boxes passed health checks.' : 'Issues found in dataset.'}</p>
      </div>

      <div class="audit-item ${report.missing_media_count === 0 ? 'success' : 'danger'}">
        <span class="audit-badge">${report.missing_media_count === 0 ? 'PASS' : 'FAIL'}</span>
        <span class="audit-title">Media Integrity on Disk</span>
        <p>${report.missing_media_count === 0 ? 'All media items exist on disk.' : `${report.missing_media_count} missing media files detected!`}</p>
        ${report.missing_media_count > 0 ? `<button class="audit-action-btn" onclick="filterByIssue('missing_media')">Filter ${report.missing_media_count} Missing Media Samples</button>` : ''}
      </div>

      <div class="audit-item ${report.degenerate_bboxes_count === 0 ? 'success' : 'danger'}">
        <span class="audit-badge">${report.degenerate_bboxes_count === 0 ? 'PASS' : 'FAIL'}</span>
        <span class="audit-title">Bounding Box Geometry Check</span>
        <p>${report.degenerate_bboxes_count === 0 ? 'Zero invalid or negative bboxes found.' : `${report.degenerate_bboxes_count} degenerate bboxes found (w or h <= 0).`}</p>
        ${report.degenerate_bboxes_count > 0 ? `<button class="audit-action-btn" onclick="filterByIssue('degenerate')">Inspect ${report.degenerate_bboxes_count} Degenerate Samples</button>` : ''}
      </div>

      <div class="audit-item ${report.unannotated_samples_count === 0 ? 'success' : 'warning'}">
        <span class="audit-badge">${report.unannotated_samples_count === 0 ? 'PASS' : 'NOTE'}</span>
        <span class="audit-title">Unannotated Samples</span>
        <p>${report.unannotated_samples_count === 0 ? 'All samples have annotations.' : `${report.unannotated_samples_count} samples have 0 annotations.`}</p>
        ${report.unannotated_samples_count > 0 ? `<button class="audit-action-btn" onclick="filterByIssue('unannotated')">Filter Unannotated Samples</button>` : ''}
      </div>

      <div class="audit-item success">
        <span class="audit-badge">INFO</span>
        <span class="audit-title">Dataset Summary</span>
        <p>Total Samples: ${report.total_samples || 0} | Total Annotations: ${report.total_annotations || 0} | Categories: ${report.categories_count || 0}</p>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:#ef4444">Failed to run audit: ${err.message}</p>`;
  }
}

// 🧠 Brain AI Live Functions
async function runLiveDuplicateScan() {
  const statusEl = document.getElementById("brain-scan-result");
  const listEl = document.getElementById("brain-duplicates-list");
  const tagBtn = document.getElementById("btn-tag-duplicates");
  if (statusEl) statusEl.textContent = "Scanning perceptual image hashes (dHash)...";

  try {
    const res = await fetch("/api/brain/duplicates?threshold=5");
    const data = await res.json();
    if (statusEl) {
      statusEl.textContent = `Found ${data.count} duplicate clusters.`;
    }
    if (tagBtn) tagBtn.style.display = data.count > 0 ? "inline-block" : "none";

    if (listEl) {
      if (data.count === 0) {
        listEl.innerHTML = "<p style='color:#10b981; font-size:13px; margin-top:8px;'>✅ No near-duplicate images detected (clean dataset)!</p>";
      } else {
        listEl.innerHTML = data.duplicates.map(d => `
          <div style="background:var(--bg-well); padding:10px 14px; border-radius:6px; margin-top:8px; font-size:12px; border-left:3px solid #f59e0b;">
            <strong style="color:#f59e0b">Cluster #${d.group_id} (${d.count} images):</strong>
            <div style="margin-top:4px; color:#3d4a33;">${d.sample_ids.join(", ")}</div>
          </div>
        `).join("");
      }
    }
  } catch (err) {
    if (statusEl) statusEl.textContent = "Scan error: " + err.message;
  }
}

async function tagAllDuplicates() {
  try {
    const res = await fetch("/api/brain/tag_duplicates", { method: "POST" });
    const data = await res.json();
    alert(`🏷️ Tagged ${data.tagged_count} duplicate samples with 'duplicate'!`);
    closeModal("brain");
    await loadDatasetInfo();
    await loadSamples();
  } catch (err) {
    alert("Tag duplicates failed: " + err.message);
  }
}

async function runComputeUniqueness() {
  const resultEl = document.getElementById("uniqueness-result");
  if (resultEl) resultEl.textContent = "Calculating uniqueness scores...";

  try {
    const res = await fetch("/api/brain/compute_uniqueness", { method: "POST" });
    const data = await res.json();
    if (resultEl) resultEl.textContent = `✅ Computed for ${data.scores_count} samples!`;
    document.getElementById("sort-select").value = "uniqueness_desc";
    state.sortBy = "uniqueness_desc";
    closeModal("brain");
    state.page = 1;
    await loadSamples();
  } catch (err) {
    if (resultEl) resultEl.textContent = "Error: " + err.message;
  }
}

async function loadFormatsList() {
  try {
    const res = await fetch("/api/formats");
    const formats = await res.json();
    const container = document.getElementById("formats-chips");
    if (!container) return;
    container.innerHTML = "";
    formats.forEach(fmt => {
      const chip = document.createElement("div");
      chip.className = "format-chip-item";
      chip.textContent = fmt;
      container.appendChild(chip);
    });
  } catch (e) {
    // Fallback static list
    const defaults = ["coco", "yolo", "voc", "cvat", "labelme", "cityscapes", "kitti", "imagenet", "cifar10", "open_images", "ade20k", "roboflow", "sam"];
    const container = document.getElementById("formats-chips");
    if (container) {
      container.innerHTML = defaults.map(d => `<div class="format-chip-item">${d}</div>`).join("");
    }
  }
}

// ── UI Helpers ──────────────────────────────────────────────

function setGridSize(size) {
  state.gridSize = size;
  const grid = document.getElementById("samples-grid");
  grid.className = size === "large" ? "grid-large" : "grid-medium";
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === size);
  });
}

function toggleLabels() {
  state.showLabels = !state.showLabels;
  document.getElementById("toggle-labels-btn").textContent = `Labels: ${state.showLabels ? 'ON' : 'OFF'}`;
  renderGrid();
  if (state.activeSample) drawLightbox();
}

function changePage(delta) {
  state.page += delta;
  loadSamples();
}

function updateFilterUI() {
  document.querySelectorAll("#subsets-container .filter-chip").forEach(chip => {
    const name = chip.id.replace("subset-chip-", "");
    chip.classList.toggle("active", state.activeSubsets.has(name));
  });

  document.querySelectorAll("#tags-container .filter-chip").forEach(chip => {
    const name = chip.id.replace("tag-chip-", "");
    chip.classList.toggle("active", state.activeTags.has(name));
  });

  document.querySelectorAll("#categories-container .filter-chip").forEach(chip => {
    const name = chip.id.replace("cat-chip-", "");
    chip.classList.toggle("active", state.activeCategories.has(name));
  });
}
