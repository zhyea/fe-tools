export function safeTry(fn) {
  try {
    return fn()
  } catch (e) {
    return undefined
  }
}

function sanitizeLeadingZeroNumberLiterals(text) {
  const isDigit = (c) => c >= '0' && c <= '9'
  const len = text.length

  let out = ''
  let i = 0
  let inStr = false
  let escape = false

  while (i < len) {
    const ch = text[i]

    if (inStr) {
      out += ch
      if (escape) {
        escape = false
      } else if (ch === '\\') {
        escape = true
      } else if (ch === '"') {
        inStr = false
      }
      i++
      continue
    }

    if (ch === '"') {
      inStr = true
      out += ch
      i++
      continue
    }

    // 仅在非字符串区域处理“前导 0 的数字字面量”（如 000、0012、00.1）
    if (ch === '-' || isDigit(ch)) {
      let sign = ''
      if (ch === '-') {
        sign = '-'
        i++
        if (i >= len || !isDigit(text[i])) {
          // 非法 number token，回退到原字符
          out += sign
          continue
        }
      }

      const intStart = i
      while (i < len && isDigit(text[i])) i++
      let integerDigits = text.slice(intStart, i)

      if (integerDigits.length > 1 && integerDigits[0] === '0') {
        integerDigits = integerDigits.replace(/^0+(?=\d)/, '')
        if (!integerDigits) integerDigits = '0'
      }
      out += sign + integerDigits

      // fraction
      if (i < len && text[i] === '.') {
        out += '.'
        i++
        const fracStart = i
        while (i < len && isDigit(text[i])) i++
        out += text.slice(fracStart, i)
      }

      // exponent
      if (i < len && (text[i] === 'e' || text[i] === 'E')) {
        const eChar = text[i]
        i++
        let expSign = ''
        if (i < len && (text[i] === '+' || text[i] === '-')) {
          expSign = text[i]
          i++
        }
        const expStart = i
        while (i < len && isDigit(text[i])) i++
        const expDigits = text.slice(expStart, i)
        if (expDigits.length > 0) {
          out += eChar + expSign + expDigits
        } else {
          // 指数部分不完整：直接放弃本次修正，返回原文
          return text
        }
      }

      continue
    }

    out += ch
    i++
  }

  return out
}

export function parseJsonSmart(input, autoDecode) {
  const raw = String(input ?? '').trim()
  if (!raw) {
    const err = new Error('empty')
    err.code = 'empty'
    throw err
  }

  const first = safeTry(() => JSON.parse(raw))
  if (first !== undefined) {
    // JSON 字符串包了一层："{\"a\":1}" -> first 是字符串，再尝试解析为 JSON
    if (typeof first === 'string') {
      const second = safeTry(() => JSON.parse(first))
      if (second !== undefined) return second
    }
    return first
  }

  // 容错：修复 JSON 不合法数字，如 {"BigIntSupported":000}
  const sanitized = sanitizeLeadingZeroNumberLiterals(raw)
  if (sanitized !== raw) {
    const second = safeTry(() => JSON.parse(sanitized))
    if (second !== undefined) return second
  }

  if (!autoDecode) {
    const err = new Error('invalid')
    err.code = 'invalid'
    throw err
  }

  // 常见场景：{\"a\":1}（没有外层引号），把它当作“JSON 字符串”再解析一层
  const wrapped = safeTry(() => JSON.parse('"' + raw + '"'))
  if (wrapped !== undefined) {
    if (typeof wrapped === 'string') {
      const second = safeTry(() => JSON.parse(wrapped))
      if (second !== undefined) return second
    }
    return wrapped
  }

  const err = new Error('invalid')
  err.code = 'invalid'
  throw err
}

export function formatOutput(data, { indent, outputEscaped }) {
  const formatted = JSON.stringify(data, null, indent)
  if (!outputEscaped) return formatted
  // 输出为“可嵌套”的转义字符串（带外层引号）
  return JSON.stringify(formatted)
}

export function compressOutput(data, { outputEscaped }) {
  const compressed = JSON.stringify(data)
  if (!outputEscaped) return compressed
  return JSON.stringify(compressed)
}

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

export function diffJson(a, b) {
  const diffs = []

  function walk(x, y, path) {
    if (x === y) return
    const xArr = Array.isArray(x)
    const yArr = Array.isArray(y)
    const xObj = isPlainObject(x)
    const yObj = isPlainObject(y)

    if (xArr && yArr) {
      const max = Math.max(x.length, y.length)
      for (let i = 0; i < max; i++) {
        const p = path + '[' + i + ']'
        if (i >= x.length) diffs.push({ path: p, type: 'added', to: y[i] })
        else if (i >= y.length) diffs.push({ path: p, type: 'removed', from: x[i] })
        else walk(x[i], y[i], p)
      }
      return
    }

    if (xObj && yObj) {
      const keys = new Set([...Object.keys(x), ...Object.keys(y)])
      for (const k of keys) {
        const p = path ? path + '.' + k : k
        if (!(k in x)) diffs.push({ path: p, type: 'added', to: y[k] })
        else if (!(k in y)) diffs.push({ path: p, type: 'removed', from: x[k] })
        else walk(x[k], y[k], p)
      }
      return
    }

    // 类型不同或原子值不同
    if (!xArr && !yArr && !xObj && !yObj) {
      diffs.push({ path, type: 'changed', from: x, to: y })
      return
    }

    diffs.push({ path, type: 'changed', from: x, to: y })
  }

  walk(a, b, '$')
  return diffs
}

