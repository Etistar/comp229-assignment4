import test from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'

process.env.JWT_SECRET = 'assignment4-test-secret'
const { generateToken } = await import('../utils/jwt.js')

test('a signed-in portfolio user receives a token that carries the database role', () => {
  const token = generateToken({
    _id: 'user-1',
    name: 'Etienne',
    email: 'student@example.com',
    role: 'admin'
  })
  const decoded = jwt.verify(token, 'assignment4-test-secret')

  assert.equal(decoded._id, 'user-1')
  assert.equal(decoded.email, 'student@example.com')
  assert.equal(decoded.role, 'admin')
  assert.equal(decoded.name, 'Etienne')
})
