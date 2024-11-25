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

describe('Calcular o valor dos produtos', () => {
  it('Resultado esperado 5,00 Euros no carrinho', () => {
    cy.visit('https://sweetshop.netlify.app/')
    cy.contains('Sweets').click()
    for (let i = 0; i < 5; i++) {
      cy.get('a[data-name="Chocolate Cups"]').click();
    }
      cy.contains('Basket').click()
      cy.contains('£5.00').should('be.visible')
      })
  });

  describe('', () => {
    it('', () => {
      
    })
  })
