<template>
  <div class="json-tools-format">
    <el-alert v-if="errorText" type="error" show-icon :title="errorText" class="json-tools-alert" />

    <div class="json-tools-format-toolbar-top">
      <div class="json-tools-toolbar-row">
        <el-checkbox v-model="formatAutoDecode">{{ t('common.autoDecode') }}</el-checkbox>
        <el-checkbox v-model="formatOutputEscaped">{{ t('common.outputEscaped') }}</el-checkbox>
        <div class="json-tools-indent">
          <span class="json-tools-toolbar-label">{{ t('common.indent') }}</span>
          <el-radio-group v-model="formatIndent" size="small">
            <el-radio-button :label="2">{{ t('common.indent2') }}</el-radio-button>
            <el-radio-button :label="4">{{ t('common.indent4') }}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <el-space wrap class="json-tools-toolbar-actions">
        <el-button @click="resetFormat">{{ t('common.reset') }}</el-button>
        <el-button @click="copyCurrentOutput" :disabled="!canCopyFormat">{{ t('common.copy') }}</el-button>
      </el-space>
    </div>

    <div class="json-tools-format-resize" ref="formatResizeWrapRef">
      <section class="json-tools-split-col json-tools-panel--flat" :style="{ flex: `0 0 ${formatLeftWidthPx}px` }">
        <div class="json-tools-panel-body">
          <div class="json-tools-panel-title">{{ t('common.inputJson') }}</div>
          <div class="json-editor">
            <div class="json-editor-gutter" ref="gutterRef">
              <div v-for="line in editorLineCount" :key="line" class="json-editor-line-number">{{ line }}</div>
            </div>
            <div
              ref="editorRef"
              class="json-editor-input"
              contenteditable="true"
              spellcheck="false"
              @input="onEditorInput"
              @keydown="onEditorKeydown"
              @paste="onEditorPaste"
              @scroll="syncEditorScroll"
            />
          </div>
        </div>
      </section>

      <div class="json-tools-resize-handle" @mousedown="startFormatResize" />

      <section class="json-tools-split-col json-tools-panel--flat">
        <div class="json-tools-panel-body json-tools-panel-body-output json-tools-output-panel">
          <div class="json-tools-panel-title">{{ t('common.outputJson') }}</div>
          <el-tabs v-model="formatOutputTab" class="json-output-tabs">
            <el-tab-pane :label="t('tabs.pretty')" name="pretty">
              <div class="json-render-scroll" v-html="formatRenderHtml" @click="handleFormatTokenClick" />
            </el-tab-pane>
            <el-tab-pane :label="t('tabs.minify')" name="minify">
              <el-input
                v-model="minifyOutputText"
                class="json-tools-textarea-full json-tab-textarea"
                type="textarea"
                :autosize="false"
                readonly
              />
            </el-tab-pane>
            <el-tab-pane :label="t('tabs.tree')" name="tree">
              <div class="json-tree-wrap">
                <el-tree
                  v-if="formatTreeData.length"
                  :data="formatTreeData"
                  default-expand-all
                  :props="{ label: 'label', children: 'children' }"
                />
                <div v-else class="json-tree-empty">{{ t('errors.empty') }}</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

import { copyToClipboard } from '../utils/copy.js'
import { compressOutput, formatOutput, parseJsonSmart } from '../utils/jsonTools.js'
import { debounce, jsonToTreeData, renderJsonHtml } from '../utils/jsonRender.js'

const { t } = useI18n()

const errorText = ref('')
const formatInput = ref('')
const formatOutputText = ref('')
const minifyOutputText = ref('')
const formatAutoDecode = ref(true)
const formatOutputEscaped = ref(false)
const formatIndent = ref(2)
const formatOutputTab = ref('pretty')
const parsedJson = ref(null)
const formatTreeData = ref([])
const editorRef = ref(null)
const gutterRef = ref(null)
let isSyncingEditor = false

const formatResizeWrapRef = ref(null)
const formatLeftWidthPx = ref(520)
let formatResizeStop = null

function setError(err) {
  if (!err) return
  if (err.code === 'empty') {
    errorText.value = t('errors.empty')
    return
  }
  errorText.value = t('errors.invalidJson') + (err?.message ? `: ${err.message}` : '')
}

function clearError() {
  errorText.value = ''
}

function clampFormatLeftWidth() {
  const wrap = formatResizeWrapRef.value
  if (!wrap) return
  const rect = wrap.getBoundingClientRect()
  const minLeft = 280
  const minRight = 420
  const maxLeft = Math.max(minLeft, rect.width - minRight)
  formatLeftWidthPx.value = Math.min(maxLeft, Math.max(minLeft, formatLeftWidthPx.value))
}

