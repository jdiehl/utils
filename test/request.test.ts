import { createServer, Server, ServerRequest, ServerResponse } from 'http'
import { del, get, post, put, request } from '../'

let server: Server
const serverStub = jest.fn()
let url: string
let action: {
  req: ServerRequest
  res: ServerResponse
  body: string
}

beforeAll(async () => {
  return new Promise((resolve, reject) => {
    server = createServer((req, res) => {
      let body = ''
      req.on('data', d => body += d)
      req.on('end', () => {
        action = { req, res, body }
        let data = serverStub() || 'ok'
        if (typeof data === 'object') {
          data = JSON.stringify(data)
          res.setHeader('Content-Type', 'application/json')
        }
        res.end(data)
      })
    })
    const instance = server.listen(9999, () => {
      url = `http://127.0.0.1:${instance.address().port}`
      resolve()
    })
  })
})

beforeEach(() => {
  serverStub.mockReset()
})

afterAll(() => {
  server.close()
})

test('get() should make a get request', async () => {
  const res = await get(url + '/get1')
  expect(serverStub).toHaveBeenCalledTimes(1)
  expect(action.req.method).toBe('GET')
  expect(action.req.url).toBe('/get1')
  expect(res).toBe('ok')
})

test('get() should parse JSON data', async () => {
  serverStub.mockReturnValue({ a: 1 })
  const res = await get(url + '/get2')
  expect(serverStub).toHaveBeenCalledTimes(1)
  expect(action.req.method).toBe('GET')
  expect(action.req.url).toBe('/get2')
  expect(action.res.getHeader('Content-Type')).toBe('application/json')
  expect(res).toEqual({ a: 1 })
})

test('post() should send post data', async () => {
  const res = await post(url + '/post', { test: 1 })
  expect(serverStub).toHaveBeenCalledTimes(1)
  expect(action.req.method).toBe('POST')
  expect(action.req.url).toBe('/post')
  expect(action.body).toBe('{"test":1}')
  expect(res).toBe('ok')
})

test('put() should send put data', async () => {
  const res = await put(url + '/put', { insert: 'something' })
  expect(serverStub).toHaveBeenCalledTimes(1)
  expect(action.req.method).toBe('PUT')
  expect(action.req.url).toBe('/put')
  expect(action.body).toBe('{"insert":"something"}')
  expect(res).toBe('ok')
})

test('del() should make a delete request', async () => {
  const res = await del(url + '/del')
  expect(serverStub).toHaveBeenCalledTimes(1)
  expect(action.req.method).toBe('DELETE')
  expect(action.req.url).toBe('/del')
  expect(res).toBe('ok')
})

test('request() should make a generic request', async () => {
  const method = 'POST'
  const path = '/test'
  const headers = { foo: 'bar' }
  const body = { bar: 'foo' }
  const res = await request({ method, url, path, headers, body })
  expect(serverStub).toHaveBeenCalledTimes(1)
  expect(action.req.method).toBe('POST')
  expect(action.req.url).toBe('/test')
  expect(action.req.headers.foo).toBe('bar')
  expect(action.body).toBe('{"bar":"foo"}')
  expect(res).toBe('ok')
})
