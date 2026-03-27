<template>
  <div>
    <el-alert v-if="errorText" type="error" show-icon :title="errorText" class="json-tools-alert" />

    <div class="json-tools-split json-tools-compare-split">
      <section class="json-tools-split-col json-tools-panel">
        <div class="json-tools-panel-toolbar">
          <el-space wrap>
            <el-button @click="resetCompare">{{ t('common.reset') }}</el-button>
            <el-button @click="copyCompareLeft">{{ t('compare.copyLeft') }}</el-button>
          </el-space>
        </div>
        <div class="json-tools-panel-body json-compare-col">
          <div class="json-tools-panel-title">{{ t('compare.jsonA') }}</div>
          <el-input
            v-model="compareInputA"
            class="json-tools-textarea-full json-compare-input"
            type="textarea"
            :autosize="false"
            placeholder="JSON A"
          />
          <div class="json-tools-panel-title json-compare-subtitle">{{ t('compare.diffPreview') }}</div>
          <div class="json-compare-html json-compare-html-a" v-html="compareHtmlA"></div>
        </div>
      </section>
      <section class="json-tools-split-col json-tools-panel">
        <div class="json-tools-panel-toolbar">
          <el-space wrap>
            <el-button @click="copyCompareRight">{{ t('compare.copyRight') }}</el-button>
          </el-space>
        </div>
        <div class="json-tools-panel-body json-compare-col">
          <div class="json-tools-panel-title">{{ t('compare.jsonB') }}</div>
          <el-input
            v-model="compareInputB"
            class="json-tools-textarea-full json-compare-input"
            type="textarea"
            :autosize="false"
            placeholder="JSON B"
          />
          <div class="json-tools-panel-title json-compare-subtitle">{{ t('compare.diffPreview') }}</div>
          <div class="json-compare-html json-compare-html-b" v-html="compareHtmlB"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

import { copyToClipboard } from '../utils/copy.js'
import { parseJsonSmart } from '../utils/jsonTools.js'
import { compareLineDiffHtml, debounce } from '../utils/jsonRender.js'

const { t } = useI18n()

const errorText = ref('')
const compareInputA = ref('')
const compareInputB = ref('')
const compareHtmlA = ref('')
const compareHtmlB = ref('')

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

function syncCompare() {
  clearError()
  const aRaw = String(compareInputA.value ?? '').trim()
  const bRaw = String(compareInputB.value ?? '').trim()
  if (!aRaw && !bRaw) {
    compareHtmlA.value = ''
    compareHtmlB.value = ''
    return
  }
  try {
    const a = parseJsonSmart(compareInputA.value, true)
    const b = parseJsonSmart(compareInputB.value, true)
    const prettyA = JSON.stringify(a, null, 2)
    const prettyB = JSON.stringify(b, null, 2)
    const { left, right } = compareLineDiffHtml(prettyA, prettyB)
    compareHtmlA.value = left
    compareHtmlB.value = right
  } catch (e) {
    compareHtmlA.value = ''
    compareHtmlB.value = ''
    setError(e)
  }
}

const debouncedSyncCompare = debounce(syncCompare, 300)
watch(
  () => [compareInputA.value, compareInputB.value],
  () => debouncedSyncCompare(),
  { immediate: true }
)

function resetCompare() {
  compareInputA.value = ''
  compareInputB.value = ''
  compareHtmlA.value = ''
  compareHtmlB.value = ''
  clearError()
}

async function copyCompareLeft() {
  try {
    const a = parseJsonSmart(compareInputA.value, true)
    await copyToClipboard(JSON.stringify(a, null, 2))
    ElMessage.success(t('common.copy'))
  } catch (e) {
    ElMessage.error(t('errors.invalidJson'))
  }
}

async function copyCompareRight() {
  try {
    const b = parseJsonSmart(compareInputB.value, true)
    await copyToClipboard(JSON.stringify(b, null, 2))
    ElMessage.success(t('common.copy'))
  } catch (e) {
    ElMessage.error(t('errors.invalidJson'))
  }
}
</script>

<style scoped>
.json-tools-alert {
  margin-bottom: 12px;
}

.json-tools-split {
  display: flex;
  gap: 16px;
  align-items: stretch;
  min-height: calc(100vh - 140px);
}

.json-tools-split-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.json-tools-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  background: var(--el-bg-color);
  overflow: hidden;
}

.json-tools-panel-toolbar {
  flex-shrink: 0;
  padding: 10px 12px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  background: var(--el-fill-color-blank);
}

.json-tools-panel-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 12px;
}

.json-compare-col {
  gap: 8px;
}

.json-tools-panel-title {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 8px;
}

.json-compare-subtitle {
  margin-top: 8px;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--el-text-color-secondary);
}

.json-tools-textarea-full {
  flex: 1;
  min-height: 0;
}

.json-tools-textarea-full :deep(.el-textarea) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.json-compare-input :deep(.el-textarea__inner) {
  min-height: 120px;
  max-height: 200px;
  resize: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 13px;
}

.json-compare-html {
  flex: 1;
  min-height: 160px;
  max-height: calc(100vh - 380px);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  padding: 8px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.45;
  background: var(--el-fill-color-blank);
}

.json-compare-html :deep(.json-compare-line) {
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 1.2em;
}

.json-compare-html-a :deep(.json-compare-line--a) {
  background: rgba(64, 158, 255, 0.18);
}

.json-compare-html-b :deep(.json-compare-line--b) {
  background: rgba(230, 162, 60, 0.22);
}

@media (max-width: 1100px) {
  .json-tools-split {
    flex-direction: column;
    min-height: auto;
  }
}
</style>
