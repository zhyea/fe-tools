export async function copyToClipboard(text) {
  const s = String(text ?? '')
  if (!s) return false

  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(s)
    return true
  }

  // 兜底：选择 textarea
  const ta = document.createElement('textarea')
  ta.value = s
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  return ok
}

