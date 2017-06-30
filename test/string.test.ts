import { expect } from 'chai'
import { escapeRegExp, parseJSON } from '../'

describe('string', () => {

  it('escapeRegExp() should escape regular expressions in strings', () => {
    expect(escapeRegExp('-[]/{}()*+?.\\^$|')).to.equal('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|')
    expect(escapeRegExp('Test [a-z]?')).to.equal('Test \\[a\\-z\\]\\?')
  })

  it('parseJSON() should parse a JSON string', () => {
    const res = parseJSON('{"a":1}')
    expect(res).to.deep.equal({ a: 1 })
  })

  it('parseJSON() should return an invalid value', () => {
    const res = parseJSON('test')
    expect(res).to.equal('test')
  })

})
