<template>
  <el-container class="json-tools-page">
    <el-header height="64px" class="json-tools-header">
      <div class="json-tools-header-left">
        <div class="json-tools-brand">{{ t('appTitle') }}</div>
        <el-menu
          :default-active="activeTool"
          mode="horizontal"
          :ellipsis="false"
          background-color="#ffffff"
          text-color="#303133"
          active-text-color="#409EFF"
          class="json-tools-top-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="format">{{ t('menu.format') }}</el-menu-item>
          <el-menu-item index="compare">{{ t('menu.compare') }}</el-menu-item>
        </el-menu>
      </div>

      <div class="json-tools-header-right">
        <span class="json-tools-lang-label">{{ t('common.language') }}</span>
        <el-select v-model="selectedLocale" size="small" style="width: 180px">
          <el-option v-for="opt in localeOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
      </div>
    </el-header>

    <el-main class="json-tools-main">
      <FormatView v-if="activeTool === 'format'" />
      <CompareView v-else />
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { LOCALES } from '../i18n/messages.js'
import FormatView from '../views/FormatView.vue'
import CompareView from '../views/CompareView.vue'

const { t, locale } = useI18n()

const localeOptions = LOCALES
const selectedLocale = computed({
  get: () => locale.value,
  set: (v) => {
    locale.value = v
  }
})

const activeTool = ref('format')
function handleMenuSelect(index) {
  activeTool.value = index
}
</script>

<style scoped>
.json-tools-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #ebeef5;
  position: sticky;
  top: 0;
  z-index: 10;
}

.json-tools-header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
  flex: 1;
}

.json-tools-top-menu {
  flex: 1;
  min-width: 0;
  border-bottom: none !important;
}

.json-tools-top-menu :deep(.el-menu--horizontal) {
  flex-wrap: nowrap;
}

.json-tools-brand {
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
}

.json-tools-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.json-tools-lang-label {
  font-size: 12px;
  color: #606266;
}

.json-tools-page {
  padding: 0;
  min-height: 100vh;
}

.json-tools-main {
  padding: 16px;
  box-sizing: border-box;
  min-height: calc(100vh - 64px);
}
</style>
