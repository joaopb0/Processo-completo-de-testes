describe('Acessar e realizar login e manter a sessão', () => {
  it('Falha no teste', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.visit('https://sweetshop.netlify.app/login')
    cy.get('#exampleInputEmail.form-control').clear().type('test@user.com')
    cy.get('#exampleInputPassword.form-control').clear().type('qwerty')
    cy.get('.btn.btn-primary').click()
    cy.contains('Welcome back test@user.com').should('be.visible')
    cy.visit('https://sweetshop.netlify.app/login')
    cy.contains('Welcome back test@user.com').should('be.visible')
  })
})

describe('', () => {
  it('', () => {
    
  })
})