import 'whatwg-fetch'

export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_FIN = 'FETCH_FIN'

export const getUrlParams = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return ''
}

export const get = async (url, params = {}, method) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  })
  let queryUrl = url.indexOf('?') < 0 ? url + '?' : url
  for (let str in params) {
    queryUrl += `${str}=${params[str]}&`
  }
  let d = {}
  let r = {}
  try {
    d = (await fetch(queryUrl, {
      method: method ? method.toUpperCase() : 'GET',
      credentials: 'same-origin',
      headers: headers
    }))
    if (d.status === 200) {
      r = await d.json()
      if (r.code === 200) {
        return r.data || true
      }
    } else {
      toast(d.statusText)
    }
  } catch (e) {
    toast(e)
  }
}

export const post = async (url, params = {}, method) => {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=UTF-8'
  })
  let d = {}
  let r = {}
  try {
    d = (await fetch(url, {
      method: method ? method.toUpperCase() : 'POST',
      credentials: 'same-origin',
      headers: headers,
      body: JSON.stringify(params)
    }))
    if (d.status === 200) {
      r = await d.json()
      if (r.code === 200) {
        return r.data || true
      }
    } else {
      toast(d.statusText)
    }
  } catch (e) {
    toast(e)
  }
}

export const fetchData = (action, params = {}) => {
  let [method, url] = action.split(' ')
  if (url.indexOf('/') !== 0) {
    url = '/' + url
  }

  for (let v in params) {
    if (params[v] === null) {
      delete params[v]
    }
  }
  if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
    return get(url, params, method)
  } else {
    return post(url, params, method)
  }
}

export const asyncFetch = async function (url, params = {}, cbDone, cbFail) {
  let flag = arguments.length < 4
  let p = flag ? {} : params
  let done = flag ? params : cbDone
  let fail = flag ? cbDone : cbFail
  try {
    const d = await fetchData(url, p)
    if (d) {
      done && done(d)
    } else {
      fail && fail()
    }
  } catch (e) {
    fail && fail()
  }
}

export const fetchFail = (state, action) => {
  return state
}

export const fetchFin = (state, action) => {
  return state
}

export const getDate = (nDate = (new Date()), fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const sDate = new Date(nDate)
  const dateObj = {
    'M+': sDate.getMonth() + 1,
    'd+': sDate.getDate(),
    'h+': sDate.getHours(),
    'm+': sDate.getMinutes(),
    's+': sDate.getSeconds(),
    'q+': Math.floor((sDate.getMonth() + 3) / 3),
    'S': sDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (sDate.getFullYear() + '')
      .substr(4 - RegExp.$1.length))
  }
  for (const s in dateObj) {
    if (new RegExp('(' + s + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? (dateObj[s])
        : (('00' + dateObj[s]).substr(('' + dateObj[s]).length)))
    }
  }
  return fmt
}

export const getNumber = (number = 0, dot = 2, min, max) => {
  if (isNaN(number) || isNaN(dot)) {
    return ''
  }
  if (max !== '' && max !== undefined && number > max) {
    number = max
  }
  if (min !== '' && min !== undefined && number < min) {
    number = min
  }
  dot = Math.floor(dot)
  const str = '' + number
  let [integer, decimal] = str.split('.')
  integer = isNaN(integer) ? 0 : +integer
  decimal = decimal ? decimal.substr(0, dot) : ''
  while (decimal.length < dot) {
    decimal += '0'
  }
  return `${integer}.${decimal}`
}

export const getCash = (cash = 0, symbol = '') => {
  if (isNaN(cash)) {
    return '--'
  }
  return symbol + getNumber(cash, 2)
}

export const toast = (text = '') => {
  window.alert(text)
}

export const throttle = (func, wait) => {
  let context, args, prevArgs, argsChanged, result
  let previous = 0
  return function () {
    let now, remaining
    if (wait) {
      now = Date.now()
      remaining = wait - (now - previous)
    }
    context = this
    args = arguments
    argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs)
    prevArgs = { ...args }
    if (argsChanged || (wait && (remaining <= 0 || remaining > wait))) {
      if (wait) {
        previous = now
      }
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
