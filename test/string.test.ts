import { expect } from 'chai'
import { escapeRegExp } from '../'

describe('string', () => {

  it('escapeRegExp() should escape regular expressions in strings', () => {
    expect(escapeRegExp('-[]/{}()*+?.\\^$|')).to.equal('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|')
    expect(escapeRegExp('Test [a-z]?')).to.equal('Test \\[a\\-z\\]\\?')
  })

})
