import { expect } from 'chai'
import { createServer, Server, ServerRequest, ServerResponse } from 'http'
import { match, stub } from 'sinon'
import { del, get, post, put, request } from '../'
const xhr = require('xmlhttprequest')

describe('request', () => {

  let server: Server
  let serverStub: any
  let url: string
  let action: {
    req: ServerRequest
    res: ServerResponse
    body: string
  }

  before((done) => {
    (global as any).XMLHttpRequest = xhr.XMLHttpRequest
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
    const instance = server.listen(() => {
      url = `http://127.0.0.1:${instance.address().port}`
      done()
    })
  })

  beforeEach(() => {
    serverStub = stub()
  })

  after(() => {
    server.close()
    delete (global as any).XMLHttpRequest
  })

  it('get() should make a get request', async () => {
    const res = await get(url + '/get1')
    expect(serverStub.callCount).to.equal(1)
    expect(action.req.method).to.equal('GET')
    expect(action.req.url).to.equal('/get1')
    expect(res).to.equal('ok')
  })

  it('get() should parse JSON data', async () => {
    serverStub.returns({ a: 1 })
    const res = await get(url + '/get2')
    expect(serverStub.callCount).to.equal(1)
    expect(action.req.method).to.equal('GET')
    expect(action.req.url).to.equal('/get2')
    expect(action.res.getHeader('Content-Type')).to.equal('application/json')
    expect(res).to.deep.equal({ a: 1 })
  })

  it('post() should send post data', async () => {
    const res = await post(url + '/post', { test: 1 })
    expect(serverStub.callCount).to.equal(1)
    expect(action.req.method).to.equal('POST')
    expect(action.req.url).to.equal('/post')
    expect(action.body).to.equal('{"test":1}')
    expect(res).to.equal('ok')
  })

  it('put() should send put data', async () => {
    const res = await put(url + '/put', { insert: 'something' })
    expect(serverStub.callCount).to.equal(1)
    expect(action.req.method).to.equal('PUT')
    expect(action.req.url).to.equal('/put')
    expect(action.body).to.equal('{"insert":"something"}')
    expect(res).to.equal('ok')
  })

  it('del() should make a delete request', async () => {
    const res = await del(url + '/del')
    expect(serverStub.callCount).to.equal(1)
    expect(action.req.method).to.equal('DELETE')
    expect(action.req.url).to.equal('/del')
    expect(res).to.equal('ok')
  })

  it('request() should make a generic request', async () => {
    const method = 'POST'
    const path = '/test'
    const headers = { foo: 'bar' }
    const body = { bar: 'foo' }
    const res = await request({ method, url, path, headers, body })
    expect(serverStub.callCount).to.equal(1)
    expect(action.req.method).to.equal('POST')
    expect(action.req.url).to.equal('/test')
    expect(action.req.headers.foo).to.equal('bar')
    expect(action.body).to.equal('{"bar":"foo"}')
    expect(res).to.equal('ok')
  })

})
