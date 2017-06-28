export interface IRequestHeaders {
  [key: string]: string
}

export interface IRequestOptions {
  method?: string
  url: string
  path?: string
  headers?: IRequestHeaders
  body?: any
}

function getUrlWithPath(options: IRequestOptions): string {
  const { path, url } = options
  if (!path) return url

  const urlHasSlash = url[url.length - 1] === '/'
  const pathHasSlash = path[0] === '/'
  if (urlHasSlash && pathHasSlash) {
    return url + path.substr(1)
  } else if (urlHasSlash || pathHasSlash) {
    return url + path
  } else {
    return url + '/' + path
  }
}

function getBody(options: IRequestOptions): any {
  if (!options.body) return
  if (typeof options.body === 'object') {
    if (options.headers!['Content-Type'] === undefined) options.headers!['Content-Type'] = 'application/json'
    return JSON.stringify(options.body)
  }
  return options.body
}

export function request<T = any>(options: IRequestOptions): Promise<T> {
  if (typeof options === 'string') options = { url: options }
  if (!options.headers) options.headers = {}

  // url & path
  const url = getUrlWithPath(options)

  // method
  const method = options.method ? options.method.toUpperCase() : 'GET'

  // body
  const body = getBody(options)

  // headers
  const headers = options.headers

  return new Promise<T>((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // event handlers
    xhr.addEventListener('error', err => reject(err || 'Request error'))
    xhr.addEventListener('timeout', () => reject('Request timed out'))
    xhr.addEventListener('load', (x: any) => {
      let res = xhr.responseText as any
      if (xhr.status < 200 || xhr.status >= 300) return reject(res)
      const type = xhr.getResponseHeader('Content-Type')
      if (type && type.substr(0, 16) === 'application/json') {
        res = JSON.parse(res)
      }
      resolve(res)
    })

    // initiate request
    xhr.open(method, url)

    // set headers
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key])
      }
    }

    // send body
    xhr.send(body)
  })
}

export function get<T = any>(url: string, headers?: IRequestHeaders): Promise<T> {
  return request<T>({ url, headers })
}

export function post<T = any>(url: string, body?: any, headers?: IRequestHeaders): Promise<T> {
  return request<T>({ method: 'POST', url, body, headers })
}

export function put<T = any>(url: string, body?: any, headers?: IRequestHeaders): Promise<T> {
  return request<T>({ method: 'PUT', url, body, headers })
}

export function del<T = any>(url: string, headers?: IRequestHeaders): Promise<T> {
  return request<T>({ method: 'DELETE', url, headers })
}