function normalizeEditorText(s) {
  return String(s ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

function setEditorText(text) {
  const el = editorRef.value
  if (!el) return
  const normalized = normalizeEditorText(text)
  if (normalizeEditorText(el.innerText) === normalized) return
  isSyncingEditor = true
  el.innerText = normalized
  isSyncingEditor = false
}

function onEditorInput() {
  if (isSyncingEditor) return
  const el = editorRef.value
  if (!el) return
  formatInput.value = normalizeEditorText(el.innerText)
}

function onEditorKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    document.execCommand('insertText', false, '  ')
  }
}

function onEditorPaste(e) {
  e.preventDefault()
  const text = e.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

function syncEditorScroll() {
  const editor = editorRef.value
  const gutter = gutterRef.value
  if (!editor || !gutter) return
  gutter.scrollTop = editor.scrollTop
}

function startFormatResize(e) {
  if (window.innerWidth <= 1100) return
  const wrap = formatResizeWrapRef.value
  if (!wrap) return

  const minLeft = 280
  const minRight = 420
  const rect = wrap.getBoundingClientRect()
  const maxLeft = Math.max(minLeft, rect.width - minRight)
  const startX = e.clientX
  const startWidth = formatLeftWidthPx.value
  document.body.style.cursor = 'col-resize'
  e.preventDefault()

  const onMove = (ev) => {
    const dx = ev.clientX - startX
    const next = Math.round(startWidth + dx)
    formatLeftWidthPx.value = Math.min(maxLeft, Math.max(minLeft, next))
  }

  const onUp = () => {
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    if (formatResizeStop) formatResizeStop()
    formatResizeStop = null
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  formatResizeStop = () => {
    document.body.style.cursor = ''
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }
}

onMounted(() => {
  clampFormatLeftWidth()
  window.addEventListener('resize', clampFormatLeftWidth)
  setEditorText(formatInput.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', clampFormatLeftWidth)
  if (formatResizeStop) formatResizeStop()
  formatResizeStop = null
})

function escapeText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
}

const formatRenderHtml = computed(() => {
  if (parsedJson.value === null || parsedJson.value === undefined) {
    return `<div class="json-render-empty">${escapeText(t('errors.empty'))}</div>`
  }
  return `<pre class="json-render-pre">${renderJsonHtml(parsedJson.value)}</pre>`
})

function syncFormatOutputs() {
  clearError()
  const raw = String(formatInput.value ?? '').trim()
  if (!raw) {
    formatOutputText.value = ''
    minifyOutputText.value = ''
    parsedJson.value = null
    formatTreeData.value = []
    return
  }
  try {
    const data = parseJsonSmart(formatInput.value, formatAutoDecode.value)
    formatOutputText.value = formatOutput(data, {
      indent: formatIndent.value,
      outputEscaped: formatOutputEscaped.value
    })
    minifyOutputText.value = compressOutput(data, { outputEscaped: false })
    parsedJson.value = data
    formatTreeData.value = jsonToTreeData(data)
  } catch (e) {
    formatOutputText.value = ''
    minifyOutputText.value = ''
    parsedJson.value = null
    formatTreeData.value = []
    setError(e)
  }
}

const debouncedSyncFormat = debounce(syncFormatOutputs, 280)
watch(
  () => [formatInput.value, formatAutoDecode.value, formatIndent.value, formatOutputEscaped.value],
  () => debouncedSyncFormat(),
  { immediate: true }
)

watch(
  () => formatInput.value,
  (v) => {
    setEditorText(v)
  }
)

const canCopyFormat = computed(() => {
  if (formatOutputTab.value === 'pretty') return !!formatOutputText.value
  if (formatOutputTab.value === 'minify') return !!minifyOutputText.value
  return formatTreeData.value.length > 0
})

const editorLineCount = computed(() => {
  const raw = normalizeEditorText(formatInput.value)
  if (!raw) return 1
  return raw.split('\n').length
})

function resetFormat() {
  formatInput.value = ''
  formatOutputText.value = ''
  minifyOutputText.value = ''
  parsedJson.value = null
  formatTreeData.value = []
  clearError()
}

async function handleFormatTokenClick(e) {
  const target = e?.target?.closest?.('[data-copy]')
  if (!target) return
  const text = target.dataset?.copy
  if (!text) return
  await copyToClipboard(text)
  ElMessage.success(t('common.copy'))
}

async function copyCurrentOutput() {
  try {
    clearError()
    let text = ''
    if (formatOutputTab.value === 'pretty') text = formatOutputText.value
    else if (formatOutputTab.value === 'minify') text = minifyOutputText.value
    else text = parsedJson.value !== null ? JSON.stringify(parsedJson.value, null, 2) : ''
    if (!text) {
      ElMessage.warning(t('errors.empty'))
      return
    }
    await copyToClipboard(text)
    ElMessage.success(t('common.copy'))
  } catch (e) {
    ElMessage.error(t('errors.invalidJson'))
  }
}
</script>

<style scoped>
.json-tools-format {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
}



.json-tools-format-toolbar-top {
  position: sticky;
  z-index: 6;
  padding: 10px 0 8px;
  background: var(--el-fill-color-blank);
}

.json-tools-format-resize {
  display: flex;
  gap: 0;
  flex: 1;
  min-height: 0;
  align-items: stretch;
}

.json-tools-split-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.json-tools-panel--flat {
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  overflow: visible;
}

.json-tools-resize-handle {
  flex: 0 0 8px;
  cursor: col-resize;
  position: relative;
  background: transparent;
}

.json-tools-resize-handle::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 14px;
  bottom: 14px;
  width: 1px;
  background: var(--el-border-color);
  opacity: 0.35;
}

.json-tools-resize-handle:hover::before {
  opacity: 0.65;
}

.json-tools-toolbar-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
}



