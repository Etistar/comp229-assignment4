describe('login', () => {
  it('shows the home release line and the login error from the API', () => {
    cy.visit('/')
    cy.contains('Assignment 4 — Etienne ZONON').should('be.visible')

    cy.intercept('POST', '/api/users/login', {
      statusCode: 401,
      body: { message: 'Invalid email or password' },
    }).as('login')

    cy.visit('/login')
    cy.get('input[name="email"]').type('student@example.com')
    cy.get('input[name="password"]').type('wrong-password')
    cy.contains('button', 'Continue').click()
    cy.wait('@login')
    cy.contains('Invalid email or password').should('be.visible')
    cy.contains('Verify authenticator code').should('not.exist')
  })
})
