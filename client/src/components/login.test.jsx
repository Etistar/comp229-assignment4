import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './login.jsx'

test('shows the server message when the password is rejected', async () => {
  const calls = []
  global.fetch = async (url, options) => {
    calls.push({ url, options })
    return {
      ok: false,
      json: async () => ({ message: 'Invalid email or password' }),
    }
  }
  const cleared = []
  const user = userEvent.setup()

  render(
    <MemoryRouter>
      <Login onAuth={(value) => cleared.push(value)} />
    </MemoryRouter>
  )

  await user.type(screen.getByRole('textbox', { name: /email/i }), 'student@example.com')
  await user.type(screen.getByLabelText(/password/i), 'wrong-password')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  expect(await screen.findByText('Invalid email or password')).toBeTruthy()
  expect(calls).toHaveLength(1)
  expect(calls[0].url).toBe('/api/users/login')
  expect(JSON.parse(calls[0].options.body)).toEqual({
    email: 'student@example.com',
    password: 'wrong-password',
  })
  expect(cleared).toEqual([''])
  expect(screen.queryByText('Verify authenticator code')).toBeNull()
})