.json-tools-toolbar-label {
  font-size: 13px;
  color: var(--el-text-color-regular);
  margin-right: 4px;
}

.json-tools-indent {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.json-tools-panel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 12px;
}

.json-tools-panel-title {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.json-tools-textarea-full {
  flex: 1;
  min-height: 0;
}

.json-editor {
  flex: 1;
  min-height: 0;
  display: flex;
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  background: var(--el-fill-color-blank);
  overflow: hidden;
}

.json-editor-gutter {
  width: 52px;
  flex: 0 0 52px;
  padding: 8px 6px;
  border-right: 1px solid var(--el-border-color-lighter);
  color: var(--el-text-color-secondary);
  text-align: right;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  overflow: hidden;
  user-select: none;
}

.json-editor-line-number {
  height: 1.5em;
}

.json-editor-input {
  flex: 1;
  min-height: 200px;
  height: 100%;
  overflow: auto;
  padding: 8px 10px;
  outline: none;
  white-space: pre;
  word-break: normal;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.json-editor-input:empty::before {
  content: '例如：{"a":1,"b":{"c":2}} 或 "{\\"a\\":1}"';
  color: var(--el-text-color-placeholder);
  pointer-events: none;
}

.json-output-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.json-output-tabs :deep(.el-tabs__content) {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.json-output-tabs :deep(.el-tabs__header),
.json-output-tabs :deep(.el-tabs__nav),
.json-output-tabs :deep(.el-tabs__item) {
  border: none;
}

.json-output-tabs :deep(.el-tab-pane) {
  height: 100%;
}

.json-render-scroll {
  min-height: 280px;
  max-height: calc(100vh - 260px);
  overflow: auto;
  border: none;
  border-radius: 0;
  padding: 8px;
  background: transparent;
}

.json-tree-wrap {
  min-height: 280px;
  max-height: calc(100vh - 260px);
  overflow: auto;
  padding: 8px;
  border: none;
  border-radius: 0;
}

.json-tree-empty,
.json-render-empty {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.json-render-empty {
  padding: 12px;
}

.json-render-pre {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.55;
  white-space: pre;
  overflow-wrap: normal;
}

.json-render-pre :deep(.json-key) {
  color: #881391;
}
.json-render-pre :deep(.json-string) {
  color: #c41a16;
}
.json-render-pre :deep(.json-number) {
  color: #1c00cf;
}
.json-render-pre :deep(.json-bool) {
  color: #0d22aa;
}
.json-render-pre :deep(.json-null) {
  color: #808080;
}
.json-render-pre :deep(.json-punct) {
  color: var(--el-text-color-primary);
}

.json-render-pre :deep([data-copy]) {
  cursor: pointer;
  border-radius: 3px;
  padding: 0 2px;
}

.json-render-pre :deep([data-copy]:hover) {
  background: rgba(64, 158, 255, 0.12);
}

@media (max-width: 1100px) {
  .json-tools-format-resize {
    flex-direction: column;
    min-height: auto;
  }

  .json-tools-resize-handle {
    display: none;
  }
}
</style>
