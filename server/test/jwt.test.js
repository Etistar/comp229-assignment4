import test from 'node:test'
import assert from 'node:assert/strict'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/jwt.js'

test('the API token is issued only with two-factor authentication already completed', () => {
  process.env.JWT_SECRET = 'assignment4-test-secret'
  const token = generateToken({ _id: 'user-1', email: 'student@example.com' })
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  assert.equal(decoded.id, 'user-1')
  assert.equal(decoded.email, 'student@example.com')
  assert.equal(decoded.twoFactorEnabled, true)
  assert.equal(typeof decoded.exp, 'number')
  assert.ok(decoded.exp > decoded.iat)
})
