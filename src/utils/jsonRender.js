export function debounce(fn, wait) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeHtmlAttr(s) {
  // 用于 HTML 属性值：至少需要转义 & 和 "
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
}

/** 行级对比：左右各一行，不一致时加不同底色 */
export function compareLineDiffHtml(prettyA, prettyB) {
  const la = (prettyA || '').split('\n')
  const lb = (prettyB || '').split('\n')
  const n = Math.max(la.length, lb.length)
  let left = ''
  let right = ''
  for (let i = 0; i < n; i++) {
    const lineA = la[i] ?? ''
    const lineB = lb[i] ?? ''
    const diff = lineA !== lineB
    const ca = diff ? 'json-compare-line json-compare-line--a' : 'json-compare-line'
    const cb = diff ? 'json-compare-line json-compare-line--b' : 'json-compare-line'
    left += `<div class="${ca}">${escapeHtml(lineA) || ' '}</div>`
    right += `<div class="${cb}">${escapeHtml(lineB) || ' '}</div>`
  }
  return { left, right }
}

/** 递归 HTML 着色渲染（用于「格式化」Tab） */
export function renderJsonHtml(value, indent = 0) {
  const pad = (d) => '  '.repeat(d)
  if (value === null) return `<span class="json-null" data-copy="null">null</span>`
  if (value === undefined) return `<span class="json-null" data-copy="undefined">undefined</span>`
  const t = typeof value
  if (t === 'string') {
    const json = JSON.stringify(value)
    return `<span class="json-string" data-copy="${escapeHtmlAttr(json)}">${escapeHtml(json)}</span>`
  }
  if (t === 'number') {
    const s = String(value)
    return `<span class="json-number" data-copy="${escapeHtmlAttr(s)}">${escapeHtml(s)}</span>`
  }
  if (t === 'boolean') return `<span class="json-bool" data-copy="${escapeHtmlAttr(String(value))}">${String(value)}</span>`
  if (Array.isArray(value)) {
    if (value.length === 0) return `<span class="json-punct" data-copy="[]">[]</span>`
    const lines = value.map((v, i) => {
      const inner = renderJsonHtml(v, indent + 1)
      const comma = i < value.length - 1 ? '<span class="json-punct" data-copy=",">,</span>' : ''
      return `${pad(indent + 1)}${inner}${comma}`
    })
    return `<span class="json-punct" data-copy="[">[</span>\n${lines.join('\n')}\n${pad(indent)}<span class="json-punct" data-copy="]">]</span>`
  }
  if (t === 'object') {
    const keys = Object.keys(value)
    if (keys.length === 0) return `<span class="json-punct" data-copy="{}">{}</span>`
    const lines = keys.map((k, i) => {
      const inner = renderJsonHtml(value[k], indent + 1)
      const comma = i < keys.length - 1 ? '<span class="json-punct" data-copy=",">,</span>' : ''
      const keyJson = JSON.stringify(k)
      return `${pad(indent + 1)}<span class="json-key" data-copy="${escapeHtmlAttr(keyJson)}">${escapeHtml(keyJson)}</span><span class="json-punct" data-copy=": ">: </span>${inner}${comma}`
    })
    return `<span class="json-punct" data-copy="{">{</span>\n${lines.join('\n')}\n${pad(indent)}<span class="json-punct" data-copy="}">}</span>`
  }
  return ''
}

/** el-tree 数据 */
export function jsonToTreeData(value) {
  function walk(v, label) {
    if (v === null) return { label: `${label}: null` }
    const t = typeof v
    if (t !== 'object') return { label: `${label}: ${JSON.stringify(v)}` }
    if (Array.isArray(v)) {
      if (v.length === 0) return { label: `${label}: []` }
      return {
        label: `${label} [${v.length}]`,
        children: v.map((item, i) => walk(item, `[${i}]`))
      }
    }
    const keys = Object.keys(v)
    if (keys.length === 0) return { label: `${label}: {}` }
    return {
      label: label === 'JSON' ? `{${keys.length}}` : label,
      children: keys.map((k) => walk(v[k], k))
    }
  }
  return [walk(value, 'JSON')]
}
