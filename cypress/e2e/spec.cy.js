describe('Test Login Redirect to landing page', () => {
  it('passes', () => {
    cy.visit("/")
    cy.clearAllCookies()
    cy.clearAllSessionStorage()
    cy.get('[href="/profile"]').click()
    cy.get('#email').type("aragornow@gmail.com");

    cy.get('#password').type("Test123")


    cy.get('.space-y-4 > .text-white').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  
  
  })

})