import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact.jsx'

test('rejects an empty contact form before calling the API', async () => {
  const calls = []
  global.fetch = async (url) => {
    calls.push(url)
    return { ok: true, json: async () => ({}) }
  }
  const user = userEvent.setup()

  render(<Contact />)
  await user.click(screen.getByRole('button', { name: 'Send Message' }))

  expect(screen.getByRole('alert').textContent).toBe('First name is required')
  expect(calls).toHaveLength(0)
})

test('saves a valid message and clears the form', async () => {
  const calls = []
  global.fetch = async (url, options) => {
    calls.push({ url, options })
    return { ok: true, json: async () => ({ message: 'saved' }) }
  }
  const user = userEvent.setup()

  render(<Contact />)
  await user.type(screen.getByLabelText(/first name/i), 'Etienne')
  await user.type(screen.getByLabelText(/last name/i), 'Zonon')
  await user.type(screen.getByLabelText(/^email/i), 'etienne@example.com')
  await user.type(screen.getByLabelText(/message/i), 'Hello from the portfolio')
  await user.click(screen.getByRole('button', { name: 'Send Message' }))

  expect((await screen.findByRole('status')).textContent).toContain('Message sent. It is saved in the portfolio database.')
  expect(screen.getByLabelText(/first name/i).value).toBe('')
  expect(calls).toHaveLength(1)
  expect(calls[0].url).toBe('/api/contacts')
  expect(JSON.parse(calls[0].options.body)).toMatchObject({
    firstName: 'Etienne',
    lastName: 'Zonon',
    email: 'etienne@example.com',
    message: 'Hello from the portfolio'
  })
})
