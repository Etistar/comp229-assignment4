describe('portfolio contact', () => {
  it('shows the portfolio home page and blocks an empty contact form', () => {
    cy.visit('/')
    cy.contains('Welcome to My Portfolio').should('be.visible')
    cy.contains('a', 'Contact').click()
    cy.contains('h1', 'Contact Me').should('be.visible')
    cy.contains('button', 'Send Message').click()
    cy.contains('First name is required').should('be.visible')
    cy.contains('Message sent').should('not.exist')
  })
})
